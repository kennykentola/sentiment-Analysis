import sys
import os
import random
import time
from datetime import datetime, timedelta, timezone

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.core.config import settings
from app.repositories.appwrite_client import db
from appwrite.id import ID
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

def run_ingestion():
    db_id = settings.APPWRITE_DB_ID
    analyzer = SentimentIntensityAnalyzer()
    
    # Mock data templates representing Nigerian context
    unis = ["UNILAG", "OAU", "UI", "ABU", "UNN"]
    sources = ["Twitter", "Facebook", "Nairaland"]
    
    mock_posts = [
        "The recent hike in {uni} school fees is absolutely outrageous. Students cannot afford this! We need a reversal now. #FeeMustFall",
        "I understand {uni} needs better facilities, but increasing the fees by 200% in this economy is wicked.",
        "Honestly, the new {uni} fee structure is reasonable if they actually improve the hostel conditions as promised.",
        "So {uni} just dropped the new portal charges. It is what it is. We just have to pay.",
        "Protests at {uni} today regarding the exorbitant accommodation fees. The management must listen to the students.",
        "To be fair, {uni} has not increased fees in 10 years. Inflation is affecting everyone, including the universities.",
        "I will drop out. There is no way my parents can afford the new {uni} tuition. God help us.",
        "The {uni} student union needs to wake up and fight this fee increment. We are being extorted!",
        "Comparing {uni} fees to private universities, it's still cheap. Stop complaining and read your books.",
        "This {uni} hike is a deliberate attempt to deny the poor access to education. Sad state of the nation."
    ]
    
    print("Starting data ingestion via VADER NLP Engine...")
    
    total_posts = 100
    success_count = 0
    
    for i in range(total_posts):
        base_post = random.choice(mock_posts)
        uni = random.choice(unis)
        content = base_post.format(uni=uni)
        source = random.choice(sources)
        author_id = f"user_{random.randint(1000, 9999)}"
        posted_at = (datetime.now(timezone.utc) - timedelta(hours=random.randint(0, 168))).isoformat()
        
        try:
            # 1. Insert into SocialMediaPosts
            post_id = ID.unique()
            db.create_document(
                database_id=db_id,
                collection_id="SocialMediaPosts",
                document_id=post_id,
                data={
                    "content": content,
                    "source": source,
                    "author_id": author_id,
                    "posted_at": posted_at,
                    "uni_id": uni
                },
                permissions=['read("any")', 'update("any")', 'delete("any")']
            )
            
            # 2. Analyze sentiment with VADER
            vs = analyzer.polarity_scores(content)
            compound = vs['compound']
            
            if compound >= 0.05:
                label = "Positive"
            elif compound <= -0.05:
                label = "Negative"
            else:
                label = "Neutral"
            
            # Confidence approximation
            confidence = abs(compound) if abs(compound) > 0.3 else 0.5
            
            # 3. Insert into SentimentResults
            db.create_document(
                database_id=db_id,
                collection_id="SentimentResults",
                document_id=ID.unique(),
                data={
                    "post_id": post_id,
                    "score": compound,
                    "label": label,
                    "confidence": confidence
                },
                permissions=['read("any")', 'update("any")', 'delete("any")']
            )
            
            success_count += 1
            if success_count % 10 == 0:
                print(f"Processed {success_count}/{total_posts} posts...")
            
        except Exception as e:
            print(f"Error processing post: {e}")
            
    print(f"Ingestion complete. Successfully processed and stored {success_count} posts and NLP sentiment results.")

if __name__ == "__main__":
    run_ingestion()

import os
import sys
import uuid

sys.path.append(os.path.join(os.path.dirname(__file__), ".."))

from app.repositories.appwrite_client import db
from app.core.config import settings
from app.nlp.pipeline import nlp_pipeline
from appwrite.query import Query

def process_unscored_posts():
    """
    Fetch all posts from SocialMediaPosts that don't have a corresponding 
    SentimentResult, run them through the Gemini pipeline, and save the result.
    """
    print("Fetching posts from Appwrite...")
    try:
        posts_resp = db.list_documents(
            settings.APPWRITE_DB_ID,
            'SocialMediaPosts',
            [Query.limit(100)] # Limit to 100 for batching
        )
        posts = posts_resp.get('documents', [])
        
        # In a real app we'd query to find only unscored posts.
        # For this script, we'll just check if a result exists for this post.
        
        for post in posts:
            post_id = post.get('$id')
            content = post.get('content')
            uni_id = post.get('uni_id')
            
            # Check if already scored
            existing = db.list_documents(
                settings.APPWRITE_DB_ID,
                'SentimentResults',
                [Query.equal('post_id', post_id)]
            )
            
            if existing.get('documents'):
                print(f"Post {post_id} already scored. Skipping.")
                continue
                
            print(f"Analyzing post: {post_id}")
            result = nlp_pipeline.analyze_sentiment(content)
            
            # Save to Appwrite
            db.create_document(
                settings.APPWRITE_DB_ID,
                'SentimentResults',
                'unique()',
                {
                    "post_id": post_id,
                    "uni_id": uni_id,
                    "score": result["score"],
                    "label": result["label"].capitalize()
                }
            )
            print(f" -> Result saved: {result['label']}")
            
        print("Batch processing complete.")
    except Exception as e:
        print(f"Error processing posts: {e}")

if __name__ == "__main__":
    process_unscored_posts()

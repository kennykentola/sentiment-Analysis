import sys
import os
import random
import requests
from datetime import datetime, timedelta, timezone

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.core.config import settings
import uuid

def seed_raw_posts():
    db_id = settings.APPWRITE_DB_ID
    
    base_url = f"{settings.APPWRITE_ENDPOINT}/databases/{settings.APPWRITE_DB_ID}"
    headers = {
        'X-Appwrite-Project': settings.APPWRITE_PROJECT_ID,
        'X-Appwrite-Key': settings.APPWRITE_API_KEY,
        'Content-Type': 'application/json'
    }
    
    unis = ["UNILAG", "OAU", "University of Ibadan", "ABU", "UNN", "UNIBEN", "UNILORIN", "FUTA"]
    sources = ["Twitter", "Facebook", "Nairaland"]
    
    # 50 Highly realistic Nigerian student posts about school fees
    mock_posts = [
        "Omo this {uni} school fees hike no be am at all. Where we won see 150k inside this sapa?",
        "I just checked the {uni} portal. The new fees are pure extortion. #FeeMustFall",
        "Even with the strike, {uni} management still get mind increase accommodation fee.",
        "Honestly, the {uni} hike is somewhat understandable given inflation, but it's too sudden.",
        "They want to force the poor out of school. {uni} fees from 45k to 180k is pure wickedness.",
        "Abeg who get update on the {uni} student loan? This new tuition is choking us.",
        "The facilities at {uni} are getting better to be fair. Maybe the fee hike is justified.",
        "I swear I'm dropping out. {uni} is no longer for the masses.",
        "Protests ongoing at {uni} gate over the recent 200% hike in tuition fees.",
        "We need the Federal Government to intervene. {uni} management has gone rogue with these fees.",
        "Sapa everywhere, and {uni} is adding to it. God abeg.",
        "I heard {uni} is planning to reverse the hostel fees. Make e be true o.",
        "Why is nobody talking about the hidden charges in the new {uni} fee structure?",
        "Compared to private schools, {uni} is still cheap. Let's be guided.",
        "This {uni} VC does not care about students at all. Very wicked administration.",
        "My parents almost fainted when I showed them the new {uni} fee breakdown.",
        "We go protest this {uni} hike tire. They must bring it down!",
        "Is there any scholarship for {uni} students right now? I need help.",
        "To be honest, the cost of running {uni} is high now. Diesel is expensive.",
        "Shege banza! This {uni} fees will make students start doing runs."
    ]
    
    print("Generating 50 raw social media posts via REST...", flush=True)
    
    success_count = 0
    for _ in range(50):
        base_post = random.choice(mock_posts)
        uni = random.choice(unis)
        content = base_post.format(uni=uni)
        source = random.choice(sources)
        author_id = f"user_{random.randint(1000, 9999)}"
        posted_at = (datetime.now(timezone.utc) - timedelta(hours=random.randint(0, 168))).isoformat()
        
        doc_id = str(uuid.uuid4()).replace('-', '')[:20]
        payload = {
            "documentId": doc_id,
            "data": {
                "content": content,
                "source": source,
                "author_id": author_id,
                "posted_at": posted_at,
                "uni_id": uni
            },
            "permissions": ['read("any")', 'update("any")', 'delete("any")']
        }
        
        try:
            r = requests.post(f"{base_url}/collections/SocialMediaPosts/documents", headers=headers, json=payload, timeout=10)
            if r.status_code in [200, 201]:
                success_count += 1
        except Exception as e:
            print(f"Error: {e}")
            
    print(f"Successfully seeded {success_count} raw posts into Appwrite!")

if __name__ == "__main__":
    seed_raw_posts()

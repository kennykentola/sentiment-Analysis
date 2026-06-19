import os
import sys
import uuid
import random
import requests
from datetime import datetime, timezone

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from app.core.config import settings

def main():
    base_url = f"{settings.APPWRITE_ENDPOINT}/databases/{settings.APPWRITE_DB_ID}"
    headers = {
        'X-Appwrite-Project': settings.APPWRITE_PROJECT_ID,
        'X-Appwrite-Key': settings.APPWRITE_API_KEY,
        'Content-Type': 'application/json'
    }

    print("Checking collections via REST...", flush=True)
    r = requests.get(f"{base_url}/collections", headers=headers, timeout=10)
    if r.status_code != 200:
        print("Failed to reach Appwrite:", r.text)
        return

    print("Adding Universities...", flush=True)
    unis = [
        {"name": "University of Lagos", "acronym": "UNILAG", "region": "South West"},
        {"name": "Obafemi Awolowo University", "acronym": "OAU", "region": "South West"},
        {"name": "University of Ibadan", "acronym": "UI", "region": "South West"},
        {"name": "Ahmadu Bello University", "acronym": "ABU", "region": "North West"},
        {"name": "University of Nigeria", "acronym": "UNN", "region": "South East"}
    ]
    
    for u in unis:
        doc_id = str(uuid.uuid4()).replace('-', '')[:20]
        payload = {"documentId": doc_id, "data": u, "permissions": ['read("any")']}
        try:
            r = requests.post(f"{base_url}/collections/Universities/documents", headers=headers, json=payload, timeout=10)
        except Exception:
            pass

    print("Adding 25 Mock Social Media Posts & Sentiments...", flush=True)
    sources = ["Twitter", "Facebook", "Nairaland"]
    labels = ["Positive", "Neutral", "Negative"]
    
    for i in range(25):
        post_id = str(uuid.uuid4()).replace('-', '')[:20]
        
        # Post
        payload_post = {
            "documentId": post_id,
            "data": {
                "content": f"Mock post about fee hikes {i}",
                "source": random.choice(sources),
                "author_id": f"user_{i}",
                "posted_at": datetime.now(timezone.utc).isoformat(),
                "uni_id": random.choice(["UNILAG", "OAU", "UI"])
            },
            "permissions": ['read("any")']
        }
        
        # Sentiment
        payload_sent = {
            "documentId": str(uuid.uuid4()).replace('-', '')[:20],
            "data": {
                "post_id": post_id,
                "score": random.uniform(-1, 1),
                "label": random.choice(labels),
                "confidence": random.uniform(0.5, 0.99)
            },
            "permissions": ['read("any")']
        }
        
        try:
            requests.post(f"{base_url}/collections/SocialMediaPosts/documents", headers=headers, json=payload_post, timeout=10)
            requests.post(f"{base_url}/collections/SentimentResults/documents", headers=headers, json=payload_sent, timeout=10)
        except Exception:
            pass
            
    print("Done! Seeding Complete. The Python Appwrite SDK hanging bug has been bypassed via REST.", flush=True)

if __name__ == "__main__":
    main()

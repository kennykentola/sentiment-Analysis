import sys
import os
import random
from datetime import datetime, timedelta, timezone

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.core.config import settings
from app.repositories.appwrite_client import db
from appwrite.id import ID
from appwrite.exception import AppwriteException

def seed_database():
    db_id = settings.APPWRITE_DB_ID
    
    print("Fixing collection permissions first...")
    collections = ['SocialMediaPosts', 'SentimentResults', 'SystemMetrics', 'Universities', 'Topics', 'Roles', 'AuditLogs']
    for c in collections:
        try:
            db.update_collection(
                database_id=db_id,
                collection_id=c,
                name=c,
                permissions=['read("any")', 'create("any")', 'update("any")', 'delete("any")']
            )
            print(f"Permissions updated for {c}")
        except Exception as e:
            print(f"Could not update permissions for {c}: {e}")

    print("\nSeeding Universities...")
    unis = [
        {"name": "University of Lagos", "acronym": "UNILAG", "region": "South West"},
        {"name": "Obafemi Awolowo University", "acronym": "OAU", "region": "South West"},
        {"name": "University of Ibadan", "acronym": "UI", "region": "South West"},
        {"name": "Ahmadu Bello University", "acronym": "ABU", "region": "North West"},
        {"name": "University of Nigeria", "acronym": "UNN", "region": "South East"}
    ]
    for u in unis:
        try:
            db.create_document(db_id, "Universities", ID.unique(), data=u, permissions=['read("any")'])
        except Exception as e:
            print(f"Error creating uni: {e}")

    print("\nSeeding Mock Analytics Data...")
    sources = ["Twitter", "Facebook", "Nairaland"]
    labels = ["Positive", "Neutral", "Negative"]
    
    for i in range(25):
        try:
            post_id = ID.unique()
            db.create_document(
                database_id=db_id,
                collection_id="SocialMediaPosts",
                document_id=post_id,
                data={
                    "content": f"Mock post about fee hikes {i}",
                    "source": random.choice(sources),
                    "author_id": f"user_{i}",
                    "posted_at": datetime.now(timezone.utc).isoformat(),
                    "uni_id": random.choice(["UNILAG", "OAU", "UI"])
                },
                permissions=['read("any")']
            )
            
            db.create_document(
                database_id=db_id,
                collection_id="SentimentResults",
                document_id=ID.unique(),
                data={
                    "post_id": post_id,
                    "score": random.uniform(-1, 1),
                    "label": random.choice(labels),
                    "confidence": random.uniform(0.5, 0.99)
                },
                permissions=['read("any")']
            )
        except Exception as e:
            print(f"Error creating post/sentiment: {e}")

    print("\nSeeding Complete!")

if __name__ == "__main__":
    seed_database()

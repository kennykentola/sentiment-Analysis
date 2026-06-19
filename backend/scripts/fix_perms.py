import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.core.config import settings
from app.repositories.appwrite_client import db

def update_permissions():
    db_id = settings.APPWRITE_DB_ID
    collections = ['SocialMediaPosts', 'SentimentResults', 'SystemMetrics', 'Universities', 'Topics', 'Roles', 'AuditLogs']
    
    for c in collections:
        try:
            print(f"Updating permissions for {c}...")
            # We use "any" for all permissions just to unblock the MVP.
            # In production, this would be locked down to "users" or specific roles.
            db.update_collection(
                database_id=db_id,
                collection_id=c,
                name=c,
                permissions=['read("any")', 'create("any")', 'update("any")', 'delete("any")']
            )
            print(f"Successfully updated {c}")
        except Exception as e:
            print(f"Failed to update {c}: {e}")

if __name__ == "__main__":
    update_permissions()

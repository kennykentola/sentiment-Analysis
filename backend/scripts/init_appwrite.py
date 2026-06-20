import sys
import os
import time

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.core.config import settings
from app.repositories.appwrite_client import db
from appwrite.id import ID
from appwrite.exception import AppwriteException

def init_db():
    print(f"Connecting to Appwrite at {settings.APPWRITE_ENDPOINT} for project {settings.APPWRITE_PROJECT_ID}")
    
    db_id = settings.APPWRITE_DB_ID
    
    try:
        db.get(db_id)
        print(f"Database '{db_id}' already exists.")
    except AppwriteException as e:
        if e.code == 404:
            print(f"Creating database '{db_id}'...")
            db.create(db_id, "Sentiment DB")
        else:
            print(f"Error checking db: {e}")
            return

    collections = [
        {
            "id": "Roles",
            "name": "Roles",
            "attributes": [
                {"type": "string", "key": "name", "size": 50, "required": True},
                {"type": "string", "key": "permissions", "size": 255, "required": False, "array": True}
            ]
        },
        {
            "id": "Universities",
            "name": "Universities",
            "attributes": [
                {"type": "string", "key": "name", "size": 255, "required": True},
                {"type": "string", "key": "acronym", "size": 20, "required": True},
                {"type": "string", "key": "region", "size": 100, "required": True}
            ]
        },
        {
            "id": "SocialMediaPosts",
            "name": "SocialMediaPosts",
            "attributes": [
                {"type": "string", "key": "content", "size": 10000, "required": True},
                {"type": "string", "key": "source", "size": 50, "required": True},
                {"type": "string", "key": "author_id", "size": 255, "required": True},
                {"type": "datetime", "key": "posted_at", "required": True},
                {"type": "string", "key": "uni_id", "size": 50, "required": False}
            ]
        },
        {
            "id": "SentimentResults",
            "name": "SentimentResults",
            "attributes": [
                {"type": "string", "key": "post_id", "size": 50, "required": True},
                {"type": "float", "key": "score", "required": True},
                {"type": "string", "key": "label", "size": 20, "required": True},
                {"type": "float", "key": "confidence", "required": True}
            ]
        },
        {
            "id": "Topics",
            "name": "Topics",
            "attributes": [
                {"type": "string", "key": "name", "size": 255, "required": True},
                {"type": "string", "key": "keywords", "size": 500, "required": True, "array": True},
                {"type": "integer", "key": "volume", "required": True}
            ]
        },
        {
            "id": "SystemMetrics",
            "name": "SystemMetrics",
            "attributes": [
                {"type": "string", "key": "date", "size": 50, "required": True},
                {"type": "integer", "key": "total_posts", "required": True},
                {"type": "float", "key": "avg_sentiment", "required": True}
            ]
        },
        {
            "id": "AuditLogs",
            "name": "AuditLogs",
            "attributes": [
                {"type": "string", "key": "user_id", "size": 50, "required": True},
                {"type": "string", "key": "action", "size": 255, "required": True},
                {"type": "string", "key": "resource", "size": 255, "required": True},
                {"type": "datetime", "key": "timestamp", "required": True}
            ]
        }
    ]

    for col in collections:
        try:
            db.get_collection(db_id, col["id"])
            print(f"Collection '{col['id']}' already exists.")
        except AppwriteException as e:
            if e.code == 404:
                print(f"Creating collection '{col['id']}'...")
                # Add Collection-level permissions so Server SDK and authenticated users can read/write
                db.create_collection(
                    db_id, 
                    col["id"], 
                    col["name"],
                    permissions=['read("any")', 'create("users")', 'update("users")', 'delete("users")']
                )
                
                for attr in col["attributes"]:
                    print(f"  -> Creating attribute '{attr['key']}'...")
                    is_array = attr.get("array", False)
                    try:
                        if attr["type"] == "string":
                            db.create_string_attribute(db_id, col["id"], attr["key"], attr["size"], attr["required"], array=is_array)
                        elif attr["type"] == "float":
                            db.create_float_attribute(db_id, col["id"], attr["key"], attr["required"], array=is_array)
                        elif attr["type"] == "integer":
                            db.create_integer_attribute(db_id, col["id"], attr["key"], attr["required"], array=is_array)
                        elif attr["type"] == "datetime":
                            db.create_datetime_attribute(db_id, col["id"], attr["key"], attr["required"], array=is_array)
                    except Exception as attr_err:
                        print(f"     Failed to create attribute {attr['key']}: {attr_err}")
                
            else:
                print(f"Error checking collection '{col['id']}': {e}")
                
    print("Database initialization check complete. Note: if attributes were just created, allow 5-10 seconds for Appwrite to mark them as available before adding data.")

def init_storage():
    from app.repositories.appwrite_client import storage
    print("Checking Appwrite Storage...")
    bucket_id = settings.APPWRITE_BUCKET_ID
    try:
        storage.get_bucket(bucket_id)
        print(f"Bucket '{bucket_id}' already exists.")
    except AppwriteException as e:
        if e.code == 404:
            print(f"Creating storage bucket '{bucket_id}'...")
            # We enforce strict permissions: Only Super Admin role can read/write by default. 
            # Wait, any user needs to be able to create an ID document when registering.
            # Appwrite buckets have their own permission model.
            storage.create_bucket(
                bucket_id=bucket_id,
                name="ID_Verification_Bucket",
                permissions=[
                    'create("users")',
                    'read("role:super_admin")'
                ],
                file_security=False,
                enabled=True,
                maximum_file_size=5000000,
                allowed_file_extensions=["jpg", "jpeg", "png", "pdf"],
                compression="gzip",
                encryption=True,
                antivirus=True
            )
            print("Storage bucket created successfully.")
        else:
            print(f"Error checking storage bucket: {e}")

if __name__ == "__main__":
    init_db()
    init_storage()

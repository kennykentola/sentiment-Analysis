import os
import sys
import json
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

    print("Checking collections...", flush=True)
    try:
        r = requests.get(f"{base_url}/collections", headers=headers, timeout=10)
        print("Collections status:", r.status_code)
    except Exception as e:
        print("Failed to reach Appwrite:", e)
        return

    print("Adding Universities...", flush=True)
    unis = [
        {"name": "University of Lagos", "acronym": "UNILAG", "region": "South West"},
        {"name": "Obafemi Awolowo University", "acronym": "OAU", "region": "South West"},
    ]
    
    for u in unis:
        doc_id = str(uuid.uuid4()).replace('-', '')[:20]
        payload = {
            "documentId": doc_id,
            "data": u,
            "permissions": ['read("any")']
        }
        try:
            r = requests.post(f"{base_url}/collections/Universities/documents", headers=headers, json=payload, timeout=10)
            print(f"Added {u['acronym']} - status: {r.status_code}")
        except Exception as e:
            print("Error adding uni:", e)

    print("Done seeding via REST!", flush=True)

if __name__ == "__main__":
    main()

import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.repositories.appwrite_client import db
from app.core.config import settings
from appwrite.id import ID

try:
    print("Testing create_document...")
    doc = db.create_document(
        database_id=settings.APPWRITE_DB_ID,
        collection_id='opinions',
        document_id=ID.unique(),
        data={"content": "test", "source": "test", "institution_id": "test", "sentiment_label": "test", "sentiment_score": 0.0}
    )
    print(f"Type: {type(doc)}")
    print(f"Vars: {vars(doc) if hasattr(doc, '__dict__') else doc}")
    print(f"ID: {getattr(doc, '$id', getattr(doc, 'id', 'Unknown'))}")
except Exception as e:
    print(f"Error: {e}")

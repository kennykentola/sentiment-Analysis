import os
import sys
import uuid
import requests

sys.path.append(os.path.join(os.path.dirname(__file__), ".."))

from app.core.config import settings
from app.nlp.pipeline import nlp_pipeline

def process_unscored_posts():
    """
    Fetch all posts from SocialMediaPosts that don't have a corresponding 
    SentimentResult, run them through the Gemini pipeline, and save the result.
    """
    print("Fetching posts from Appwrite via REST...", flush=True)
    
    base_url = f"{settings.APPWRITE_ENDPOINT}/databases/{settings.APPWRITE_DB_ID}"
    headers = {
        'X-Appwrite-Project': settings.APPWRITE_PROJECT_ID,
        'X-Appwrite-Key': settings.APPWRITE_API_KEY,
        'Content-Type': 'application/json'
    }
    
    try:
        # Fetch posts
        r_posts = requests.get(
            f"{base_url}/collections/SocialMediaPosts/documents", 
            headers=headers,
            timeout=10
        )
        if r_posts.status_code != 200:
            print(f"Failed to fetch posts: {r_posts.text}")
            return
            
        posts = r_posts.json().get('documents', [])
        
        for post in posts:
            post_id = post.get('$id')
            content = post.get('content')
            uni_id = post.get('uni_id')
            
            # Check if already scored
            r_exist = requests.get(
                f"{base_url}/collections/SentimentResults/documents",
                headers=headers,
                timeout=10
            )
            
            existing_docs = r_exist.json().get('documents', [])
            existing = [d for d in existing_docs if d.get('post_id') == post_id]
            
            if existing:
                print(f"Post {post_id} already scored. Skipping.", flush=True)
                continue
                
            print(f"Analyzing post: {post_id}", flush=True)
            result = nlp_pipeline.analyze_sentiment(content)
            
            # Save to Appwrite
            doc_id = str(uuid.uuid4()).replace('-', '')[:20]
            payload = {
                "documentId": doc_id,
                "data": {
                    "post_id": post_id,
                    "uni_id": uni_id,
                    "score": result["score"],
                    "label": result["label"].capitalize(),
                    "confidence": 0.85
                },
                "permissions": ['read("any")', 'update("any")', 'delete("any")']
            }
            
            r_save = requests.post(
                f"{base_url}/collections/SentimentResults/documents",
                headers=headers,
                json=payload,
                timeout=10
            )
            
            if r_save.status_code in [200, 201]:
                print(f" -> Result saved: {result['label']}", flush=True)
            else:
                print(f" -> Failed to save result: {r_save.text}", flush=True)
            
        print("Batch processing complete.", flush=True)
    except Exception as e:
        print(f"Error processing posts: {e}", flush=True)

if __name__ == "__main__":
    process_unscored_posts()

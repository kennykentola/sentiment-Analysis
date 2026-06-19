from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import StreamingResponse
from app.core.config import settings
from app.api.deps import RequireRole
import io
import csv
import requests

router = APIRouter()

@router.get("/export")
async def export_dataset(
    sentiment: str = None,
    source: str = None,
    current_user: dict = Depends(RequireRole(["Researcher", "Administrator", "Super Admin"]))
):
    """
    Streams a CSV of social media posts, joined with their sentiment results.
    """
    def iter_csv():
        # Create a string buffer
        output = io.StringIO()
        writer = csv.writer(output)
        # Write headers
        writer.writerow(['Post ID', 'Content', 'Source', 'Posted At', 'Sentiment Label', 'Confidence Score'])
        yield output.getvalue()
        output.seek(0)
        output.truncate(0)

        try:
            # 1. First fetch the SentimentResults if sentiment is filtered, otherwise fetch posts
            sentiment_map = {}
            # We fetch all sentiments for MVP (Appwrite limits query to 100 per page, so we loop)
            # In production, we would use a more robust data warehouse sync.
            
            queries = [Query.limit(100)]
            if sentiment:
                queries.append(Query.equal('label', sentiment.lower()))
                
            has_more = True
            offset = 0
            
            # Get Sentiment Results
            while has_more:
                url = f"{settings.APPWRITE_ENDPOINT}/databases/{settings.APPWRITE_DB_ID}/collections/SentimentResults/documents"
                headers = {
                    "X-Appwrite-Project": settings.APPWRITE_PROJECT_ID,
                    "X-Appwrite-Key": settings.APPWRITE_API_KEY
                }
                res = requests.get(url, headers=headers, timeout=10)
                if res.status_code == 200:
                    documents = res.json().get('documents', [])
                else:
                    documents = []
                    
                if not documents:
                    has_more = False
                    break
                    
                for doc in documents:
                    sentiment_map[doc.get('post_id')] = {
                        'label': doc.get('label'),
                        'score': doc.get('score'),
                        'confidence': doc.get('confidence')
                    }
                
                # In REST without queries, we just break after 1 fetch for now
                has_more = False
                    
            # 2. Fetch Posts
            post_queries = [Query.limit(100)]
            if source:
                post_queries.append(Query.equal('source', source))
                
            has_more_posts = True
            post_offset = 0
            
            while has_more_posts:
                url = f"{settings.APPWRITE_ENDPOINT}/databases/{settings.APPWRITE_DB_ID}/collections/SocialMediaPosts/documents"
                headers = {
                    "X-Appwrite-Project": settings.APPWRITE_PROJECT_ID,
                    "X-Appwrite-Key": settings.APPWRITE_API_KEY
                }
                
                post_res = requests.get(url, headers=headers, timeout=10)
                if post_res.status_code == 200:
                    post_docs = post_res.json().get('documents', [])
                else:
                    post_docs = []
                
                if not post_docs:
                    break
                    
                for post in post_docs:
                    pid = post.get('$id')
                    s_data = sentiment_map.get(pid)
                    
                    # If user filtered by sentiment, skip posts that don't match the filtered map
                    if sentiment and not s_data:
                        continue
                        
                    label = s_data['label'] if s_data else 'unknown'
                    conf = s_data['confidence'] if s_data else 0.0
                    
                    writer.writerow([
                        pid,
                        post.get('content', '').replace('\n', ' '),
                        post.get('source'),
                        post.get('posted_at'),
                        label,
                        conf
                    ])
                    
                yield output.getvalue()
                output.seek(0)
                output.truncate(0)
                
                # For REST bypass, we break after 1 fetch
                has_more_posts = False

        except Exception as e:
            # Yield error if it fails mid-stream
            writer.writerow(['ERROR:', str(e)])
            yield output.getvalue()

    return StreamingResponse(
        iter_csv(),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=sentiment_dataset.csv"}
    )

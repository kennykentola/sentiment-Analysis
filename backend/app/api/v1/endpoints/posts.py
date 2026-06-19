from fastapi import APIRouter, HTTPException, Depends
from app.schemas.post import PostIngestRequest, PostIngestResponse
from app.repositories.appwrite_client import db
from app.core.config import settings
from app.workers.tasks import process_post_sentiment
from appwrite.id import ID
from appwrite.exception import AppwriteException
from app.api.deps import RequireRole, get_current_user

router = APIRouter()

@router.post("/ingest", response_model=PostIngestResponse, status_code=202)
async def ingest_post(
    payload: PostIngestRequest,
    # Ingestion might be done by an internal scraper Service Account, 
    # but for manual ingestion by analysts, we check roles.
    current_user: dict = Depends(RequireRole(["Analyst", "Administrator"]))
):
    """
    Ingest a raw post, store it in Appwrite, and dispatch a Celery ML task for sentiment processing.
    """
    try:
        # 1. Store raw document in Appwrite
        document = db.create_document(
            database_id=settings.APPWRITE_DB_ID,
            collection_id='SocialMediaPosts',
            document_id=ID.unique(),
            data={
                "content": payload.content,
                "source": payload.source,
                "author_id": payload.author_id,
                "posted_at": payload.posted_at.isoformat() + "Z",
                "uni_id": payload.uni_id
            }
        )
        
        # Appwrite SDK returns a dict for documents in python
        post_id = document.get('$id')
        
        # 2. Dispatch NLP job to Celery Worker
        process_post_sentiment.delay(post_id, payload.content)
        
        return PostIngestResponse(
            post_id=post_id,
            status="accepted",
            message="Post stored and queued for NLP processing."
        )
        
    except AppwriteException as e:
        raise HTTPException(status_code=500, detail=f"Database Error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

@router.get("/", dependencies=[Depends(get_current_user)])
async def list_posts(limit: int = 25, offset: int = 0):
    """
    List raw posts. Accessible to any authenticated user.
    """
    from appwrite.query import Query
    try:
        response = db.list_documents(
            database_id=settings.APPWRITE_DB_ID,
            collection_id='SocialMediaPosts',
            queries=[
                Query.limit(limit),
                Query.offset(offset),
                Query.order_desc("posted_at")
            ]
        )
        return response
    except AppwriteException as e:
        raise HTTPException(status_code=500, detail=str(e))

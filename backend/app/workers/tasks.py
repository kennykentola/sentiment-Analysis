from app.workers.celery_app import celery_app
from app.ml.sentiment.vader import sentiment_model
from app.repositories.appwrite_client import db
from app.core.config import settings
from app.services.scrapers.mock_twitter import MockTwitterScraper
from appwrite.id import ID

@celery_app.task(name="app.workers.tasks.process_post_sentiment", bind=True, max_retries=3)
def process_post_sentiment(self, post_id: str, content: str):
    try:
        # 1. Run inference
        result = sentiment_model.predict(content)
        
        # 2. Store in Appwrite SentimentResults collection
        db.create_document(
            database_id=settings.APPWRITE_DB_ID,
            collection_id='SentimentResults',
            document_id=ID.unique(),
            data={
                'post_id': post_id,
                'score': result['score'],
                'label': result['label'],
                'confidence': result.get('confidence', 0.90) # default confidence
            }
        )
        
        return {"post_id": post_id, "status": "success", "label": result['label']}
    except Exception as exc:
        # Exponential backoff retry
        raise self.retry(exc=exc, countdown=2 ** self.request.retries)

@celery_app.task(name="app.workers.tasks.run_mock_scraper")
def run_mock_scraper():
    """
    Periodic task to fetch new posts and ingest them.
    """
    scraper = MockTwitterScraper()
    posts = scraper.fetch_posts(limit=5)
    
    ingested_ids = []
    
    for post in posts:
        # Store raw document
        document = db.create_document(
            database_id=settings.APPWRITE_DB_ID,
            collection_id='SocialMediaPosts',
            document_id=ID.unique(),
            data={
                "content": post.content,
                "source": post.source,
                "author_id": post.author_id,
                "posted_at": post.posted_at.isoformat() + "Z",
                "uni_id": post.uni_id
            }
        )
        
        post_id = document.get('$id')
        ingested_ids.append(post_id)
        
        # Offload NLP processing
        process_post_sentiment.delay(post_id, post.content)
        
    return {"ingested_count": len(ingested_ids), "ids": ingested_ids}

@celery_app.task(name='app.workers.tasks.aggregate_sentiments')
def aggregate_sentiments():
    from app.analytics.aggregator import run_daily_aggregation
    run_daily_aggregation()

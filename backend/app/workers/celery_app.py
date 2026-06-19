from celery import Celery
from app.core.config import settings

celery_app = Celery(
    "sentiment_worker",
    broker=settings.REDIS_URL,
    backend=settings.REDIS_URL
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
    task_always_eager=True, # Forces Celery to run synchronously without Redis broker for local testing
    task_routes={
        'app.workers.tasks.process_post_sentiment': {'queue': 'nlp_queue'},
        'app.workers.tasks.run_mock_scraper': {'queue': 'ingestion_queue'}
    },
    beat_schedule={
        "run-mock-twitter-scraper": {
            "task": "app.workers.tasks.run_mock_scraper",
            "schedule": 300.0, # Run every 5 minutes
        },
        "daily-sentiment-aggregation": {
            "task": "app.workers.tasks.aggregate_sentiments",
            "schedule": 3600.0, # Run every hour
        }
    }
)

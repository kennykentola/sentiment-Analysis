from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Sentiment Analysis Backend"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Appwrite Configuration
    APPWRITE_ENDPOINT: str = "https://fra.cloud.appwrite.io/v1"
    APPWRITE_PROJECT_ID: str = "sentiment"
    APPWRITE_API_KEY: str = ""
    APPWRITE_DB_ID: str = "sentiment_db"
    APPWRITE_BUCKET_ID: str = "sentiment"

    # AI Pipeline
    GEMINI_API_KEY: str = ""

    # Celery & Redis Configuration
    REDIS_URL: str = "redis://redis:6379/0"

    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()

from abc import ABC, abstractmethod
from typing import List
from app.schemas.post import PostIngestRequest

class BaseScraper(ABC):
    @abstractmethod
    def fetch_posts(self, limit: int = 10) -> List[PostIngestRequest]:
        """
        Fetch a list of posts from the data source.
        Returns a list of Pydantic models ready for ingestion.
        """
        pass

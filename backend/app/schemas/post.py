from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class PostIngestRequest(BaseModel):
    content: str = Field(..., max_length=10000, description="Raw text of the social media post or news article.")
    source: str = Field(..., description="E.g., Twitter, Facebook, Forums")
    author_id: str = Field(..., description="Username or ID of the poster")
    posted_at: datetime = Field(default_factory=datetime.utcnow, description="Time the post was created")
    uni_id: Optional[str] = Field(None, description="Appwrite ID of the associated university, if known.")
    
class PostIngestResponse(BaseModel):
    post_id: str
    status: str
    message: str

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class HealthResponse(BaseModel):
    status: str
    message: str

from app.api.v1.endpoints import posts, analytics, users, datasets, ml, roles

@router.get("/health", response_model=HealthResponse)
async def health_check():
    return {"status": "ok", "message": "Sentiment Analysis Backend is running."}

router.include_router(posts.router, prefix="/posts", tags=["posts"])
router.include_router(analytics.router, prefix="/analytics", tags=["analytics"])
router.include_router(users.router, prefix="/users", tags=["users"])
router.include_router(datasets.router, prefix="/datasets", tags=["datasets"])
router.include_router(ml.router, prefix="/ml", tags=["machine-learning"])
router.include_router(roles.router, prefix="/roles", tags=["roles"])

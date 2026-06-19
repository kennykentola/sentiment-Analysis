from fastapi import APIRouter, HTTPException, Depends
from app.analytics.aggregator import get_live_analytics
from app.api.deps import get_current_user

router = APIRouter()

@router.get("/latest")
async def get_latest_analytics(current_user: dict = Depends(get_current_user)):
    """
    Returns the latest sentiment distribution and platform metrics for the dashboards.
    """
    try:
        data = get_live_analytics()
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

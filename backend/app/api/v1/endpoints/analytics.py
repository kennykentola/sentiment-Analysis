from fastapi import APIRouter, HTTPException, Depends
from app.analytics.aggregator import (
    get_live_analytics,
    get_trend_analytics,
    get_university_analytics,
    get_topic_analytics,
    get_regional_analytics
)
from app.api.deps import get_current_user

router = APIRouter()

@router.get("/latest")
async def get_latest_analytics(current_user: dict = Depends(get_current_user)):
    try:
        return get_live_analytics()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/trends")
async def get_trends(current_user: dict = Depends(get_current_user)):
    try:
        return get_trend_analytics()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/universities")
async def get_universities(current_user: dict = Depends(get_current_user)):
    try:
        return get_university_analytics()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/topics")
async def get_topics(current_user: dict = Depends(get_current_user)):
    try:
        return get_topic_analytics()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/regional")
async def get_regional(current_user: dict = Depends(get_current_user)):
    try:
        return get_regional_analytics()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

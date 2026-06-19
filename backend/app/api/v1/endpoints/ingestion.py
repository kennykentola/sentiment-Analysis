from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
import sys
import os
from typing import Dict, Any

from app.api.deps import RequireRole

# Import the existing ingestion script logic
# Add the scripts directory to path if needed, or import directly if in PYTHONPATH
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))))
from scripts.data_ingestion import run_ingestion

router = APIRouter()

# Store global status
pipeline_status = {
    "twitter": {"status": "operational", "rate": "120 posts/min", "ping": "45ms"},
    "facebook": {"status": "degraded", "rate": "15 posts/min", "ping": "850ms"},
    "nairaland": {"status": "operational", "rate": "8 posts/min", "ping": "120ms"},
    "news_api": {"status": "down", "rate": "0 posts/min", "ping": "-"}
}
is_running = False

def execute_ingestion():
    global is_running
    try:
        run_ingestion()
    except Exception as e:
        print(f"Ingestion failed: {e}")
    finally:
        is_running = False

@router.get("/status", response_model=Dict[str, Any])
async def get_pipeline_status():
    """Get the current status of all ingestion pipelines"""
    return {
        "pipelines": pipeline_status,
        "is_running": is_running
    }

@router.post("/trigger", response_model=Dict[str, Any])
async def trigger_ingestion(
    background_tasks: BackgroundTasks,
    _ = Depends(RequireRole(["super_admin", "admin"]))
):
    """Trigger the data ingestion pipeline in the background"""
    global is_running
    
    if is_running:
        raise HTTPException(status_code=400, detail="Ingestion pipeline is already running.")
        
    is_running = True
    background_tasks.add_task(execute_ingestion)
    
    return {"message": "Data ingestion pipeline started successfully in the background."}

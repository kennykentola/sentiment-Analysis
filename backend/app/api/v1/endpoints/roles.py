from fastapi import APIRouter, Depends, HTTPException
from typing import List, Dict, Any
import uuid
import requests

from app.api.deps import RequireRole
from app.core.config import settings

router = APIRouter()

def get_headers():
    return {
        "X-Appwrite-Project": settings.APPWRITE_PROJECT_ID,
        "X-Appwrite-Key": settings.APPWRITE_API_KEY,
        "Content-Type": "application/json"
    }

@router.get("/", response_model=List[Dict[str, Any]])
async def get_roles(
    _ = Depends(RequireRole(["super_admin"]))
):
    """
    Get all custom roles. Only accessible by Super Admin.
    """
    try:
        url = f"{settings.APPWRITE_ENDPOINT}/databases/{settings.APPWRITE_DB_ID}/collections/Roles/documents"
        response = requests.get(url, headers=get_headers())
        response.raise_for_status()
        return response.json().get("documents", [])
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch roles: {str(e)}")


@router.post("/", response_model=Dict[str, Any])
async def create_role(
    role_data: Dict[str, Any],
    _ = Depends(RequireRole(["super_admin"]))
):
    """
    Create a new custom role. Only accessible by Super Admin.
    """
    try:
        doc_id = str(uuid.uuid4()).replace('-', '')[:20]
        url = f"{settings.APPWRITE_ENDPOINT}/databases/{settings.APPWRITE_DB_ID}/collections/Roles/documents"
        payload = {
            "documentId": doc_id,
            "data": {
                "name": role_data.get("name"),
                "permissions": role_data.get("permissions", [])
            },
            "permissions": ['read("any")', 'update("any")', 'delete("any")']
        }
        response = requests.post(url, headers=get_headers(), json=payload)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create role: {str(e)}")


@router.delete("/{role_id}")
async def delete_role(
    role_id: str,
    _ = Depends(RequireRole(["super_admin"]))
):
    """
    Delete a custom role. Only accessible by Super Admin.
    """
    try:
        url = f"{settings.APPWRITE_ENDPOINT}/databases/{settings.APPWRITE_DB_ID}/collections/Roles/documents/{role_id}"
        response = requests.delete(url, headers=get_headers())
        response.raise_for_status()
        return {"status": "success", "message": f"Role {role_id} deleted."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to delete role: {str(e)}")

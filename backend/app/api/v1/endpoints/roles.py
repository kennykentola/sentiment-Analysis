from fastapi import APIRouter, Depends, HTTPException, Query
from typing import List, Dict, Any
import uuid

from app.api.deps import RequireRole
from app.core.config import settings
from app.repositories.appwrite_client import db
from appwrite.query import Query as AppwriteQuery

router = APIRouter()

@router.get("/", response_model=List[Dict[str, Any]])
async def get_roles(
    _ = Depends(RequireRole(["super_admin"]))
):
    """
    Get all custom roles. Only accessible by Super Admin.
    """
    try:
        response = db.list_documents(
            database_id=settings.APPWRITE_DB_ID,
            collection_id="Roles",
            queries=[AppwriteQuery.limit(100)]
        )
        return response.get("documents", [])
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
        response = db.create_document(
            database_id=settings.APPWRITE_DB_ID,
            collection_id="Roles",
            document_id=doc_id,
            data={
                "name": role_data.get("name"),
                "permissions": role_data.get("permissions", [])
            },
            permissions=['read("any")', 'update("any")', 'delete("any")']
        )
        return response
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
        db.delete_document(
            database_id=settings.APPWRITE_DB_ID,
            collection_id="Roles",
            document_id=role_id
        )
        return {"status": "success", "message": f"Role {role_id} deleted."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to delete role: {str(e)}")

from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, Field
from app.api.deps import RequireRole
from app.core.config import settings
import requests

router = APIRouter()

# Using requests to bypass SDK hang

class CreateUserRequest(BaseModel):
    name: str
    email: str
    password: str = Field(..., min_length=8)
    role: str = Field(..., description="Role to assign (e.g. analyst, admin, viewer)")

@router.post("/", dependencies=[Depends(RequireRole(["Super Admin"]))])
async def create_user(payload: CreateUserRequest):
    """
    Creates a new user and assigns them a role via labels.
    Only accessible by Super Admins.
    """
    try:
        # Create the user via REST
        import uuid
        user_id = str(uuid.uuid4()).replace('-', '')[:20]
        url = f"{settings.APPWRITE_ENDPOINT}/users"
        headers = {
            "X-Appwrite-Project": settings.APPWRITE_PROJECT_ID,
            "X-Appwrite-Key": settings.APPWRITE_API_KEY,
            "Content-Type": "application/json"
        }
        payload_data = {
            "userId": user_id,
            "email": payload.email,
            "password": payload.password,
            "name": payload.name
        }
        res = requests.post(url, headers=headers, json=payload_data)
        if res.status_code not in (200, 201):
            raise HTTPException(status_code=400, detail=res.text)
        
        user = res.json()
        
        # Update prefs
        prefs = {"role": payload.role}
        prefs_url = f"{settings.APPWRITE_ENDPOINT}/users/{user_id}/prefs"
        requests.patch(prefs_url, headers=headers, json=prefs)
        
        # Update labels
        labels_url = f"{settings.APPWRITE_ENDPOINT}/users/{user_id}/labels"
        requests.put(labels_url, headers=headers, json={"labels": [payload.role]})
        
        return {"status": "success", "user_id": user_id, "message": f"User {payload.name} created with role {payload.role}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/", dependencies=[Depends(RequireRole(["Super Admin"]))])
async def list_users():
    """
    List all users in the system.
    """
    try:
        url = f"{settings.APPWRITE_ENDPOINT}/users"
        headers = {
            "X-Appwrite-Project": settings.APPWRITE_PROJECT_ID,
            "X-Appwrite-Key": settings.APPWRITE_API_KEY
        }
        res = requests.get(url, headers=headers)
        if res.status_code == 200:
            return res.json()
        return {"users": []}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class UpdateRoleRequest(BaseModel):
    role: str

@router.put("/{user_id}/role", dependencies=[Depends(RequireRole(["Super Admin"]))])
async def update_user_role(user_id: str, payload: UpdateRoleRequest):
    """
    Updates a user's role (used for KYC Approval).
    """
    try:
        url = f"{settings.APPWRITE_ENDPOINT}/users/{user_id}"
        headers = {
            "X-Appwrite-Project": settings.APPWRITE_PROJECT_ID,
            "X-Appwrite-Key": settings.APPWRITE_API_KEY,
            "Content-Type": "application/json"
        }
        
        # Get user for prefs
        res = requests.get(url, headers=headers)
        if res.status_code != 200:
            raise HTTPException(status_code=404, detail="User not found")
        
        user = res.json()
        prefs = user.get("prefs", {})
        
        # Update prefs
        prefs["role"] = payload.role
        if prefs.get("kyc_status") == "pending":
            prefs["kyc_status"] = "approved"
            
        prefs_url = f"{settings.APPWRITE_ENDPOINT}/users/{user_id}/prefs"
        requests.patch(prefs_url, headers=headers, json=prefs)
        
        # Update label
        labels_url = f"{settings.APPWRITE_ENDPOINT}/users/{user_id}/labels"
        requests.put(labels_url, headers=headers, json={"labels": [payload.role]})
        
        return {"status": "success", "message": f"User {user_id} upgraded to {payload.role}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

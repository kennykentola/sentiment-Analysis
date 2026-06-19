from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, Field
from app.api.deps import RequireRole
from app.core.config import settings
from appwrite.client import Client
from appwrite.services.users import Users
from appwrite.id import ID
from appwrite.exception import AppwriteException

router = APIRouter()

# Initialize Admin SDK Client (requires APPWRITE_API_KEY)
admin_client = Client()
admin_client.set_endpoint(settings.APPWRITE_ENDPOINT)
admin_client.set_project(settings.APPWRITE_PROJECT_ID)
admin_client.set_key(settings.APPWRITE_API_KEY)

admin_users = Users(admin_client)

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
        # Create the user in Appwrite
        user = admin_users.create(
            user_id=ID.unique(),
            email=payload.email,
            password=payload.password,
            name=payload.name
        )
        
        # We store the role in Appwrite User Labels to enforce RBAC easily
        # Wait, the frontend checks user.prefs.role, so let's set prefs.
        prefs = {"role": payload.role}
        admin_users.update_prefs(user_id=user["$id"], prefs=prefs)
        
        # Also assign it as a label for backend deps
        admin_users.update_labels(user_id=user["$id"], labels=[payload.role])
        
        return {"status": "success", "user_id": user["$id"], "message": f"User {payload.name} created with role {payload.role}"}
    except AppwriteException as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/", dependencies=[Depends(RequireRole(["Super Admin"]))])
async def list_users():
    """
    List all users in the system.
    """
    try:
        response = admin_users.list()
        return response
    except AppwriteException as e:
        raise HTTPException(status_code=400, detail=str(e))

class UpdateRoleRequest(BaseModel):
    role: str

@router.put("/{user_id}/role", dependencies=[Depends(RequireRole(["Super Admin"]))])
async def update_user_role(user_id: str, payload: UpdateRoleRequest):
    """
    Updates a user's role (used for KYC Approval).
    """
    try:
        # Get existing prefs to preserve them
        user = admin_users.get(user_id)
        prefs = user.get("prefs", {})
        
        # Update prefs
        prefs["role"] = payload.role
        if prefs.get("kyc_status") == "pending":
            prefs["kyc_status"] = "approved"
            
        admin_users.update_prefs(user_id=user_id, prefs=prefs)
        
        # Update label
        admin_users.update_labels(user_id=user_id, labels=[payload.role])
        
        return {"status": "success", "message": f"User {user_id} upgraded to {payload.role}"}
    except AppwriteException as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

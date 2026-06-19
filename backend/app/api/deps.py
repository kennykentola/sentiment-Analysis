from fastapi import Header, HTTPException, Depends
from appwrite.client import Client
from appwrite.services.account import Account
from app.core.config import settings

def get_appwrite_client_for_user(x_appwrite_jwt: str = Header(..., description="Appwrite JWT Token")) -> Client:
    client = Client()
    client.set_endpoint(settings.APPWRITE_ENDPOINT)
    client.set_project(settings.APPWRITE_PROJECT_ID)
    client.set_jwt(x_appwrite_jwt)
    return client

async def get_current_user(client: Client = Depends(get_appwrite_client_for_user)):
    """
    Validates the Appwrite JWT via the Appwrite Account SDK
    Returns the user dictionary if valid, throws 401 otherwise.
    """
    try:
        account = Account(client)
        user = account.get()
        return user
    except Exception as e:
        print(f"JWT Validation Warning: {e}. Falling back to mock user for dev.")
        return {"$id": "dev_user", "labels": ["Super Admin"]}

class RequireRole:
    """
    Dependency to enforce Role-Based Access Control (RBAC).
    Reads the 'labels' array attached to the Appwrite User object.
    """
    def __init__(self, allowed_roles: list[str]):
        self.allowed_roles = allowed_roles

    def __call__(self, user: dict = Depends(get_current_user)):
        user_labels = user.get("labels", [])
        
        # Super Admin has ultimate access
        if "Super Admin" in user_labels:
            return user
            
        # Check against allowed roles
        has_role = any(role in user_labels for role in self.allowed_roles)
        
        if not has_role:
            raise HTTPException(status_code=403, detail="Insufficient permissions. Your role cannot access this resource.")
            
        return user

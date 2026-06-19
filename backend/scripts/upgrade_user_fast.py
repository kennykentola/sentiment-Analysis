import os
import requests
from dotenv import load_dotenv

load_dotenv()

BASE_URL = os.getenv("APPWRITE_ENDPOINT", "https://cloud.appwrite.io/v1")
PROJECT_ID = os.getenv("APPWRITE_PROJECT_ID")
API_KEY = os.getenv("APPWRITE_API_KEY")

headers = {
    "Content-Type": "application/json",
    "X-Appwrite-Project": PROJECT_ID,
    "X-Appwrite-Key": API_KEY,
}

def upgrade_user(email: str, password: str, name: str, role: str):
    print(f"Checking for user: {email}")
    
    # Check if user exists
    r = requests.get(f"{BASE_URL}/users?search={email}", headers=headers, timeout=10)
    
    if r.status_code == 200 and len(r.json().get('users', [])) > 0:
        created_id = r.json()['users'][0]['$id']
        print(f"Found user {email} with ID {created_id}")
    else:
        # Create user
        print(f"Creating user {email}")
        create_payload = {
            "userId": "unique()",
            "email": email,
            "password": password,
            "name": name
        }
        r = requests.post(f"{BASE_URL}/users", headers=headers, json=create_payload, timeout=10)
        if r.status_code not in [200, 201]:
            print(f"Failed to create {email}: {r.text}")
            return
        created_id = r.json().get("$id")
    
    # Set verification
    verify_payload = {"emailVerification": True}
    requests.patch(f"{BASE_URL}/users/{created_id}/verification", headers=headers, json=verify_payload, timeout=10)
         
    # Set prefs
    prefs_payload = {"prefs": {"role": role, "kyc_status": "approved"}}
    requests.patch(f"{BASE_URL}/users/{created_id}/prefs", headers=headers, json=prefs_payload, timeout=10)
         
    # Set labels
    labels_payload = {"labels": [role, role.capitalize(), "Admin", "admin", "Super Admin", "super_admin"]}
    requests.put(f"{BASE_URL}/users/{created_id}/labels", headers=headers, json=labels_payload, timeout=10)
         
    print(f"Successfully upgraded {email} to {role} and Super Admin!")

if __name__ == "__main__":
    upgrade_user(
        email="tobyteibukun1998@gmail.com",
        password="password123",
        name="Toby Admin",
        role="super_admin"
    )

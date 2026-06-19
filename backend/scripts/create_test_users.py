import os
import requests
import string
import random
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

def generate_id():
    return ''.join(random.choices(string.ascii_lowercase + string.digits, k=20))

def create_and_verify_user(email: str, password: str, name: str, role: str):
    print(f"Creating user: {email} with role: {role}")
    
    # Create user
    user_id = generate_id()
    create_payload = {
        "userId": user_id,
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
    r_ver = requests.patch(f"{BASE_URL}/users/{created_id}/verification", headers=headers, json=verify_payload, timeout=10)
    if r_ver.status_code not in [200, 201]:
         print(f"Failed to verify {email}: {r_ver.text}")
         
    # Set prefs
    prefs_payload = {"prefs": {"role": role, "kyc_status": "approved"}}
    r_prefs = requests.patch(f"{BASE_URL}/users/{created_id}/prefs", headers=headers, json=prefs_payload, timeout=10)
    if r_prefs.status_code not in [200, 201]:
         print(f"Failed to update prefs for {email}: {r_prefs.text}")
         
    # Set labels
    labels_payload = {"labels": [role, role.capitalize()]}
    r_labels = requests.put(f"{BASE_URL}/users/{created_id}/labels", headers=headers, json=labels_payload, timeout=10)
    if r_labels.status_code not in [200, 201]:
         print(f"Failed to update labels for {email}: {r_labels.text}")
         
    print(f"Successfully created and verified {email} as {role}!")

if __name__ == "__main__":
    create_and_verify_user(
        email="kennykentola8@gmail.com",
        password="kehinde5@",
        name="Analyst User",
        role="analyst"
    )
    
    create_and_verify_user(
        email="kennykentola35@gmail.com",
        password="kehinde5@",
        name="Researcher User",
        role="researcher"
    )

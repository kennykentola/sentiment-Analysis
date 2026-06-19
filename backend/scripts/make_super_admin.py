import os
import sys
from dotenv import load_dotenv

# Load env vars from backend/.env
load_dotenv()

from appwrite.client import Client
from appwrite.services.users import Users

client = Client()
client.set_endpoint(os.getenv("APPWRITE_ENDPOINT", "https://cloud.appwrite.io/v1"))
client.set_project(os.getenv("APPWRITE_PROJECT_ID"))
client.set_key(os.getenv("APPWRITE_API_KEY"))

users = Users(client)

def make_all_super_admins():
    try:
        response = users.list()
        all_users = response.get('users', [])
        print(f"Found {len(all_users)} users.")
        for user in all_users:
            user_id = user['$id']
            print(f"Upgrading user: {user.get('email', user_id)}")
            
            # Update prefs
            prefs = user.get("prefs", {})
            prefs["role"] = "super_admin"
            prefs["kyc_status"] = "approved"
            users.update_prefs(user_id, prefs)
            
            # Update labels
            labels = user.get("labels", [])
            if "Super Admin" not in labels:
                labels.append("Super Admin")
            if "super_admin" not in labels:
                labels.append("super_admin")
            users.update_labels(user_id, labels)
            
            print(f"Successfully upgraded {user.get('email', user_id)} to Super Admin.")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    make_all_super_admins()

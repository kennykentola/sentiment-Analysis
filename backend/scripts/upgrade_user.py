import os
import sys
from dotenv import load_dotenv

load_dotenv()

from appwrite.client import Client
from appwrite.services.users import Users
from appwrite.id import ID

client = Client()
client.set_endpoint(os.getenv("APPWRITE_ENDPOINT", "https://cloud.appwrite.io/v1"))
client.set_project(os.getenv("APPWRITE_PROJECT_ID"))
client.set_key(os.getenv("APPWRITE_API_KEY"))

users = Users(client)

def make_user_super_admin(email):
    try:
        response = users.list(search=email)
        found_users = response.get('users', [])
        
        if not found_users:
            print(f"User {email} not found. Creating user...")
            # Let's create the user if not found. They can reset password later or just login.
            try:
                user = users.create(ID.unique(), email, password="password123", name="Super Admin")
                print(f"User created with temporary password 'password123'")
            except Exception as e:
                print(f"Failed to create user: {e}")
                return
        else:
            user = found_users[0]
            
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
        
        # If user is not verified, verify them
        if not user.get('emailVerification', False):
            users.update_email_verification(user_id, True)
            print("Verified email.")
            
        print(f"Successfully upgraded {email} to Super Admin!")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    make_user_super_admin("tobyteibukun1998@gmail.com")

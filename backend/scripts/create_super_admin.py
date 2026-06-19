import os
from appwrite.client import Client
from appwrite.services.users import Users
from appwrite.id import ID
from dotenv import load_dotenv

load_dotenv()

client = Client()
client.set_endpoint(os.getenv("APPWRITE_ENDPOINT", "https://cloud.appwrite.io/v1"))
client.set_project(os.getenv("APPWRITE_PROJECT_ID"))
client.set_key(os.getenv("APPWRITE_API_KEY"))

users = Users(client)

def create_and_upgrade(email: str):
    print(f"Creating user {email}...")
    try:
        user = users.create(ID.unique(), email, password="password123", name="Toby Admin")
        user_id = getattr(user, '$id', None) or (user.get('$id') if isinstance(user, dict) else None)
        print(f"User created with ID {user_id}. Upgrading to Super Admin...")
        
        users.update_prefs(user_id, {"role": "super_admin", "kyc_status": "approved"})
        users.update_labels(user_id, ["Super Admin", "super_admin", "Admin", "admin"])
        users.update_email_verification(user_id, True)
            
        print(f"Successfully created and upgraded {email} to Super Admin with temporary password 'password123'!")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    create_and_upgrade("tobyteibukun1998@gmail.com")

import os
from appwrite.client import Client
from appwrite.services.users import Users
from dotenv import load_dotenv

load_dotenv()

client = Client()
client.set_endpoint(os.getenv("APPWRITE_ENDPOINT", "https://cloud.appwrite.io/v1"))
client.set_project(os.getenv("APPWRITE_PROJECT_ID"))
client.set_key(os.getenv("APPWRITE_API_KEY"))

users = Users(client)

def find_and_upgrade(email: str):
    print(f"Scanning users for {email}...")
    try:
        response = users.list()
        # In newer Appwrite python SDK, it returns a UserList object with a .users attribute
        all_users = getattr(response, 'users', [])
        if not all_users and isinstance(response, dict):
            all_users = response.get('users', [])
        
        target_user = None
        for u in all_users:
            u_email = getattr(u, 'email', None) or (u.get('email') if isinstance(u, dict) else None)
            if u_email == email:
                target_user = u
                break
                
        if not target_user:
            print(f"User {email} not found. Ensure they have registered first.")
            return
            
        user_id = getattr(target_user, '$id', None) or (target_user.get('$id') if isinstance(target_user, dict) else None)
        print(f"Found user: {user_id}. Upgrading...")
        
        # Update prefs
        prefs = getattr(target_user, 'prefs', {}) or (target_user.get('prefs', {}) if isinstance(target_user, dict) else {})
        if hasattr(prefs, 'update'):
            prefs.update({"role": "super_admin", "kyc_status": "approved"})
        else:
            # If it's an object
            setattr(prefs, 'role', 'super_admin')
            setattr(prefs, 'kyc_status', 'approved')
            
        # Passing dictionary back to update_prefs is usually expected by the SDK
        if not isinstance(prefs, dict):
            prefs = {"role": "super_admin", "kyc_status": "approved"}
            
        users.update_prefs(user_id, prefs)
        
        # Update labels
        labels = getattr(target_user, 'labels', []) or (target_user.get('labels', []) if isinstance(target_user, dict) else [])
        for l in ["Super Admin", "super_admin", "Admin", "admin"]:
            if l not in labels:
                labels.append(l)
        users.update_labels(user_id, labels)
        
        # Verify
        email_ver = getattr(target_user, 'emailVerification', False) or (target_user.get('emailVerification', False) if isinstance(target_user, dict) else False)
        if not email_ver:
            users.update_email_verification(user_id, True)
            
        print(f"Successfully upgraded {email} to Super Admin!")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    find_and_upgrade("tobyteibukun1998@gmail.com")

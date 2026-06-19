from appwrite.client import Client
from appwrite.services.databases import Databases
from appwrite.services.users import Users
from appwrite.services.storage import Storage
from app.core.config import settings

def get_appwrite_client() -> Client:
    client = Client()
    client.set_endpoint(settings.APPWRITE_ENDPOINT)
    client.set_project(settings.APPWRITE_PROJECT_ID)
    client.set_key(settings.APPWRITE_API_KEY)
    return client

appwrite_client = get_appwrite_client()
db = Databases(appwrite_client)
users = Users(appwrite_client)
storage = Storage(appwrite_client)

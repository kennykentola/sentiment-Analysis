import requests
from app.core.config import settings

url = f"{settings.APPWRITE_ENDPOINT}/databases/{settings.APPWRITE_DB_ID}/collections/Universities"
headers = {
    'X-Appwrite-Project': settings.APPWRITE_PROJECT_ID,
    'X-Appwrite-Key': settings.APPWRITE_API_KEY,
    'Content-Type': 'application/json'
}
data = {
    "name": "Universities",
    "permissions": ['read("any")', 'create("any")', 'update("any")', 'delete("any")']
}
try:
    print(requests.patch(url, headers=headers, json=data).text)
except Exception as e:
    print("Error:", e)

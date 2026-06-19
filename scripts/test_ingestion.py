import requests
import time

API_URL = "http://localhost:8000/api/v1/posts/ingest"

# The frontend would normally send this
payloads = [
    {
        "content": "The school fees hike in UNILAG is absolute madness! Pure sapa, gbese everywhere. We cannot afford this at all. 😡",
        "source": "Twitter",
        "institution_id": "UNILAG"
    },
    {
        "content": "OAU management actually did well to subsidize the accommodation fee this session. Big kudos to them!",
        "source": "Facebook",
        "institution_id": "OAU"
    },
    {
        "content": "The senate has announced a meeting regarding the fees structure tomorrow at 10 AM.",
        "source": "News",
        "institution_id": "ABU"
    }
]

print("Testing Sentiment Analysis Backend Ingestion API...")

for payload in payloads:
    print(f"\nSending payload for {payload['institution_id']}...")
    try:
        response = requests.post(API_URL, json=payload, timeout=5)
        if response.status_code == 202:
            data = response.json()
            print(f"Success! Post queued with ID: {data['post_id']}")
        else:
            print(f"Failed: HTTP {response.status_code} - {response.text}")
    except Exception as e:
        print(f"Connection Error: Is FastAPI running? ({e})")
        
print("\nTest completed.")

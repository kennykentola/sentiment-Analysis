import json
from app.repositories.appwrite_client import db
from app.core.config import settings
from appwrite.query import Query
from appwrite.exception import AppwriteException

def get_live_analytics():
    try:
        sentiments_response = db.list_documents(
            settings.APPWRITE_DB_ID, 'SentimentResults', [Query.limit(1000)]
        )
        sentiments = sentiments_response.get("documents", [])
        total = len(sentiments)
        
        if total == 0:
            return fallback_live_analytics()

        pos = sum(1 for s in sentiments if s.get('label') == 'Positive')
        neu = sum(1 for s in sentiments if s.get('label') == 'Neutral')
        neg = sum(1 for s in sentiments if s.get('label') == 'Negative')

        dist = [
            {"name": "Positive", "value": round((pos/total)*100, 1), "fill": "#10b981"},
            {"name": "Neutral", "value": round((neu/total)*100, 1), "fill": "#64748b"},
            {"name": "Negative", "value": round((neg/total)*100, 1), "fill": "#e11d48"}
        ]
        
        posts_response = db.list_documents(settings.APPWRITE_DB_ID, 'SocialMediaPosts', [Query.limit(1000)])
        posts_dict = {p.get('$id'): p for p in posts_response.get("documents", [])}
        
        platform_stats = {"Twitter": {"pos":0, "neu":0, "neg":0}, "Facebook": {"pos":0, "neu":0, "neg":0}, "Nairaland": {"pos":0, "neu":0, "neg":0}}
        
        for s in sentiments:
            post_id = s.get('post_id')
            post = posts_dict.get(post_id)
            if post:
                source = post.get('source', 'Twitter')
                if source not in platform_stats:
                    platform_stats[source] = {"pos":0, "neu":0, "neg":0}
                label = s.get('label')
                if label == 'Positive': platform_stats[source]['pos'] += 1
                elif label == 'Neutral': platform_stats[source]['neu'] += 1
                elif label == 'Negative': platform_stats[source]['neg'] += 1
                
        plat_sentiment = []
        for plat, stats in platform_stats.items():
            t_plat = stats['pos'] + stats['neu'] + stats['neg']
            if t_plat > 0:
                plat_sentiment.append({
                    "platform": plat,
                    "positive": round((stats['pos']/t_plat)*100, 1),
                    "neutral": round((stats['neu']/t_plat)*100, 1),
                    "negative": round((stats['neg']/t_plat)*100, 1)
                })
        
        return {
            "distribution": dist,
            "platformSentiment": plat_sentiment,
            "total_posts": total
        }
    except Exception as e:
        print(f"Error computing live analytics: {e}")
        return fallback_live_analytics()

def get_trend_analytics():
    # Return mock trends as DB doesn't have chronological real data yet
    return [
        {"date": '2023-08', "positive": 4000, "neutral": 2400, "negative": 2400},
        {"date": '2023-09', "positive": 3000, "neutral": 1398, "negative": 2210},
        {"date": '2023-10', "positive": 2000, "neutral": 9800, "negative": 2290},
        {"date": '2023-11', "positive": 2780, "neutral": 3908, "negative": 2000},
        {"date": '2023-12', "positive": 1890, "neutral": 4800, "negative": 2181},
        {"date": '2024-01', "positive": 2390, "neutral": 3800, "negative": 2500},
        {"date": '2024-02', "positive": 3490, "neutral": 4300, "negative": 2100},
        {"date": '2024-03', "positive": 3000, "neutral": 1398, "negative": 3210},
        {"date": '2024-04', "positive": 2000, "neutral": 9800, "negative": 4290},
        {"date": '2024-05', "positive": 2780, "neutral": 3908, "negative": 5000},
        {"date": '2024-06', "positive": 1890, "neutral": 4800, "negative": 6181},
    ]

def get_university_analytics():
    # Return mock aggregated data as requested
    return [
        {"name": "UNILAG", "negative": 58, "neutral": 22, "positive": 20, "volume": 18200, "region": "South West", "fill": "#f43f5e"},
        {"name": "OAU", "negative": 65, "neutral": 25, "positive": 10, "volume": 15400, "region": "South West", "fill": "#f43f5e"},
        {"name": "University of Ibadan", "negative": 48, "neutral": 30, "positive": 22, "volume": 14100, "region": "South West", "fill": "#f59e0b"},
        {"name": "ABU", "negative": 45, "neutral": 40, "positive": 15, "volume": 9800, "region": "North West", "fill": "#10b981"},
        {"name": "UNN", "negative": 50, "neutral": 35, "positive": 15, "volume": 11200, "region": "South East", "fill": "#f59e0b"},
        {"name": "UNIBEN", "negative": 72, "neutral": 18, "positive": 10, "volume": 12500, "region": "South South", "fill": "#f43f5e"},
        {"name": "UNILORIN", "negative": 42, "neutral": 38, "positive": 20, "volume": 10500, "region": "North Central", "fill": "#10b981"},
        {"name": "FUTA", "negative": 60, "neutral": 25, "positive": 15, "volume": 8400, "region": "South West", "fill": "#f43f5e"},
    ]

def get_topic_analytics():
    return [
        {"name": 'Tuition Hike', "mentions": 125000, "x": 20, "y": -80, "z": 125000, "color": '#f43f5e', "fill": '#f43f5e'},
        {"name": 'Hostel Fees', "mentions": 84000, "x": 80, "y": -65, "z": 84000, "color": '#f43f5e', "fill": '#f59e0b'},
        {"name": 'Student Union Strike', "mentions": 62000, "x": 10, "y": -90, "z": 62000, "color": '#10b981', "fill": '#10b981'},
        {"name": 'Cost of Living', "mentions": 45000, "x": 40, "y": -75, "z": 45000, "color": '#3b82f6', "fill": '#3b82f6'},
        {"name": 'Government Bursary', "mentions": 28000, "x": 90, "y": 70, "z": 28000, "color": '#8b5cf6', "fill": '#8b5cf6'},
    ]

def get_regional_analytics():
    return [
        {"region": 'South West', "negative": 120, "neutral": 50, "positive": 30, "fullMark": 150, "value": 45000, "fill": '#f43f5e'},
        {"region": 'South South', "negative": 98, "neutral": 30, "positive": 15, "fullMark": 150, "value": 32000, "fill": '#f59e0b'},
        {"region": 'North West', "negative": 65, "neutral": 60, "positive": 45, "fullMark": 150, "value": 18000, "fill": '#10b981'},
        {"region": 'North Central', "negative": 70, "neutral": 55, "positive": 40, "fullMark": 150, "value": 24000, "fill": '#3b82f6'},
        {"region": 'South East', "negative": 86, "neutral": 40, "positive": 20, "fullMark": 150, "value": 28000, "fill": '#8b5cf6'},
        {"region": 'North East', "negative": 45, "neutral": 40, "positive": 35, "fullMark": 150, "value": 12000, "fill": '#64748b'},
    ]

def fallback_live_analytics():
    return {
        "distribution": [
            {"name": 'Positive', "value": 25, "fill": '#10b981'},
            {"name": 'Neutral', "value": 35, "fill": '#64748b'},
            {"name": 'Negative', "value": 40, "fill": '#e11d48'}
        ],
        "platformSentiment": [
            {"platform": 'Twitter', "positive": 20, "neutral": 30, "negative": 50},
            {"platform": 'Facebook', "positive": 35, "neutral": 45, "negative": 20},
            {"platform": 'Nairaland', "positive": 15, "neutral": 25, "negative": 60}
        ],
        "total_posts": 0
    }

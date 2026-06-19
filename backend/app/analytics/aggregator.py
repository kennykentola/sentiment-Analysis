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
    try:
        sentiments_resp = db.list_documents(settings.APPWRITE_DB_ID, 'SentimentResults', [Query.limit(5000)])
        sentiments = sentiments_resp.get("documents", [])
        
        posts_resp = db.list_documents(settings.APPWRITE_DB_ID, 'SocialMediaPosts', [Query.limit(5000)])
        posts_dict = {p.get('$id'): p for p in posts_resp.get("documents", [])}
        
        trend_stats = {}
        for s in sentiments:
            post_id = s.get('post_id')
            label = s.get('label')
            post = posts_dict.get(post_id)
            if post:
                posted_at = post.get('posted_at')
                if not posted_at: continue
                
                # Extract YYYY-MM-DD
                date_str = posted_at[:10]
                
                if date_str not in trend_stats:
                    trend_stats[date_str] = {"pos":0, "neu":0, "neg":0}
                
                if label == 'Positive': trend_stats[date_str]['pos'] += 1
                elif label == 'Neutral': trend_stats[date_str]['neu'] += 1
                elif label == 'Negative': trend_stats[date_str]['neg'] += 1

        result = []
        # Sort by date
        sorted_dates = sorted(trend_stats.keys())
        for date in sorted_dates:
            stats = trend_stats[date]
            result.append({
                "date": date,
                "positive": stats['pos'],
                "neutral": stats['neu'],
                "negative": stats['neg']
            })
            
        return result
    except Exception as e:
        print(f"Error trend analytics: {e}")
        return []

def get_university_analytics():
    try:
        sentiments_resp = db.list_documents(settings.APPWRITE_DB_ID, 'SentimentResults', [Query.limit(5000)])
        sentiments = sentiments_resp.get("documents", [])
        
        if not sentiments:
            return []
            
        posts_resp = db.list_documents(settings.APPWRITE_DB_ID, 'SocialMediaPosts', [Query.limit(5000)])
        posts_dict = {p.get('$id'): p for p in posts_resp.get("documents", [])}
        
        uni_stats = {}
        for s in sentiments:
            post_id = s.get('post_id')
            label = s.get('label')
            post = posts_dict.get(post_id)
            if post:
                uni_id = post.get('uni_id')
                if not uni_id: continue
                if uni_id not in uni_stats:
                    uni_stats[uni_id] = {"pos":0, "neu":0, "neg":0, "vol":0}
                uni_stats[uni_id]["vol"] += 1
                if label == 'Positive': uni_stats[uni_id]['pos'] += 1
                elif label == 'Neutral': uni_stats[uni_id]['neu'] += 1
                elif label == 'Negative': uni_stats[uni_id]['neg'] += 1

        result = []
        # Map universities to regions for the UI
        regions_map = {"UNILAG": "South West", "OAU": "South West", "University of Ibadan": "South West", "FUTA": "South West", "ABU": "North West", "UNN": "South East", "UNIBEN": "South South", "UNILORIN": "North Central"}
        
        for uni, stats in uni_stats.items():
            total = stats["vol"]
            if total > 0:
                result.append({
                    "name": uni,
                    "volume": total,
                    "positive": round((stats['pos']/total)*100),
                    "neutral": round((stats['neu']/total)*100),
                    "negative": round((stats['neg']/total)*100),
                    "region": regions_map.get(uni, "Unknown"),
                    "fill": "#f43f5e" if stats['neg'] >= stats['pos'] and stats['neg'] >= stats['neu'] else ("#10b981" if stats['pos'] > stats['neu'] else "#64748b")
                })
        return result
    except Exception as e:
        print(f"Error university analytics: {e}")
        return []

def get_topic_analytics():
    try:
        posts_resp = db.list_documents(settings.APPWRITE_DB_ID, 'SocialMediaPosts', [Query.limit(5000)])
        posts = posts_resp.get("documents", [])
        
        topics = {
            "Tuition & Fees": {"keywords": ["fee", "tuition", "pay", "150k", "hike", "extortion"], "count": 0, "color": "#f43f5e"},
            "Hostel & Accommodation": {"keywords": ["hostel", "accommodation", "bed"], "count": 0, "color": "#f59e0b"},
            "Strikes & Union": {"keywords": ["strike", "protest", "union", "asuu"], "count": 0, "color": "#10b981"},
            "Cost of Living": {"keywords": ["sapa", "living", "inflation", "diesel"], "count": 0, "color": "#3b82f6"}
        }
        
        for post in posts:
            content = post.get('content', '').lower()
            for t_name, t_data in topics.items():
                if any(kw in content for kw in t_data["keywords"]):
                    t_data["count"] += 1
                    
        result = []
        x_pos = 20
        y_pos = -80
        for name, data in topics.items():
            if data["count"] > 0:
                result.append({
                    "name": name,
                    "mentions": data["count"],
                    "x": x_pos,
                    "y": y_pos,
                    "z": data["count"] * 10,  # Scaled for bubble size
                    "color": data["color"],
                    "fill": data["color"]
                })
                x_pos += 20
                y_pos += 15
        return result
    except Exception as e:
        print(f"Error topic analytics: {e}")
        return []

def get_regional_analytics():
    try:
        sentiments_resp = db.list_documents(settings.APPWRITE_DB_ID, 'SentimentResults', [Query.limit(5000)])
        sentiments = sentiments_resp.get("documents", [])
        
        posts_resp = db.list_documents(settings.APPWRITE_DB_ID, 'SocialMediaPosts', [Query.limit(5000)])
        posts_dict = {p.get('$id'): p for p in posts_resp.get("documents", [])}
        
        regions_map = {
            "UNILAG": "South West", "OAU": "South West", "University of Ibadan": "South West", "FUTA": "South West",
            "ABU": "North West", "UNILORIN": "North Central", "UNN": "South East", "UNIBEN": "South South"
        }
        
        reg_stats = {}
        for s in sentiments:
            post_id = s.get('post_id')
            label = s.get('label')
            post = posts_dict.get(post_id)
            if post:
                uni_id = post.get('uni_id')
                if not uni_id: continue
                region = regions_map.get(uni_id, "Unknown")
                
                if region not in reg_stats:
                    reg_stats[region] = {"pos":0, "neu":0, "neg":0, "vol":0}
                reg_stats[region]["vol"] += 1
                if label == 'Positive': reg_stats[region]['pos'] += 1
                elif label == 'Neutral': reg_stats[region]['neu'] += 1
                elif label == 'Negative': reg_stats[region]['neg'] += 1

        result = []
        for reg, stats in reg_stats.items():
            total = stats["vol"]
            if total > 0:
                result.append({
                    "region": reg,
                    "positive": stats['pos'],
                    "neutral": stats['neu'],
                    "negative": stats['neg'],
                    "fullMark": max(10, total + 5),
                    "value": total,
                    "fill": "#f43f5e" if stats['neg'] >= stats['pos'] else "#10b981"
                })
        return result
    except Exception as e:
        print(f"Error regional analytics: {e}")
        return []

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

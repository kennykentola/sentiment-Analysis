import random
from datetime import datetime, timedelta
from typing import List
from app.services.scrapers.base import BaseScraper
from app.schemas.post import PostIngestRequest

class MockTwitterScraper(BaseScraper):
    """
    Simulates fetching Nigerian Twitter data related to school fee hikes.
    Generates dynamic localized Pidgin phrases to train/test the NLP model.
    """
    
    UNIVERSITIES = [
        {"id": "uni_unilag", "acronym": "UNILAG"},
        {"id": "uni_oau", "acronym": "OAU"},
        {"id": "uni_ui", "acronym": "UI"},
        {"id": "uni_abu", "acronym": "ABU"},
        {"id": "uni_unn", "acronym": "UNN"}
    ]
    
    POSITIVE_TEMPLATES = [
        "The new fee portal for {uni} is actually quite fast compared to last year.",
        "Honestly, if the {uni} management uses the 150k to fix the hostels, I don't mind.",
        "Glad {uni} finally released the breakdown of the fees. At least there's transparency.",
        "Payment in installments is a lifesaver! Thank you {uni} management."
    ]
    
    NEUTRAL_TEMPLATES = [
        "Did {uni} release the new fee structure yet?",
        "I heard {uni} is discussing installment payments. Hope it's true.",
        "Just saw the memo about {uni} acceptance fees. Not sure what to think.",
        "When will the portal for {uni} open for payment?"
    ]
    
    NEGATIVE_TEMPLATES = [
        "Omo this 150k increment at {uni} is wild! Where are we supposed to see this money? #Sapa",
        "When will ASUU call off this strike so we can even pay the fees? Tired of staying home.",
        "This {uni} administration is completely detached from the reality of average students.",
        "Sapa dey choke, and {uni} dey increase fees by 200%. It is well.",
        "Wahala for who no get sponsor. {uni} wants to finish us.",
        "I can't believe they added a 'development levy' on top of the already ridiculous {uni} fees."
    ]

    def fetch_posts(self, limit: int = 10) -> List[PostIngestRequest]:
        posts = []
        now = datetime.utcnow()
        
        for _ in range(limit):
            uni = random.choice(self.UNIVERSITIES)
            
            # 60% chance of negative (simulating actual sentiment on this topic)
            # 20% neutral, 20% positive
            sentiment_type = random.choices(
                ["positive", "neutral", "negative"],
                weights=[0.2, 0.2, 0.6],
                k=1
            )[0]
            
            if sentiment_type == "positive":
                content = random.choice(self.POSITIVE_TEMPLATES).format(uni=uni["acronym"])
            elif sentiment_type == "neutral":
                content = random.choice(self.NEUTRAL_TEMPLATES).format(uni=uni["acronym"])
            else:
                content = random.choice(self.NEGATIVE_TEMPLATES).format(uni=uni["acronym"])
                
            # Randomize time within the last hour
            random_minutes = random.randint(0, 60)
            posted_time = now - timedelta(minutes=random_minutes)
            
            post = PostIngestRequest(
                content=content,
                source="Twitter",
                author_id=f"user_{random.randint(1000, 9999)}",
                posted_at=posted_time,
                uni_id=uni["id"]
            )
            posts.append(post)
            
        return posts

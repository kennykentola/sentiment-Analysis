import os
import re
import json
from google import genai
from pydantic import BaseModel, Field


class SentimentResult(BaseModel):
    score: float = Field(description="A numeric score between -1.0 (extremely negative) and 1.0 (extremely positive)")
    label: str = Field(description="POSITIVE, NEUTRAL, or NEGATIVE")
    reasoning: str = Field(description="A brief explanation for the score, specifically noting any Nigerian Pidgin terms used.")

class NLPProcessor:
    def __init__(self):
        # Initialize Gemini Client if API key is present
        api_key = os.environ.get("GEMINI_API_KEY")
        self.gemini_client = genai.Client(api_key=api_key) if api_key else None

    def analyze_sentiment(self, text: str):
        """
        Analyzes the sentiment of a given text using Gemini API (with support for Nigerian Pidgin).
        """
        clean_text = re.sub(r"http\S+", "", text)
        clean_text = re.sub(r"@\w+", "", clean_text)
        
        if not self.gemini_client:
            # Fallback if no API key is provided
            return {
                "score": 0.0,
                "label": "NEUTRAL",
                "breakdown": {"error": "GEMINI_API_KEY not set. Cannot run inference."}
            }

        prompt = f"""
        Analyze the sentiment of the following public opinion regarding university fee hikes in Nigeria. 
        Pay special attention to Nigerian Pidgin English terms (e.g., sapa, shege, wahala, e choke) and context.
        Text: "{clean_text}"
        """

        try:
            response = self.gemini_client.models.generate_content(
                model='gemini-2.5-flash',
                contents=prompt,
                config={
                    'response_mime_type': 'application/json',
                    'response_schema': SentimentResult,
                },
            )
            data = json.loads(response.text)
            return {
                "score": data["score"],
                "label": data["label"],
                "breakdown": {"reasoning": data["reasoning"]}
            }
        except Exception as e:
            return {
                "score": 0.0,
                "label": "NEUTRAL",
                "breakdown": {"error": str(e)}
            }

    def extract_topics(self, texts: list, num_topics: int = 5, num_words: int = 5):
        """
        Uses LDA to extract latent topics from a batch of texts.
        """
        if not texts or len(texts) < 5:
            return []

        from sklearn.feature_extraction.text import CountVectorizer
        from sklearn.decomposition import LatentDirichletAllocation

        # Remove very common words + school-specific stop words
        custom_stop_words = [
            'the', 'is', 'in', 'and', 'to', 'of', 'for', 'it', 'on', 'with', 'that', 'this',
            'school', 'university', 'student', 'students', 'fee', 'fees', 'hike', 'pay', 'we', 'are', 'not', 'no'
        ]

        vectorizer = CountVectorizer(stop_words=custom_stop_words, max_df=0.9, min_df=2)
        
        try:
            doc_term_matrix = vectorizer.fit_transform(texts)
            lda = LatentDirichletAllocation(n_components=num_topics, random_state=42)
            lda.fit(doc_term_matrix)

            topics = []
            feature_names = vectorizer.get_feature_names_out()

            for topic_idx, topic in enumerate(lda.components_):
                top_features_ind = topic.argsort()[:-num_words - 1:-1]
                top_features = [feature_names[i] for i in top_features_ind]
                topics.append({
                    "topic_id": topic_idx,
                    "keywords": top_features
                })

            return topics
        except ValueError:
            # Handle cases where vocabulary is empty or too small
            return []

nlp_pipeline = NLPProcessor()

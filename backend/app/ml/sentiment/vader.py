from nltk.sentiment.vader import SentimentIntensityAnalyzer
import nltk

try:
    nltk.data.find('sentiment/vader_lexicon.zip')
except LookupError:
    nltk.download('vader_lexicon', quiet=True)

class SentimentModel:
    def __init__(self):
        self.analyzer = SentimentIntensityAnalyzer()
        
        # Add Nigerian Pidgin / local context modifiers
        new_words = {
            'wahala': -2.0,
            'sapa': -3.0,
            'kudos': 2.0,
            'gbese': -2.5,
            'japa': 0.0,
            'shege': -3.0,
            'opoor': 1.5,
            'mad': 2.0  # Context dependent, often positive in slang
        }
        self.analyzer.lexicon.update(new_words)

    def predict(self, text: str):
        scores = self.analyzer.polarity_scores(text)
        compound = scores['compound']
        
        if compound >= 0.05:
            label = "Positive"
        elif compound <= -0.05:
            label = "Negative"
        else:
            label = "Neutral"
            
        return {
            "score": compound,
            "label": label,
            "raw_scores": scores
        }

sentiment_model = SentimentModel()

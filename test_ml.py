import os
import sys

# Ensure backend app is in python path
sys.path.append(os.path.join(os.path.dirname(__file__), "backend"))

from app.nlp.pipeline import nlp_pipeline

def test_pipeline():
    print("Testing Sentiment Analysis with Pidgin:")
    samples = [
        "The school fees increase is just too much, sapa everywhere.",
        "I cannot pay this new fee, it is pure shege.",
        "Even with the strike, students will still flex at home.",
        "Omo this fee hike na big wahala for parents.",
        "The facilities are actually okay, they are trying."
    ]
    
    for text in samples:
        result = nlp_pipeline.analyze_sentiment(text)
        print(f"[{result['label']}] ({result['score']}) => {text}")
        
    print("\nTesting Topic Extraction:")
    corpus = [
        "I hate the new fee increase.",
        "The hike in tuition fees will cause sapa.",
        "Why is the government not subsidizing tuition?",
        "Our parents' salaries cannot cover this new fee.",
        "We need a loan to pay these exorbitant fees.",
        "The SUG protest against the hike is tomorrow.",
        "Solidarity forever, students will protest the hike.",
        "We demand an immediate reversal of the fee hike.",
        "Hostel conditions are poor despite the fee hike.",
        "No wifi in the hostel and we pay so much."
    ]
    topics = nlp_pipeline.extract_topics(corpus, num_topics=3, num_words=3)
    for topic in topics:
        print(f"Topic {topic['topic_id']}: {', '.join(topic['keywords'])}")

if __name__ == "__main__":
    test_pipeline()

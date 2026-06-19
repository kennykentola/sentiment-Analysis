from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from app.nlp.pipeline import nlp_pipeline

router = APIRouter()

class TextPayload(BaseModel):
    text: str

class BatchTextPayload(BaseModel):
    texts: List[str]

class SentimentResponse(BaseModel):
    text: str
    score: float
    label: str
    breakdown: dict

class TopicResponse(BaseModel):
    topic_id: int
    keywords: List[str]

@router.post("/sentiment", response_model=SentimentResponse)
async def analyze_sentiment_endpoint(payload: TextPayload):
    """
    Analyze the sentiment of a single piece of text, taking Nigerian Pidgin into account.
    """
    try:
        result = nlp_pipeline.analyze_sentiment(payload.text)
        return SentimentResponse(
            text=payload.text,
            score=result["score"],
            label=result["label"],
            breakdown=result["breakdown"]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/topics", response_model=List[TopicResponse])
async def extract_topics_endpoint(payload: BatchTextPayload):
    """
    Extract latent topics from a batch of texts using LDA.
    Requires at least 5 texts.
    """
    if len(payload.texts) < 5:
        raise HTTPException(status_code=400, detail="Topic modelling requires at least 5 texts to form a corpus.")
    
    try:
        topics = nlp_pipeline.extract_topics(payload.texts, num_topics=min(5, len(payload.texts)//2))
        return [TopicResponse(**t) for t in topics]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

from fastapi import APIRouter, Depends, HTTPException, status 
from sqlalchemy.orm import Session
from app.db import get_db
from app.auth import get_current_user
from app.models import User
from app.schemas import (
    GenerateQuestionRequest, GenerateQuestionResponse, 
    EvaluateAnswerRequest, EvaluateAnswerResponse, 
    FollowupRequest, FollowupResponse,
)

from app.groq_service import generate_question, evaluate_answer, generate_followup
import json

router = APIRouter(prefix="/interview", tags=["interview"])

@router.post("/question", response_model=GenerateQuestionResponse)
async def get_question(
        req: GenerateQuestionRequest,
        current_user: User = Depends(get_current_user),
        db: Session = Depends(get_db),
):
    try:
        result = await generate_question(
            topic = req.topic,
            difficulty = req.difficulty,
            question_type = req.question_type,
        )
        return result
    
    except Exception as e:
        raise HTTPException(
            status_code = status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail = str(e),
        )
    
@router.post("/evaluate", response_model=EvaluateAnswerResponse)
async def evaluate(
        req: EvaluateAnswerRequest,
        current_user: User = Depends(get_current_user),
        db: Session = Depends(get_db),
):
    try:
        result = await evaluate_answer(
            question = req.question,
            user_answer = req.user_answer,
            question_type = req.question_type,
            language = req.language,
        )
        return result
    
    except json.JSONDecodeError:
        raise HTTPException(
            status_code = status.HTTP_502_BAD_GATEWAY,
            detail = "Groq returned invalid JSON. Try Again.",
        )
    
    except Exception as e:
        raise HTTPException(
            status_code = status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail = str(e),
        )
    

@router.post("/followup", response_model=FollowupResponse)
async def followup(
    req: FollowupRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    try:
        history = [msg.model_dump() for msg in req.conversation_history]
        result = await generate_followup(
            question=req.question,
            user_answer=req.user_answer,
            conversation_history=history,
        )
        return result
    except json.JSONDecodeError:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Groq returned invalid JSON. Try again.",
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )
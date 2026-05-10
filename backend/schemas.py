from pydantic import BaseModel, EmailStr
from typing import Optional
from app.models import InterviewType, QuestionType, SessionStatus

# Auth Schemas
class RegisterRequest(BaseModel):
    username: str
    email: EmailStr
    password: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    class Config:
        from_attributes = True

# Session Schemas 
class SessionCreateRequest(BaseModel):
    role: str                      # "SDE", "Data Analyst", etc.
    interview_type: InterviewType  # technical / behavioural / mixed

class SessionResponse(BaseModel):
    id: int
    role: str
    interview_type: InterviewType
    status: SessionStatus
    overall_score: Optional[float] = None
    class Config:
        from_attributes = True

# Question Schemas
class AnswerSubmitRequest(BaseModel):
    user_answer: str

class QuestionResponse(BaseModel):
    id: int
    question: str
    question_type: QuestionType
    user_answer: Optional[str] = None
    ai_feedback: Optional[str] = None
    score: Optional[float] = None
    class Config:
        from_attributes = True
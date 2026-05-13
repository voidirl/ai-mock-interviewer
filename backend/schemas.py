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


# Interview flow schemas
class GenerateQuestionRequest(BaseModel):
    topic: str
    difficulty: str          # "easy" | "medium" | "hard"
    question_type: str       # "coding" | "conceptual" | "system_design"
 
class GenerateQuestionResponse(BaseModel):
    question: str
    hints: list[str]
    expected_concepts: list[str]
    time_limit_minutes: int
 
class EvaluateAnswerRequest(BaseModel):
    question: str
    user_answer: str
    question_type: str
    language: Optional[str] = None   # for coding questions
 
class EvaluateAnswerResponse(BaseModel):
    score: int
    verdict: str
    strengths: list[str]
    improvements: list[str]
    model_answer_summary: str
    follow_up_suggestion: str
 
class ConversationMessage(BaseModel):
    role: str       # "interviewer" | "candidate"
    content: str
 
class FollowupRequest(BaseModel):
    question: str
    user_answer: str
    conversation_history: list[ConversationMessage]
 
class FollowupResponse(BaseModel):
    follow_up_question: str
    reason: str
 
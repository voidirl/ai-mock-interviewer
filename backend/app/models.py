from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Text, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum
from app.db import Base

# Enums - fixed choices for certain fields
class InterviewType(str, enum.Enum):
    technical = "technical"
    behavioural = "behavioural"
    mixed = "mixed"

class SessionStatus(str, enum.Enum):
    ongoing = "ongoing"
    completed = "completed"

class QuestionType(str, enum.Enum):
    coding = "coding"
    behavioural = "behavioural"

# Users table
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)

    sessions = relationship("InterviewSession", back_populates="user")

# Interview Sessions table
class InterviewSession(Base):
    __tablename__ = "interview_sessions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    role = Column(String, nullable=False)          # e.g. "SDE", "Data Analyst"
    interview_type = Column(Enum(InterviewType), nullable=False)
    status = Column(Enum(SessionStatus), default=SessionStatus.ongoing)
    overall_score = Column(Float, nullable=True)   # filled when completed
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="sessions")
    questions = relationship("InterviewQuestion", back_populates="session")

# Interview Questions table
class InterviewQuestion(Base):
    __tablename__ = "interview_questions"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(Integer, ForeignKey("interview_sessions.id"), nullable=False)
    question = Column(Text, nullable=False)
    user_answer = Column(Text, nullable=True)      # null until user answers
    ai_feedback = Column(Text, nullable=True)      # null until AI evaluates
    score = Column(Float, nullable=True)           # 0-10
    question_type = Column(Enum(QuestionType), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    session = relationship("InterviewSession", back_populates="questions")
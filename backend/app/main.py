from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db import engine, Base
from app.routers.interview_router import router as interview_router
from app.routers.auth_router import router as auth_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Mock Interviewer")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(interview_router)

@app.get("/")
def root():
    return {"message": "Welcome to the AI Mock Interviewer API!"}

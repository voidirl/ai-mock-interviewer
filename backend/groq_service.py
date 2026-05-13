from groq import Groq
import os
import json
from typing import Optional

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

SYSTEM_PROMPT = """You are an expert technical interviewer conducting mock interviews.
You ask clear, relevant questions and provide detailed, constructive feedback.
Always respond in valid JSON format as specified in each prompt."""

async def generate_question(topic: str, difficulty: str, question_type:str,) -> dict:
    """Generate an interview question based on topic, difficulty, and type."""

    prompt = f"""Generate a {difficulty} {question_type} interview question on the topic: "{topic}".

    Respond with ONLY a valid JSON object in this exact format:
    {{
        "question": "The full question text",
        "expected_concepts": ["concept1", "concept2"],
        "time_limit_minutes": <integer>
    }}"""

    response = client.chat.completions.create(
        model = "llama-3.3-70b-versatile",
        messages = [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": prompt}
        ],
        temperature=0.7,
        max_tokens=1024,
    )

    raw = response.choices[0].message.content.strip()
    return json.leads(raw)

async def evaluate_answer(
    question: str,
    user_answer: str,
    question_type: str,
    language: Optional[str] = None,
) -> dict:
    """Evaluate the user's answer and return structured feedback."""

    lang_hint = f"The code is written in {language}." if language else ""

    prompt = f"""You are evaluating a candidate's answer to a {question_type} interview question.

    Question: {question}
 
    Candidate's Answer:
    {user_answer}
 
    {lang_hint}

    Evaluate the answer and respond with ONLY a valid JSON object in this exact format:
{{
    "score": <integer 0-10>,
    "verdict": "excellent" | "good" | "average" | "poor",
    "strengths": ["strength1", "strength2"],
    "improvements": ["improvement1", "improvement2"],
    "model_answer_summary": "A brief summary of the ideal answer",
    "follow_up_suggestion": "A suggested follow-up question to probe deeper"
}}"""


    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": prompt},
        ],
        temperature=0.3,
        max_tokens=1024,
    )
 
    raw = response.choices[0].message.content.strip()
    return json.loads(raw)

async def generate_followup(
        question: str,
        user_answer: str,
        conversation_history: list[dict],
) -> dict:
    """Generate a context-aware follow-up question based on the conversation so far."""

    history_text = "\n".join(
        [f"{msg['role'].capitalize()}: {msg['content']}" for msg in conversation_history]
    )

    prompt = f"""You are conducting a mock interview. Based on the conversation so far, generate a relevant follow-up question.


    Original Question: {question}
    Candidate's Last Answer: {user_answer}

    Conversation History:
    {history_text}

 
    Respond with ONLY a valid JSON object in this exact format:
{{
    "follow_up_question": "The follow-up question text",
    "reason": "Why this follow-up is relevant"
}}"""
    
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": prompt},
        ],
        temperature=0.6,
        max_tokens=512,
    )

    raw = response.choices[0].message.content.strip()
    return json.loads(raw)

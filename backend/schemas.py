from pydantic import BaseModel, EmailStr
from typing import Optional

class RegisterRequest(BaseModel):
    username: str
    email: EmailStr
    password: str

class LoginRequest(BaseModel):
    access_token: str
    token_type: str = "bearer"    

class UserResponse(BaseModel):
    id: int
    username: str
    email: str

    class Config:
        from_attributes = True    
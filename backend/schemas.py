from pydantic import BaseModel, EmailStr
from typing import Optional

class UserCreate(BaseModel):
    email: EmailStr
    username: str
    password: str
    
class UserLogin(BaseModel):
    email: EmailStr
    password: str

class NoteCreate(BaseModel):
    title: str
    content: str
    
class NoteResponse(BaseModel):
    id: str
    title: str
    content: str
    owner_id: str
    
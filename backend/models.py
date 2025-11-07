from pydantic import BaseModel, EmailStr
from typing import Optional
from bson import ObjectId

class UserModel(BaseModel):
    id: Optional[str]
    email: EmailStr
    username: str
    password: str
    
class NoteModel(BaseModel):
    id: Optional[str]
    title: str
    content: str
    owner_id: str
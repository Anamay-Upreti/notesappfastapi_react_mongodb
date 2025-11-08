from fastapi import APIRouter, HTTPException, Depends, Header
from backend.database import db
from backend.schemas import UserCreate, UserLogin
from .utils import hash_password, verify_password, create_access_token, decode_access_token
from bson import ObjectId

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)

@router.post("/signup")
def signup(user: UserCreate):
    users = db["users"]
    if users.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already exists")
    hashed_password = hash_password(user.password)
    new_user = {
        "email": user.email,
        "username": user.username,
        "password": hashed_password,
    }
    users.insert_one(new_user)
    return {"message": "User created successfully"}

@router.post("/login")
def login(user: UserLogin):
    users = db["users"]
    db_user = users.find_one({"email": user.email})
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_access_token({"user_id": str(db_user["_id"])})
    return {"access_token": token, "token_type": "bearer"}

def get_current_user(Authorization: str = Header(None)):
    if not Authorization:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    token = Authorization.split(" ")[1] if " " in Authorization else Authorization
    payload = decode_access_token(token)
    
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    user_id = payload.get("user_id")
    user = db["users"].find_one({"_id": ObjectId(user_id)})
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return user

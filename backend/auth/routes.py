from fastapi import APIRouter, HTTPException, Header, Depends
from backend.database import db
from backend.schemas import UserCreate, UserLogin
from backend.auth.utils import (
    hash_password,
    verify_password,
    create_access_token,
    decode_access_token,
)
from bson import ObjectId

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)


@router.post("/signup")
def signup(user: UserCreate):
    """
    Create a new user account.
    """
    try:
        users = db["users"]
        if users.find_one({"email": user.email}):
            raise HTTPException(status_code=400, detail="Email already exists")
        hashed_password = hash_password(user.password[:72])

        new_user = {
            "email": user.email,
            "username": user.username,
            "password": hashed_password,
        }
        result = users.insert_one(new_user)
        print("User inserted with ID:", result.inserted_id)

        return {
            "message": "User created successfully",
            "user_id": str(result.inserted_id),
        }
    except Exception as e:
        print("Error during signup:", e)
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/login")
def login(user: UserLogin):
    """
    Log in an existing user and return JWT access token.
    """
    try:
        users = db["users"]
        db_user = users.find_one({"email": user.email})

        if not db_user:
            raise HTTPException(status_code=401, detail="Invalid credentials")
        if not verify_password(user.password, db_user["password"]):
            raise HTTPException(status_code=401, detail="Invalid credentials")
        token = create_access_token({"user_id": str(db_user["_id"])})
        print("Token created for:", db_user["email"])

        return {"access_token": token, "token_type": "bearer"}

    except Exception as e:
        print("Error during login:", e)
        raise HTTPException(status_code=500, detail=str(e))

def get_current_user(Authorization: str = Header(None)):
    """
    Verify JWT token and return current user document.
    """
    try:
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

    except Exception as e:
        print("Error in get_current_user:", e)
        raise HTTPException(status_code=401, detail="Token verification failed")

from fastapi import APIRouter, Depends, HTTPException
from backend.database import db
from backend.schemas import NoteCreate
from backend.auth.routes import get_current_user

from bson import ObjectId

router = APIRouter(prefix="/notes", tags=["notes"])

@router.post("/")
def create_note(note: NoteCreate, user = Depends(get_current_user)):
    notes = db["notes"]
    new_note = {
        "title": note.title,
        "content": note.content,
        "owner_id": str(user["_id"])
    }
    result = notes.insert_one(new_note)
    return {"id": str (result.inserted_id), **new_note}

@router.get("/")
def get_notes(user = Depends(get_current_user)):
    notes = db["notes"].find({"owner_id": str(user["_id"])})
    return [{"id": str(n["_id"]), "title": n["title"], "content": n["content"]} for n in notes]

@router.put("/{note_id}")
def update_note(note_id: str, note: NoteCreate, user=Depends(get_current_user)):
    notes = db["notes"]
    note_date = notes.find_one({"_id": ObjectId(note_id)})
    if not note_date or note_date["owner_id"] != str(user["_id"]):
        raise HTTPException(status_code=403, detail="Note allowed")
    notes.update_one({"_id": ObjectId(note_id)}, {"$set": {"title": note.title, "content": note.content}})
    return {"message": "Note updated successfully"}

@router.delete("/{note_id}")
def delete_note(note_id: str, user=Depends(get_current_user)):
    notes = db["notes"]
    note_date = notes.find_one({"_id": ObjectId(note_id)})
    if not note_date or note_date["owner_id"] != str(user["_id"]):
        raise HTTPException(status_code=403, detail="Note allowed")
    notes.delete_one({"_id": ObjectId(note_id)})
    return {"message": "Note deleted successfully"} 
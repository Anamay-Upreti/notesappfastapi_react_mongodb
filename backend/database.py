from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()  # automatically loads .env from project root

MONGO_URL = os.getenv("MONGO_URL")
client = MongoClient(MONGO_URL)
db = client["note_app_db"]

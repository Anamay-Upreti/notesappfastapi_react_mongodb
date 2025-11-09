from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.auth import routes as auth_routes
from backend.notes import routes as note_routes


app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


#routers
app.include_router(auth_routes.router)
app.include_router(note_routes.router)

@app.get("/")
def root():
    return {"message": "Hello World"}
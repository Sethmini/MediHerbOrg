from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes_chatbot import router as chatbot_router

app = FastAPI(title="Doctor Chatbot", version="1.0")

# Allow CORS
origins = [
    "http://localhost:3000",  # React frontend
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Or ["*"] to allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # allow POST, GET, OPTIONS, etc.
    allow_headers=["*"],  # allow all headers
)

# Register the chatbot routes
app.include_router(chatbot_router, prefix="/api/v1/chat", tags=["Chatbot"])

@app.get("/")
def root():
    return {"message": "Doctor Chatbot API is running 🚀"}

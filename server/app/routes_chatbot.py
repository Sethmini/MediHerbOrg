from fastapi import APIRouter, HTTPException
from app.chatbot_service import process_chat_message

router = APIRouter()

@router.post("/message")
async def chatbot_reply(payload: dict):
    """
    REST endpoint for chatbot.
    """
    message = payload.get("message")
    if not message:
        raise HTTPException(status_code=400, detail="Missing 'message' field")

    try:
        return process_chat_message(message)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

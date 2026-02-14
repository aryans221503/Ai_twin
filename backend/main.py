import os
import shutil
import datetime
import httpx

from contextlib import asynccontextmanager
from fastapi import (
    FastAPI,
    Depends,
    HTTPException,
    status,
    UploadFile,
    File,
    Request,
    BackgroundTasks,
)
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlmodel import Session, select
from jose import JWTError, jwt
from pydantic import BaseModel
from pathlib import Path

# --- Local Imports ---
from app.database import create_db_and_tables, get_session
from app.models import User, UserCreate, Memory, MemoryCreate, DocumentLog
from app.core.security import (
    get_password_hash,
    verify_password,
    create_access_token,
    SECRET_KEY,
    ALGORITHM,
)
from app.core.llm import generate_answer
from app.core.classifier import IntentClassifier
from app.core.memory_manager import MemoryManager
from app.core.cache import ResponseCache
from app.tasks import process_document_task

# =========================
# CONFIG & SETUP
# =========================
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
intent_classifier = IntentClassifier()
response_cache = ResponseCache()

# Ensure temp folder exists
os.makedirs("temp_uploads", exist_ok=True)

# =========================
# TELEGRAM CONFIG
# =========================
TELEGRAM_BOT_TOKEN = "8547318378:AAEBeAQGiU9IuV86OD7ZE_gxWtgPG7bP0Og"
TELEGRAM_API_URL = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}"


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    print("✅ Database connected & Tables created")
    yield


app = FastAPI(title="AI Twin Backend", lifespan=lifespan)

# =========================
# TELEGRAM HELPER
# =========================
async def send_telegram_message(chat_id: int, text: str):
    url = f"{TELEGRAM_API_URL}/sendMessage"
    payload = {"chat_id": chat_id, "text": text}

    async with httpx.AsyncClient() as client:
        await client.post(url, json=payload)


# =========================
# AUTH DEPENDENCY
# =========================
async def get_current_user(
    token: str = Depends(oauth2_scheme),
    session: Session = Depends(get_session),
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str | None = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = session.exec(
        select(User).where(User.username == username)
    ).first()

    if user is None:
        raise credentials_exception

    return user


# =========================
# PUBLIC ROUTES
# =========================
@app.get("/health")
def health_check():
    return {"status": "active", "mode": "hybrid_brain (Groq + Ollama)"}


@app.post("/users/", response_model=User)
def create_user(
    user_input: UserCreate,
    session: Session = Depends(get_session),
):
    existing_user = session.exec(
        select(User).where(User.username == user_input.username)
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Username already taken",
        )

    user_db = User(
        username=user_input.username,
        email=user_input.email,
        hashed_password=get_password_hash(user_input.password),
        is_active=user_input.is_active,
    )

    session.add(user_db)
    session.commit()
    session.refresh(user_db)

    return user_db


@app.post("/token")
def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    session: Session = Depends(get_session),
):
    user = session.exec(
        select(User).where(User.username == form_data.username)
    ).first()

    if not user or not verify_password(
        form_data.password,
        user.hashed_password,
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(
        data={"sub": user.username}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
    }


# =========================
# CHAT ENDPOINT
# =========================
class ChatRequest(BaseModel):
    query: str
    model_type: str = "general"
    adapter_name: str | None = None


@app.post("/chat/")
def chat_with_ai(
    request: ChatRequest,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    user_id = current_user.username

    memory = MemoryManager(user_id=user_id, session=session)

    intent = intent_classifier.classify(request.query)
    print(f"🧠 Intent Detected: {intent}")

    if intent in ["factual", "coding", "casual"]:
        cached_result = response_cache.get_cached_response(
            user_id, request.query, intent
        )
        if cached_result:
            print("🚀 Cache Hit!")
            return {
                "response": cached_result["response"],
                "intent": intent,
                "used_model": "cache ⚡",
            }

    if intent in ["coding", "factual"]:
        selected_model = "general"
        adapter = None
    elif intent == "personal":
        selected_model = "local"
        adapter = "phi3"
    else:
        selected_model = "local"
        adapter = "phi3"

    if request.model_type != "general":
        selected_model = request.model_type
        adapter = request.adapter_name

    context_block = memory.build_context(request.query)

    response_text = generate_answer(
        query=request.query,
        context=[],
        history=[],
        model_type=selected_model,
        adapter_name=adapter,
        system_context=context_block,
    )

    if intent in ["factual", "coding", "casual"]:
        response_cache.save_response(
            user_id, request.query, intent, response_text
        )

    memory.add_message("user", request.query)
    memory.add_message("assistant", response_text)

    return {
        "response": response_text,
        "intent": intent,
        "used_model": selected_model,
    }


# =========================
# TELEGRAM WEBHOOK
# =========================
@app.post("/webhook/telegram")
async def telegram_webhook(
    request: Request,
    background_tasks: BackgroundTasks,
    session: Session = Depends(get_session),
):
    data = await request.json()

    if "message" not in data:
        return {"status": "ignored"}

    message = data["message"]

    if "text" not in message:
        return {"status": "no_text"}

    chat_id = message["chat"]["id"]
    sender_name = message["from"].get("first_name", "Friend")
    incoming_text = message["text"]

    print(f"📩 Telegram Message from {sender_name}: {incoming_text}")

    user_id = "yash"

    memory = MemoryManager(user_id=user_id, session=session)
    memory.add_message(f"friend_{sender_name}", incoming_text)

    context_block = memory.build_context(incoming_text)

    response_text = generate_answer(
        query=incoming_text,
        context=[],
        history=[],
        model_type="local",
        adapter_name="phi3",
        system_context=(
            f"You are the AI Twin of Yash. "
            f"A friend named {sender_name} just texted you. "
            f"Reply exactly how Yash would.\n"
            f"Context:\n{context_block}"
        ),
    )

    memory.add_message("assistant", response_text)

    await send_telegram_message(chat_id, response_text)

    return {"status": "ok"}


# =========================
# DOCUMENT UPLOAD
# =========================
@app.post("/upload-doc/")
async def upload_document(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    safe_name = Path(file.filename).name
    file_location = f"temp_uploads/{current_user.id}_{safe_name}"

    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    task = process_document_task.delay(
        file_path=file_location,
        filename=file.filename,
        user_id=current_user.id,
    )

    doc_db = DocumentLog(
        filename=file.filename,
        user_id=current_user.id,
    )
    session.add(doc_db)
    session.commit()
    session.refresh(doc_db)

    return {
        "status": "queued",
        "task_id": task.id,
        "filename": file.filename,
        "message": "File processing started in background.",
    }


# =========================
# ENTRY POINT
# =========================
if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

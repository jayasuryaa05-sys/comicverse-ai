from fastapi import FastAPI, HTTPException, Depends, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from users import users, hash_password, verify_password
from datetime import datetime, timedelta, timezone
from jose import jwt
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pathlib import Path
import shutil

SECRET_KEY = "comicverse-ai-secret-key-change-later"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60
security = HTTPBearer()

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    token = credentials.credentials

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        email = payload.get("sub")

        if email is None:
            raise HTTPException(
                status_code=401,
                detail="Invalid token"
            )

        if email not in users:
            raise HTTPException(
                status_code=401,
                detail="User not found"
            )

        return users[email]

    except Exception:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )

def create_access_token(email: str):
    expire = datetime.now(timezone.utc) + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    payload = {
        "sub": email,
        "exp": expire,
    }

    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class UserRegister(BaseModel):
    username: str
    email: str
    password: str


class UserLogin(BaseModel):
    email: str
    password: str


@app.get("/")
def home():
    return {
        "message": "Welcome to ComicVerse AI Backend"
    }


@app.get("/api/home")
def get_home():
    return {
        "title": "ComicVerse AI",
        "description": "AI Powered Comic Reading Platform",
        "status": "Backend connected successfully"
    }


@app.post("/api/register")
def register(user: UserRegister):

    if user.email in users:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    users[user.email] = {
        "username": user.username,
        "email": user.email,
        "password": hash_password(user.password)
    }

    return {
        "message": "Registration successful",
        "username": user.username
    }


@app.post("/api/login")
def login(user: UserLogin):

    if user.email not in users:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    stored_user = users[user.email]

    if not verify_password(
        user.password,
        stored_user["password"]
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    access_token = create_access_token(user.email)

    return {
        "message": "Login successful",
        "access_token": access_token,
        "token_type": "bearer",
        "username": stored_user["username"],
        "email": stored_user["email"]
}

@app.get("/api/me")
def get_me(current_user=Depends(get_current_user)):
    return {
        "username": current_user["username"],
        "email": current_user["email"]
    }

@app.post("/api/comics/upload")
def upload_comic(
    file: UploadFile = File(...),
    current_user=Depends(get_current_user)
):
    upload_folder = Path("uploads")
    upload_folder.mkdir(exist_ok=True)

    file_path = upload_folder / file.filename

    with file_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "message": "Comic uploaded successfully",
        "filename": file.filename,
        "uploaded_by": current_user["username"]
    }
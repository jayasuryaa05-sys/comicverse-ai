from fastapi import FastAPI, HTTPException, Depends, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime, timedelta, timezone
from jose import jwt
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pathlib import Path
import shutil

from passlib.context import CryptContext
from database import get_db_connection


# ===============================
# JWT CONFIGURATION
# ===============================

SECRET_KEY = "comicverse-ai-secret-key-change-later"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

security = HTTPBearer()

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


# ===============================
# PASSWORD FUNCTIONS
# ===============================

def hash_password(password: str):
    return pwd_context.hash(password)


def verify_password(password: str, hashed_password: str):
    return pwd_context.verify(password, hashed_password)


# ===============================
# JWT FUNCTIONS
# ===============================

def create_access_token(email: str):
    expire = datetime.now(timezone.utc) + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    payload = {
        "sub": email,
        "exp": expire,
    }

    return jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM
    )


# ===============================
# GET CURRENT USER
# ===============================

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

        connection = get_db_connection()
        cursor = connection.cursor()

        cursor.execute(
            """
            SELECT id, username, email, password
            FROM users
            WHERE email = %s
            """,
            (email,)
        )

        user = cursor.fetchone()

        cursor.close()
        connection.close()

        if user is None:
            raise HTTPException(
                status_code=401,
                detail="User not found"
            )

        return {
            "id": user[0],
            "username": user[1],
            "email": user[2],
            "password": user[3]
        }

    except HTTPException:
        raise

    except Exception:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )


# ===============================
# FASTAPI APP
# ===============================

app = FastAPI()


# ===============================
# CORS
# ===============================

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


# ===============================
# MODELS
# ===============================

class UserRegister(BaseModel):
    username: str
    email: str
    password: str


class UserLogin(BaseModel):
    email: str
    password: str


# ===============================
# HOME
# ===============================

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


# ===============================
# REGISTER
# ===============================

@app.post("/api/register")
def register(user: UserRegister):

    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute(
        "SELECT id FROM users WHERE email = %s",
        (user.email,)
    )

    existing_user = cursor.fetchone()

    if existing_user:
        cursor.close()
        connection.close()

        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    hashed_password = hash_password(user.password)

    cursor.execute(
        """
        INSERT INTO users
        (username, email, password)
        VALUES (%s, %s, %s)
        """,
        (
            user.username,
            user.email,
            hashed_password
        )
    )

    connection.commit()

    cursor.close()
    connection.close()

    return {
        "message": "Registration successful",
        "username": user.username
    }


# ===============================
# LOGIN
# ===============================

@app.post("/api/login")
def login(user: UserLogin):

    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute(
        """
        SELECT id, username, email, password
        FROM users
        WHERE email = %s
        """,
        (user.email,)
    )

    stored_user = cursor.fetchone()

    cursor.close()
    connection.close()

    if stored_user is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    if not verify_password(
        user.password,
        stored_user[3]
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    access_token = create_access_token(
        stored_user[2]
    )

    return {
        "message": "Login successful",
        "access_token": access_token,
        "token_type": "bearer",
        "username": stored_user[1],
        "email": stored_user[2]
    }


# ===============================
# CURRENT USER
# ===============================

@app.get("/api/me")
def get_me(
    current_user=Depends(get_current_user)
):
    return {
        "username": current_user["username"],
        "email": current_user["email"]
    }


# ===============================
# COMIC UPLOAD
# ===============================

@app.post("/api/comics/upload")
def upload_comic(
    title: str = Form(...),
    file: UploadFile = File(...),
    current_user=Depends(get_current_user)
):

    upload_folder = Path("uploads")
    upload_folder.mkdir(exist_ok=True)

    file_path = upload_folder / file.filename

    # Save comic file
    with file_path.open("wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )

    # Save comic information in PostgreSQL
    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute(
        """
        INSERT INTO comics
        (title, filename, uploaded_by)
        VALUES (%s, %s, %s)
        RETURNING id
        """,
        (
            title,
            file.filename,
            current_user["id"]
        )
    )

    comic_id = cursor.fetchone()[0]

    connection.commit()

    cursor.close()
    connection.close()

    return {
        "message": "Comic uploaded successfully",
        "comic_id": comic_id,
        "title": title,
        "filename": file.filename,
        "uploaded_by": current_user["username"]
    }

# ===============================
# GET ALL COMICS
# ===============================

@app.get("/api/comics")
def get_comics(
    current_user=Depends(get_current_user)
):
    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute(
        """
        SELECT
            comics.id,
            comics.title,
            comics.filename,
            comics.uploaded_by,
            comics.uploaded_at,
            users.username
        FROM comics
        JOIN users
            ON comics.uploaded_by = users.id
        ORDER BY comics.uploaded_at DESC
        """
    )

    comics = cursor.fetchall()

    cursor.close()
    connection.close()

    return [
        {
            "id": comic[0],
            "title": comic[1],
            "filename": comic[2],
            "uploaded_by": comic[3],
            "uploaded_at": comic[4],
            "username": comic[5]
        }
        for comic in comics
    ]

# ===============================
# GET SINGLE COMIC
# ===============================

@app.get("/api/comics/{comic_id}")
def get_comic(
    comic_id: int,
    current_user=Depends(get_current_user)
):
    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute(
        """
        SELECT
            comics.id,
            comics.title,
            comics.filename,
            comics.uploaded_by,
            comics.uploaded_at,
            users.username
        FROM comics
        JOIN users
            ON comics.uploaded_by = users.id
        WHERE comics.id = %s
        """,
        (comic_id,)
    )

    comic = cursor.fetchone()

    cursor.close()
    connection.close()

    if comic is None:
        raise HTTPException(
            status_code=404,
            detail="Comic not found"
        )

    return {
        "id": comic[0],
        "title": comic[1],
        "filename": comic[2],
        "uploaded_by": comic[3],
        "uploaded_at": comic[4],
        "username": comic[5]
    }
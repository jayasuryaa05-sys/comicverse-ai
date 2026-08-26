import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = (
    f"dbname={os.getenv('DB_NAME')} "
    f"user={os.getenv('DB_USER')} "
    f"password={os.getenv('DB_PASSWORD')} "
    f"host={os.getenv('DB_HOST')} "
    f"port={os.getenv('DB_PORT')}"
)


def get_db_connection():
    return psycopg2.connect(DATABASE_URL)
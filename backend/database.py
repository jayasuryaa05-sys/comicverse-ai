import psycopg2

DATABASE_URL = (
    "dbname=comicverse_db "
    "user=postgres "
    "password=suryaa527 "
    "host=localhost "
    "port=5432"
)


def get_db_connection():
    return psycopg2.connect(DATABASE_URL)

from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker

from app.core.config import settings


def create_database_engine():
    database_url = settings.database_url

    if not database_url:
        raise RuntimeError("DATABASE_URL is not configured")

    if database_url.startswith("postgresql://"):
        database_url = database_url.replace(
            "postgresql://", "postgresql+psycopg://", 1
        )
    elif database_url.startswith("postgres://"):
        database_url = database_url.replace(
            "postgres://", "postgresql+psycopg://", 1
        )

    if not settings.lakebase_access_token:
        raise RuntimeError("Lakebase credentials are not configured")

    return create_engine(
        database_url,
        pool_pre_ping=True,
        pool_size=5,
        max_overflow=5,
        connect_args={
            "sslmode": "require",
            "password": settings.lakebase_access_token,
        },
    )


engine = None
SessionLocal = None


def get_engine():
    global engine, SessionLocal

    if engine is None:
        engine = create_database_engine()
        SessionLocal = sessionmaker(
            bind=engine,
            autoflush=False,
            autocommit=False,
        )

    return engine


def check_database_connection() -> bool:
    with get_engine().connect() as connection:
        connection.execute(text("SELECT 1"))

    return True

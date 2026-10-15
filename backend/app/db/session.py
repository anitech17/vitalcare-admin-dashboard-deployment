
import psycopg
from databricks.sdk import WorkspaceClient
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker

from app.core.config import settings


# Databricks SDK client for generating fresh OAuth tokens
_w = WorkspaceClient()


def _create_dbapi_connection():
    """Create a psycopg connection with a fresh OAuth token.

    OAuth tokens expire after 1 hour. By generating a fresh token for every
    new physical connection, the pool always has valid credentials.
    pool_pre_ping ensures stale connections are recycled.
    """
    if not settings.endpoint_name:
        raise RuntimeError("ENDPOINT_NAME is not configured")
    if not settings.pg_host:
        raise RuntimeError("PGHOST is not configured")
    if not settings.pg_user:
        raise RuntimeError("PGUSER is not configured")

    credential = _w.postgres.generate_database_credential(
        endpoint=settings.endpoint_name
    )
    return psycopg.connect(
        host=settings.pg_host,
        port=settings.pg_port,
        dbname=settings.pg_database,
        user=settings.pg_user,
        password=credential.token,
        sslmode=settings.pg_sslmode,
    )


def create_database_engine():
    return create_engine(
        "postgresql+psycopg://",
        creator=_create_dbapi_connection,
        pool_pre_ping=True,
        pool_size=5,
        max_overflow=5,
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
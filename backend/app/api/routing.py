
from fastapi import APIRouter, HTTPException
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError

from app.db.session import get_engine

import logging

logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/api/dashboard",
    tags=["Dashboard Routing"],
)


@router.get("/routing")
def get_routing_performance():
    query = text("""
        SELECT *
        FROM vitalcare.v_routing_performance
        ORDER BY 1
    """)

    try:
        with get_engine().connect() as connection:
            result = connection.execute(query).mappings().all()
            return [dict(row) for row in result]

    except SQLAlchemyError:
        logger.exception("Failed to retrieve routing performance")
        raise HTTPException(
            status_code=500,
            detail="Unable to retrieve routing performance",
        )

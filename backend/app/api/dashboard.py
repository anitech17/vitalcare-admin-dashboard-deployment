
from fastapi import APIRouter, HTTPException
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError

from app.db.session import get_engine

router = APIRouter(
    prefix="/api/dashboard",
    tags=["Dashboard"],
)


@router.get("/overview")
def get_dashboard_overview():
    query = text(
        "SELECT * FROM vitalcare.v_dashboard_overview"
    )

    try:
        with get_engine().connect() as connection:
            result = connection.execute(query).mappings().first()

            if result is None:
                raise HTTPException(
                    status_code=404,
                    detail="Dashboard overview data not found",
                )

            return dict(result)

    except HTTPException:
        raise
    except SQLAlchemyError:
        raise HTTPException(
            status_code=500,
            detail="Unable to retrieve dashboard overview",
        )

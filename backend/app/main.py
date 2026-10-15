
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.api.dashboard import router as dashboard_router
from app.api.trends import router as trends_router
from app.api.facilities import router as facilities_router
from app.api.routing import router as routing_router
from app.api.alerts import router as alerts_router

app = FastAPI(
    title="VitalCare Admin API",
    description="Backend APIs for the VitalCare Admin Analytics Dashboard",
    version="1.0.0",
)

# Keep CORS for local development.
# Production frontend and API will share the same origin.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health_check():
    return {
        "status": "ok",
        "service": "vitalcare-admin-api",
        "message": "VitalCare Admin API is running",
    }


app.include_router(dashboard_router)
app.include_router(trends_router)
app.include_router(facilities_router)
app.include_router(routing_router)
app.include_router(alerts_router)

# The compiled React app will live at frontend/dist.
# Mount it after API routes so /api/... requests reach FastAPI.
deployment_root = Path(__file__).resolve().parents[2]
frontend_dist = deployment_root / "frontend" / "dist"

if frontend_dist.is_dir():
    app.mount(
        "/",
        StaticFiles(directory=str(frontend_dist), html=True),
        name="frontend",
    )
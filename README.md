# VitalCare Admin Dashboard — Deployment

Combined deployment repository for the VitalCare Admin Analytics Dashboard.

## Architecture

- Frontend: React, TypeScript, Vite
- Backend: Python, FastAPI, SQLAlchemy
- Database: Databricks Lakebase PostgreSQL

## Local startup

Create and activate a Python virtual environment, install the backend
requirements, and install Node.js dependencies in `frontend`.

Build the frontend:

    cd frontend
    npm ci
    npm run build
    cd ..

Start the backend from the backend directory:

    python -m uvicorn app.main:app --host 127.0.0.1 --port 8000

## Databricks deployment

The root `app.yaml` starts `start.sh`, which installs the dependencies,
builds the frontend, and starts FastAPI.

Configure database connection settings and Lakebase authentication through
the supported Databricks Apps runtime configuration. Never commit `.env`
files, OAuth tokens, passwords, or other credentials.

## API endpoints

- `/api/health`
- `/api/dashboard/overview`
- `/api/dashboard/trends`
- `/api/dashboard/facilities`
- `/api/dashboard/routing`
- `/api/dashboard/alerts`


#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "Installing backend dependencies..."
python -m pip install -r "$ROOT_DIR/backend/requirements.txt"

echo "Installing frontend dependencies..."
cd "$ROOT_DIR/frontend"
npm ci
npm run build

echo "Starting VitalCare Admin Dashboard..."
cd "$ROOT_DIR/backend"
exec python -m uvicorn app.main:app \
  --host 0.0.0.0 \
  --port "${PORT:-8000}"

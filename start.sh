
#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
PYTHON_BIN="/app/python/source_code/.venv/bin/python"

if [ ! -x "$PYTHON_BIN" ]; then
  echo "ERROR: Python executable not found: $PYTHON_BIN"
  echo "PATH=$PATH"
  exit 1
fi

echo "Using Python: $PYTHON_BIN"
"$PYTHON_BIN" --version

echo "Installing backend dependencies..."
"$PYTHON_BIN" -m pip install -r "$ROOT_DIR/backend/requirements.txt"

echo "Installing frontend dependencies..."
cd "$ROOT_DIR/frontend"
npm ci
npm run build

echo "Starting VitalCare Admin Dashboard..."
cd "$ROOT_DIR/backend"

exec "$PYTHON_BIN" -m uvicorn app.main:app \
  --host 0.0.0.0 \
  --port "${PORT:-8000}"
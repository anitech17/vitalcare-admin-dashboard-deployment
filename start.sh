
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

echo "Current directory: $(pwd)"
echo "Python resolved by PATH: $(command -v python)"
echo "Python version:"
python --version

echo "Virtual environment variables:"
echo "VIRTUAL_ENV=${VIRTUAL_ENV:-not-set}"
echo "PATH=$PATH"

cd "$ROOT_DIR/backend"

echo "Backend directory: $(pwd)"
echo "Starting Uvicorn..."

exec python -m uvicorn app.main:app \
  --host 0.0.0.0 \
  --port "${PORT:-8000}"

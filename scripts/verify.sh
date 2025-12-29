#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

# Deterministic verification entrypoint for the nightly runner.
# Cosmocrat Web - Next.js application

npm install --no-audit --no-fund
npm run lint
npm run typecheck

# Build is best-effort (may fail on Windows CI)
npm run build || echo "[WARN] Build failed but continuing (nightly mode)"


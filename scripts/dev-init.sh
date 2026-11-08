#!/usr/bin/env bash
# Quick verification script for developer environment
set -euo pipefail

echo "==> Verifying Node.js version..."
node -v

echo "==> Verifying pnpm version..."
pnpm -v

echo "==> Checking Docker availability..."
docker --version || echo "Warning: Docker is not installed or not in PATH"

echo "==> Verifying environment file..."
if [ ! -f .env ]; then
  echo "Copying .env.example to .env..."
  cp .env.example .env
fi

echo "Environment verification complete."


# See infrastructure/docker/production/Dockerfile.api for build context from monorepo root
# Syntax for building from repo root:
# docker build -f infrastructure/docker/production/Dockerfile.api .
FROM node:22-alpine
WORKDIR /app
COPY . .
RUN echo "Refer to infrastructure/docker/production/Dockerfile.api for monorepo multi-stage build"


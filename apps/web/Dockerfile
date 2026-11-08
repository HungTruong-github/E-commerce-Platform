# See infrastructure/docker/production/Dockerfile.web for build context from monorepo root
# Syntax for building from repo root:
# docker build -f infrastructure/docker/production/Dockerfile.web .
FROM nginxinc/nginx-unprivileged:alpine
COPY . /usr/share/nginx/html


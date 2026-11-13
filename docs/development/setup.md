# NovaStore Local Development Setup Guide

This guide describes how to configure, run, and verify the NovaStore full-stack development environment locally.

---

## 1. System Prerequisites

Before starting, ensure the following software is installed on your workstation (tested on Windows 10/11 and Ubuntu Server):

- **Node.js**: `>= 20.0.0` (Recommended: `22.20.0` LTS, pinned in `.nvmrc`).
- **pnpm**: `>= 9.0.0` (Install: `npm install -g pnpm@9.15.5`).
- **Docker**: Docker Engine `>= 24.0` with Docker Compose v2 (e.g. Docker Desktop on Windows).
- **Git**: `>= 2.40`.
- **Hardware**: 16 GB RAM recommended for running developer tooling and containers concurrently.

---

## 2. Initial Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/HungTruong-github/E-commerce-Platform.git
cd E-commerce-Platform
```

### Step 2: Configure Environment Variables

Copy the template configuration file:

```bash
cp .env.example .env
```

Default credentials in `.env.example` are pre-configured for local containerized development. Never use these development secrets in production.

### Step 3: Install Monorepo Dependencies

```bash
pnpm install
```

This installs dependencies across all workspaces, links local packages (`@ecommerce/types`, `@ecommerce/shared`, etc.), and initializes Husky Git hooks.

---

## 3. Starting Development Infrastructure (PostgreSQL 16 & Redis 7)

Start the local database and Redis services using Docker Compose:

```bash
make dev-deps
# Alternatively:
docker compose -f infrastructure/docker/development/docker-compose.yml up -d
```

Verify service health:

```bash
docker compose -f infrastructure/docker/development/docker-compose.yml ps
```

---

## 4. Prisma Validation & Generation

Ensure the database schema is valid and generate the Prisma Client:

```bash
# Validate schema
make db-validate
# Or: pnpm db:validate

# Generate Prisma Client
make db-generate
# Or: pnpm --filter @ecommerce/api db:generate
```

---

## 5. Starting Application Development Servers

Launch both the Web frontend and NestJS API in parallel with hot module reloading:

```bash
make dev
# Alternatively:
pnpm dev
```

Local access endpoints:

- **Frontend Web SPA**: `http://localhost:3000`
- **Backend REST API**: `http://localhost:4000/api/v1`
- **Interactive Swagger Docs**: `http://localhost:4000/api/docs`
- **Health Check (Aggregate)**: `http://localhost:4000/api/v1/health`
- **Liveness Probe**: `http://localhost:4000/api/v1/health/live`
- **Readiness Probe**: `http://localhost:4000/api/v1/health/ready`

---

## 6. Stopping Infrastructure

To stop background containers while preserving data volumes:

```bash
make dev-deps-down
# Alternatively:
docker compose -f infrastructure/docker/development/docker-compose.yml down
```

To completely reset the database and wipe local data volumes:

```bash
docker compose -f infrastructure/docker/development/docker-compose.yml down -v
```

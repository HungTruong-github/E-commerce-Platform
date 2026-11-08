# Local Development Setup Guide

Follow this guide to configure and run the full development environment locally.

---

## 1. Prerequisites

Before starting, ensure the following software is installed on your workstation:

- **Node.js**: `v22.x` (LTS recommended). Pin version via `.nvmrc`.
- **pnpm**: `v9.x` (`pnpm --version`).
- **Docker & Docker Compose**: Docker Engine `24.x+` or Docker Desktop.
- **Git**: `2.40+`

---

## 2. Initial Setup

### Step 1: Clone the Repository

```bash
git clone <repository-url> ecommerce-platform
cd ecommerce-platform
```

### Step 2: Configure Environment Variables

Copy the provided environment template to `.env`:

```bash
cp .env.example .env
```

Review the values in `.env`. Default credentials work out-of-the-box for local Docker containers.

### Step 3: Install Monorepo Dependencies

```bash
pnpm install
```

This installs dependencies across all packages and apps, automatically wires workspace symlinks, and registers Husky Git hooks.

---

## 3. Running Development Services

### Step 1: Start Infrastructure Containers (PostgreSQL & Redis)

Start the local database and Redis services using Docker Compose:

```bash
make dev-deps
# Alternatively:
docker compose -f infrastructure/docker/development/docker-compose.yml up -d
```

Verify the containers are healthy:

```bash
docker compose -f infrastructure/docker/development/docker-compose.yml ps
```

### Step 2: Generate Prisma Client

```bash
make db-generate
# Or:
pnpm --filter @ecommerce/api db:generate
```

### Step 3: Start Application Development Servers

To start both the Web frontend and the NestJS API simultaneously:

```bash
pnpm dev
# Or using make:
make dev
```

Services will be accessible at:

- **Frontend Web SPA**: `http://localhost:3000`
- **Backend REST API**: `http://localhost:4000/api/v1`
- **API Swagger / OpenAPI**: `http://localhost:4000/api/docs`
- **PostgreSQL**: `localhost:5432` (User: `ecommerce_user`, DB: `ecommerce_db`)
- **Redis**: `localhost:6379`

---

## 4. Common Developer Workflows

### Running Linter & Formatter

```bash
# Check lint errors
pnpm lint

# Automatically fix lint issues
pnpm lint:fix

# Check formatting
pnpm format:check

# Format files
pnpm format
```

### Running TypeScript Compiler Checks

```bash
pnpm typecheck
```

### Running Unit & Integration Tests

```bash
# Run all unit tests
pnpm test:unit

# Run frontend tests in watch mode
pnpm --filter @ecommerce/web test:watch

# Run backend tests in watch mode
pnpm --filter @ecommerce/api test:watch
```

### Stopping Development Infrastructure

```bash
make dev-deps-down
# Or:
docker compose -f infrastructure/docker/development/docker-compose.yml down
```

# NovaStore E-commerce Platform Monorepo

[![CI Quality Gate](https://github.com/organization/ecommerce-platform/actions/workflows/pr-check.yml/badge.svg)](https://github.com/organization/ecommerce-platform/actions/workflows/pr-check.yml)
[![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?logo=node.js)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-9.x-orange?logo=pnpm)](https://pnpm.io/)
[![NestJS](https://img.shields.io/badge/NestJS-10.x-E0234E?logo=nestjs)](https://nestjs.com/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)](https://react.dev/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)](https://www.docker.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

A production-oriented, scalable E-commerce Platform monorepo engineered with a **Modular Monolith** backend and a **Feature-Driven** frontend.

---

## 1. Project Introduction

NovaStore is an enterprise-grade e-commerce foundation built for high performance, maintainability, strict typing across full-stack boundaries, and cloud-native containerized deployment.

The platform avoids premature microservices complexity by utilizing a Modular Monolith backend with clear bounded contexts, allowing horizontal scaling and frictionless future service extraction.

### Current Implementation Status (Initialization Phase)

- **Monorepo Architecture & Package Management**: Fully configured with pnpm Workspaces, unified lockfile, strict TypeScript base configs, and shared domain packages.
- **Frontend Application (`apps/web`)**: Fully scaffolded React 18 + Vite SPA with TanStack Query v5, Zustand, React Router v6, Tailwind CSS, and Vitest testing suite.
- **Backend Application (`apps/api`)**: Fully scaffolded NestJS 10 Modular Monolith with Prisma ORM, PostgreSQL schema, Redis/BullMQ worker structure, global exception filtering, logging, response transformation, Zod environment validation, and live Swagger OpenAPI documentation.
- **Docker Infrastructure**: Multi-stage production Dockerfiles (non-root runtimes), local development Docker Compose (PostgreSQL 16 + Redis 7), and production reverse proxy with Nginx.
- **Quality Gates**: Commitlint conventional commits, Husky git hooks, ESLint 9 flat configuration, Prettier, and GitHub Actions CI pipelines.
- **Business Features**: Architectural boundaries established. Business domain logic (payment gateways, checkout flows, catalog manipulation) is scheduled for subsequent implementation phases.

---

## 2. Technology Stack

### Frontend (`apps/web`)

- **Core**: React 18, TypeScript, Vite
- **Routing**: React Router 6 (SPA client-side routing)
- **Server State**: TanStack Query v5 (caching, deduping, pagination)
- **Client State**: Zustand (lightweight UI stores)
- **Styling**: Tailwind CSS, Lucide React icons
- **Testing**: Vitest, React Testing Library, jsdom

### Backend (`apps/api`)

- **Core**: NestJS 10, TypeScript
- **Database ORM**: Prisma ORM, PostgreSQL 16
- **Cache & Queue**: Redis 7, BullMQ
- **Validation**: Zod (environment configs), class-validator & class-transformer (DTOs)
- **API Documentation**: Swagger / OpenAPI (`/api/docs`)
- **Security**: Helmet, rate-limiting, CORS, compression
- **Testing**: Jest, Supertest

### Shared Workspace Packages (`packages/`)

- `@ecommerce/types`: Shared domain entities, API contracts, response envelopes
- `@ecommerce/shared`: Cross-cutting constants, currency utilities, regex patterns
- `@ecommerce/tsconfig`: Shared base, React, and NestJS compiler configurations
- `@ecommerce/eslint-config`: Shared ESLint 9 flat configurations

### DevOps & Infrastructure

- **Package Manager**: pnpm 9 Workspaces
- **Containers**: Docker, Docker Compose (development & production)
- **Reverse Proxy**: Nginx (Alpine, rate limiting, gzip, security headers)
- **CI/CD**: GitHub Actions (PR quality gate and Main build pipeline)
- **Target OS**: Ubuntu Server 22.04 / 24.04 LTS compatibility

---

## 3. Architecture Overview

```
                                [ Web Browser / Client ]
                                           |
                                      (Port 80/443)
                                           v
                             +---------------------------+
                             |   Nginx Reverse Proxy     |
                             +-------------+-------------+
                                           |
                    +----------------------+----------------------+
                    |                                             |
          /api/v1/* v                                   /* (SPA)  v
+-------------------------------+             +-------------------------------+
|     apps/api (NestJS)         |             |      apps/web (Vite/React)    |
| - /health check endpoint      |             | - TanStack Query Provider     |
| - Swagger OpenAPI docs        |             | - React Router Layouts        |
| - Bounded Context Modules:    |             | - Feature-Based Modules:      |
|   auth, users, catalog,       |             |   auth, products, cart,       |
|   inventory, cart, checkout,  |             |   checkout, orders, payments  |
|   orders, payments, etc.      |             +-------------------------------+
+---------------+---------------+
                |
        +-------+-------+
        |               |
        v               v
+--------------+ +--------------+
|  PostgreSQL  | |   Redis 7    |
| 16 (Prisma)  | |  (BullMQ)    |
+--------------+ +--------------+
```

---

## 4. Prerequisites

Ensure your development environment meets these minimum requirements:

- **Node.js**: `>= 20.0.0` (Recommended: `22.20.0` or `.nvmrc`)
- **pnpm**: `>= 9.0.0` (`npm install -g pnpm@9.15.5`)
- **Docker**: Docker Engine `>= 24.0` with Docker Compose v2
- **Git**: `>= 2.40`

---

## 5. Installation Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/organization/ecommerce-platform.git
   cd ecommerce-platform
   ```

2. **Copy environment variables:**

   ```bash
   cp .env.example .env
   ```

3. **Install dependencies:**

   ```bash
   pnpm install
   ```

4. **Start local database and Redis services:**

   ```bash
   make dev-deps
   # Or: docker compose -f infrastructure/docker/development/docker-compose.yml up -d
   ```

5. **Generate Prisma Client:**
   ```bash
   make db-generate
   # Or: pnpm --filter @ecommerce/api db:generate
   ```

---

## 6. Development Commands

| Command                              | Description                                                      |
| ------------------------------------ | ---------------------------------------------------------------- |
| `pnpm dev` or `make dev`             | Start Web frontend and NestJS API in parallel with hot reloading |
| `pnpm dev:web`                       | Start only Web frontend development server (`localhost:3000`)    |
| `pnpm dev:api`                       | Start only NestJS API server (`localhost:4000`)                  |
| `pnpm build` or `make build`         | Build all shared packages and applications                       |
| `pnpm lint` or `make lint`           | Run ESLint across all workspace packages                         |
| `pnpm lint:fix`                      | Automatically fix ESLint violations                              |
| `pnpm typecheck` or `make typecheck` | Run TypeScript compiler type checking across all workspaces      |
| `pnpm format`                        | Format repository code with Prettier                             |
| `pnpm format:check`                  | Verify repository formatting compliance                          |
| `pnpm clean` or `make clean`         | Clean build artifacts and dist directories                       |

---

## 7. Environment Configuration

The application is configured using environment variables loaded from `.env`. A complete, documented template is provided in `.env.example`:

| Variable            | Description                        | Default Development Value                                                                      |
| ------------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------- |
| `NODE_ENV`          | Application environment mode       | `development`                                                                                  |
| `API_PORT`          | Port for the NestJS API            | `4000`                                                                                         |
| `API_PREFIX`        | Global API route prefix            | `/api/v1`                                                                                      |
| `CORS_ORIGIN`       | Allowed CORS origins               | `http://localhost:3000`                                                                        |
| `VITE_PORT`         | Port for Web frontend              | `3000`                                                                                         |
| `VITE_API_BASE_URL` | Base URL for API requests from Web | `http://localhost:4000/api/v1`                                                                 |
| `DATABASE_URL`      | PostgreSQL connection string       | `postgresql://ecommerce_user:ecommerce_dev_password@localhost:5432/ecommerce_db?schema=public` |
| `REDIS_HOST`        | Redis host                         | `localhost`                                                                                    |
| `REDIS_PORT`        | Redis port                         | `6379`                                                                                         |
| `JWT_SECRET`        | Secret key for JWT access tokens   | `development-only-insecure-jwt-secret-key-32-chars-minimum`                                    |
| `JWT_EXPIRES_IN`    | JWT access token expiration        | `7d`                                                                                           |

---

## 8. Testing Commands

| Command                                 | Scope                                 | Framework                      |
| --------------------------------------- | ------------------------------------- | ------------------------------ |
| `pnpm test:unit`                        | All unit & component tests            | Vitest & Jest                  |
| `pnpm --filter @ecommerce/web test`     | Frontend UI & component tests         | Vitest + React Testing Library |
| `pnpm --filter @ecommerce/api test`     | Backend service & controller tests    | Jest                           |
| `pnpm --filter @ecommerce/api test:e2e` | Backend API endpoint integration      | Jest + Supertest               |
| `pnpm test:e2e`                         | End-to-end user browser journey tests | Playwright                     |

---

## 9. Docker Commands

### Development Infrastructure (PostgreSQL & Redis)

```bash
# Start background services
make dev-deps

# Check status
docker compose -f infrastructure/docker/development/docker-compose.yml ps

# View container logs
docker compose -f infrastructure/docker/development/docker-compose.yml logs -f

# Stop background services
make dev-deps-down
```

### Production Stack Simulation

```bash
# Build production multi-stage images
make docker-build-prod

# Launch complete production stack (Gateway + Web + API + DB + Redis)
make docker-up-prod

# Stop production stack
make docker-down-prod
```

---

## 10. Repository Structure

```text
ecommerce-platform/
├── apps/
│   ├── web/                     # React 18 + Vite frontend application
│   └── api/                     # NestJS Modular Monolith backend application
├── packages/
│   ├── types/                   # Shared TypeScript domain contracts
│   ├── shared/                  # Shared utilities and constants
│   ├── tsconfig/                # Monorepo TypeScript configurations
│   └── eslint-config/           # Monorepo ESLint configurations
├── infrastructure/
│   ├── docker/
│   │   ├── development/         # Dev compose (PostgreSQL, Redis)
│   │   └── production/          # Prod Dockerfiles & compose
│   ├── nginx/                   # Nginx reverse proxy configuration
│   ├── monitoring/              # Prometheus configs
│   └── scripts/                 # Operational shell utilities
├── docs/                        # Architecture, deployment, development docs
├── scripts/                     # Local setup & verification scripts
├── tests/                       # E2E & integration suites
├── .github/workflows/           # GitHub Actions CI quality gates
├── .husky/                      # Git pre-commit & commit-msg hooks
├── pnpm-workspace.yaml          # Workspace topology definition
├── package.json                 # Monorepo root scripts & devDependencies
├── Makefile                     # Make CLI shortcuts
└── README.md                    # Project documentation
```

---

## 11. Security Guidelines

- **Zero Hardcoded Secrets**: Secrets are injected strictly via environment variables.
- **Non-Root Containers**: Production Docker containers execute under dedicated non-root users (`node`, `nginx`).
- **Internal Database Access**: In production Docker Compose, PostgreSQL and Redis are never exposed directly on host ports.
- Refer to [Security Baseline](./docs/security/security-baseline.md) for complete details.

---

## 12. License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

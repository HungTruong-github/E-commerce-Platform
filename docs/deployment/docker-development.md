# Docker Development Guide

This document describes how Docker is used in the local development environment for infrastructure services (PostgreSQL, Redis).

---

## 1. Local Development Topology

In local development, developers run Node.js applications directly on their host machine for instant Hot Module Replacement (HMR) and fast debugging, while backing infrastructure runs inside lightweight Docker containers.

```
+-----------------------------------------------------------+
| Host Workstation                                          |
|                                                           |
|  [pnpm dev]                                               |
|    - apps/web (Vite :3000)                                |
|    - apps/api (NestJS :4000)                              |
|         |                                                 |
|         v (localhost:5432)         v (localhost:6379)     |
+---------+--------------------------+----------------------+
          |                          |
          v                          v
+-----------------------------------------------------------+
| Docker Network: ecommerce_network                         |
|                                                           |
|  +---------------------------+  +----------------------+  |
|  | postgres:16-alpine        |  | redis:7-alpine       |  |
|  | - Volume: postgres_data   |  | - Volume: redis_data |  |
|  | - Port: 5432              |  | - Port: 6379         |  |
|  +---------------------------+  +----------------------+  |
+-----------------------------------------------------------+
```

---

## 2. Managing Development Containers

### Start Infrastructure

```bash
docker compose -f infrastructure/docker/development/docker-compose.yml up -d
```

### Stop Infrastructure

```bash
docker compose -f infrastructure/docker/development/docker-compose.yml down
```

### Reset Data Volumes (Clean Slate)

```bash
docker compose -f infrastructure/docker/development/docker-compose.yml down -v
```

---

## 3. Database Management with Prisma

Once the Postgres container is healthy:

- Apply migrations:
  ```bash
  pnpm --filter @ecommerce/api db:migrate
  ```
- Generate Prisma client:
  ```bash
  pnpm --filter @ecommerce/api db:generate
  ```
- Inspect database with Prisma Studio GUI:
  ```bash
  pnpm --filter @ecommerce/api exec prisma studio
  ```

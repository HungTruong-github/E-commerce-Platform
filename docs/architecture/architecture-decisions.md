# Architecture Decisions (ADR Summary)

This document provides a consolidated log of key architectural decisions made for the platform. Detailed records are maintained in `docs/adr/`.

---

## ADR-001: Monorepo with pnpm Workspaces

- **Status:** Accepted
- **Context:** An e-commerce platform requires synchronized coordination between the frontend application, the backend API, shared domain contracts, and tooling configs.
- **Decision:** Use a single Git monorepo managed with **pnpm Workspaces**.
- **Consequences:**
  - Fast, deduplicated dependency installation with hard link symlink architecture.
  - Zero divergence between frontend models and backend DTOs via `@ecommerce/types`.
  - Single PR atomic reviews across full stack features.

---

## ADR-002: Modular Monolith Backend with NestJS & Prisma

- **Status:** Accepted
- **Context:** E-commerce systems carry rich domain rules (orders, catalog, payment, inventory). Microservices introduce operational complexity (network partitioning, distributed transactions, orchestration overhead) that slows down iteration.
- **Decision:** Implement a **Modular Monolith** using NestJS, Prisma ORM, and PostgreSQL.
- **Consequences:**
  - Clean domain separation using NestJS bounded modules (`auth`, `catalog`, `cart`, `orders`, etc.).
  - Compile-time dependency injection and testing ergonomics.
  - Prisma provides type-safe query building and automated database migrations.
  - Preserves an easy pathway to extract modules into independent services later if warranted by load patterns.

---

## ADR-003: Feature-Based Architecture for React Frontend

- **Status:** Accepted
- **Context:** Large frontend codebases suffer from messy component sprawl when organized merely by technical layers (e.g., all components in one folder, all hooks in another).
- **Decision:** Adopt **Feature-Driven Architecture** in `apps/web/src/features/`.
- **Consequences:**
  - Feature logic (state, API hooks, components, routes) lives within bounded domain folders (`features/auth`, `features/products`, `features/checkout`).
  - Reusable presentation primitives live in `components/ui` with zero business logic.
  - Enhances code discoverability and enables team ownership per feature.

---

## ADR-004: Redis and BullMQ for Asynchronous Jobs

- **Status:** Accepted
- **Context:** Order processing, notifications, payment webhook handling, and inventory synchronization require reliable asynchronous task handling outside the HTTP request lifecycle.
- **Decision:** Use **Redis** as a caching and job queue broker with **BullMQ**.
- **Consequences:**
  - Ensures durable job persistence, automatic retries with exponential backoff, and concurrency control.
  - Low latency in-memory queueing.

---

## ADR-005: Multi-Stage Docker Builds with Non-Root Runtimes

- **Status:** Accepted
- **Context:** Container images must be small, fast to transfer, reproducible, and secure against container escape vulnerabilities.
- **Decision:** Standardize on multi-stage Docker builds with Alpine base images, using the unprivileged `node` user for the backend and `nginxinc/nginx-unprivileged` for the frontend.
- **Consequences:**
  - Minimal image attack surface.
  - Compliance with modern security baselines (CIS benchmarks, Kubernetes Pod Security Standards).

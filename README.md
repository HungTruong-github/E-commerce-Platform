# NovaStore – PC & Gaming Setup Customization Commerce Platform

[![CI Quality Gate](https://github.com/HungTruong-github/E-commerce-Platform/actions/workflows/pr-check.yml/badge.svg)](https://github.com/HungTruong-github/E-commerce-Platform/actions/workflows/pr-check.yml)
[![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?logo=node.js)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-9.x-orange?logo=pnpm)](https://pnpm.io/)
[![NestJS](https://img.shields.io/badge/NestJS-10.x-E0234E?logo=nestjs)](https://nestjs.com/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)](https://react.dev/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)](https://www.docker.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

---

## 1. Project Introduction

**NovaStore** is a full-featured custom commerce platform specializing in computer hardware, gaming peripherals, mechanical keyboard components, desk setups, networking equipment, storage devices, and related accessories.

This is **not** merely a PC Builder, a PC component shop, or a mechanical keyboard customization website. NovaStore is engineered to serve the complete spectrum of computing and gaming setup needs:

1. **Individual Products**: Purchasing standalone computer hardware, displays, peripherals, desk furniture, and networking gear.
2. **Prebuilt Computers**: Curated gaming PCs, creative workstations, AI/development workstations, and office desktops.
3. **Interactive PC Builder**: Configuring custom desktop PCs from individual components with real-time hardware compatibility validation (socket, form factor, clearance, wattage).
4. **Full Gaming & Workstation Setup Builder**: Configuring complete environments including desktop/laptop, displays, peripherals, desk, chair, monitor arms, acoustic/lighting accessories, and cable management.
5. **Product Customizer**: Designing modular products (starting with mechanical keyboards: layouts, cases, switches, keycaps, plates, stabilizers, PCBs).
6. **New and Used Product Inventory**: Transparently selling both brand-new items and professionally inspected, graded, and warrantied used goods.
7. **AI Shopping Assistant (Planned)**: Natural language product consultation, setup recommendations, compatibility validation, and user-confirmed shopping cart operations through backend-controlled tool calling.

> [!NOTE]
> **Implementation Status (Phase 0 Complete – Engineering Foundation)**  
> This repository currently provides the verified monorepo architecture, workspace boundaries, CI quality gates, Docker development infrastructure, strict TypeScript configuration, and architectural specifications. Business domain logic, complete database redesign, configurators, and AI agents are explicitly scheduled for subsequent implementation phases.

---

## 2. Business Model: Retailer-Owned Inventory (Model A)

NovaStore operates strictly as a **Store-Owned Retail Business / Retailer-Owned Inventory Model**:

- **Direct Inventory Ownership**: NovaStore purchases products from authorized manufacturers/distributors or acquires pre-owned goods directly. All stock is held and managed in NovaStore fulfillment facilities.
- **Unified Quality Control**: Every used item undergoes technical inspection, cosmetic grading (Like New, Good, Fair), defect disclosure, and store warranty provisioning.
- **Autonomous Pricing & Fulfillment**: NovaStore establishes prices (in integer VND), processes payments, packs, ships, and handles returns/after-sales support directly.

### Explicit Non-Goals (Out of Scope)

NovaStore is **not a multi-vendor marketplace**. The platform explicitly excludes:

- Third-party seller registration, seller portals, and vendor dashboards.
- Seller-owned product listings and multi-vendor order splitting.
- Marketplace commissions, vendor payout schedules, and third-party inventory reconciliation.

---

## 3. Product Catalog Scope

The NovaStore catalog is organized into 8 primary product domains:

| Category Domain               | Scope & Examples                                                                                                                                   |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **A. PC Components**          | CPUs, GPUs, Motherboards, RAM, NVMe SSDs, HDDs, Power Supplies (PSUs), PC Cases, CPU Coolers (AIO/Air), Case Fans, Thermal Paste, Expansion Cards. |
| **B. Prebuilt Computers**     | High-performance Gaming PCs, Content Creation & Engineering Workstations, AI/ML Development Rigs, Office Systems.                                  |
| **C. Monitors & Displays**    | High-refresh Gaming Displays (2K/4K/OLED), Color-accurate Creative Monitors, Productivity Displays, Secondary Monitors, Arms & Mounts.             |
| **D. Gaming Peripherals**     | Mechanical Keyboards, Gaming Mice, Audiophile/Gaming Headsets, Broadcast Microphones, Webcams, Mousepads, Gamepads.                                |
| **E. Keyboard Components**    | Custom Keyboard Kits, Cases (Aluminum/Polycarbonate), Mechanical Switches, Keycap Sets, Switch Plates, Stabilizers, Hot-swap PCBs, Lubing Tools.   |
| **F. Desk Setup**             | Ergonomic Standing Desks, Gaming Chairs, Ergonomic Office Chairs, Gas-spring Monitor Arms, Desk Mats, Lightbars, Cable Organizers.                 |
| **G. Networking**             | Wi-Fi 6/7 Routers, Managed/Unmanaged Switches, PCIe/USB Network Adapters, High-grade Ethernet Cabling, Patch Panels.                               |
| **H. Storage & Connectivity** | High-speed External SSDs/HDDs, Thunderbolt/USB4 Docks, Powered USB Hubs, Memory Cards & Readers, Display Cables.                                   |

---

## 4. Main Customer Experiences

```
                                +-----------------------------------+
                                |     NovaStore Shopping Flows      |
                                +-----------------+-----------------+
                                                  |
         +------------------------+---------------+------------------------+
         |                        |                                        |
         v                        v                                        v
+------------------+    +--------------------+                   +--------------------+
|    PC Builder    |    | Full Setup Builder |                   | Product Customizer |
+------------------+    +--------------------+                   +--------------------+
| - CPU Socket     |    | - Display Ports    |                   | - Layout & PCB     |
| - RAM Topology   |    | - Desk Dimensions  |                   | - Switch Profile   |
| - GPU Clearance  |    | - Refresh Rates    |                   | - Plate & Keycaps  |
| - PSU Wattage    |    | - Arm Weight Limit |                   | - Case Material    |
| - Cooler Height  |    | - Cable Routing    |                   | - Stabilizers      |
+------------------+    +--------------------+                   +--------------------+
```

1. **PC Builder**: A guided component selector enforcing physical and electrical rules (socket matching, cooler height vs case clearance, GPU length vs front radiator, PSU wattage overhead).
2. **Full Gaming Setup Builder**: A holistic workspace planner coordinating ergonomics, display resolutions, port bandwidth, desk dimensions, and monitor arm capacities.
3. **Product Customizer**: A specialized customizer starting with mechanical keyboards, validating compatibility between switch types, plate mountings, PCB form factors, and keycap profiles.

---

## 5. Technology Stack

### Frontend Application (`apps/web`)

- **Framework & Bundler**: React 18, TypeScript, Vite
- **Routing**: React Router 6 (SPA with nested layouts)
- **State Management**: Zustand (client UI state), TanStack Query v5 (server cache & query deduplication)
- **Styling**: Tailwind CSS, Lucide React icons
- **Testing**: Vitest, React Testing Library, jsdom

### Backend API (`apps/api`)

- **Framework**: NestJS 10 (Modular Monolith)
- **Persistence**: Prisma ORM, PostgreSQL 16
- **Cache & Message Broker**: Redis 7, BullMQ
- **Validation & Serialization**: Zod (environment configuration), class-validator & class-transformer (DTOs)
- **Documentation**: Swagger / OpenAPI 3.0 (`/api/docs`)
- **Security**: Helmet, CORS origin restriction, rate-limiting, gzip compression
- **Testing**: Jest, Supertest

### Shared Workspace Packages (`packages/`)

- `@ecommerce/types`: Shared domain contracts, API envelopes, VND currency representations
- `@ecommerce/shared`: Currency formatting, cross-cutting constants, validation regexes
- `@ecommerce/tsconfig`: Strict TypeScript configurations (Base, React, NestJS)
- `@ecommerce/eslint-config`: Monorepo ESLint 9 Flat Config presets

### DevOps & Infrastructure

- **Package Management**: pnpm 9 Workspaces with unified lockfile
- **Containerization**: Docker, Docker Compose (isolated dev and production stacks)
- **Edge Routing**: Nginx (reverse proxy, rate-limiting zones, security headers)
- **CI Pipelines**: GitHub Actions (pull request quality gates and main verification)
- **Host Target**: Ubuntu Server 22.04 / 24.04 LTS and Windows 10/11 development workstations

---

## 6. Architecture Overview

NovaStore adopts a **Modular Monolith** architecture for the backend and a **Feature-Driven** layout for the frontend, preserving domain boundaries while avoiding premature microservices overhead:

```
                            [ Web Browser / Mobile Client ]
                                           |
                                       HTTP/HTTPS
                                           v
                             +---------------------------+
                             |    Nginx Reverse Proxy    |
                             +-------------+-------------+
                                           |
                    +----------------------+----------------------+
                    |                                             |
         /api/v1/*  v                                   /* (SPA)  v
+-------------------------------+             +-------------------------------+
|       NestJS Backend API      |             |     React 18 + Vite SPA       |
|  - /health (Live & Ready)     |             |  - TanStack Query Client      |
|  - Swagger Documentation      |             |  - Feature Bounded Modules:   |
|  - Bounded Context Modules:   |             |    pc-builder, setup-builder, |
|    auth, users, catalog,      |             |    keyboard-customizer, cart, |
|    inventory, pc-build, cart, |             |    catalog, orders, ai-chat   |
|    orders, payments, etc.     |             +-------------------------------+
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

## 7. Prerequisites

Ensure your development workstation meets these minimum requirements:

- **Node.js**: `>= 20.0.0` (Recommended: `22.20.0` LTS pinned in `.nvmrc`)
- **pnpm**: `>= 9.0.0` (`npm install -g pnpm@9.15.5`)
- **Docker**: Docker Engine `>= 24.0` with Docker Compose v2 (e.g., Docker Desktop)
- **Git**: `>= 2.40`
- **Memory**: 16 GB RAM recommended for running dev containers and applications simultaneously.

---

## 8. Installation & Local Development

### 1. Clone Repository & Setup Environment

```bash
git clone https://github.com/HungTruong-github/E-commerce-Platform.git
cd E-commerce-Platform

# Copy local development configuration template
cp .env.example .env
```

### 2. Install Monorepo Dependencies

```bash
pnpm install
```

### 3. Start Development Backing Services (PostgreSQL 16 & Redis 7)

```bash
make dev-deps
# Alternatively:
docker compose -f infrastructure/docker/development/docker-compose.yml up -d
```

### 4. Validate & Generate Prisma Client

```bash
make db-validate
make db-generate
```

### 5. Start Full-Stack Applications in Development Mode

```bash
make dev
# Alternatively:
pnpm dev
```

Local service URLs:

- **Web Frontend**: `http://localhost:3000`
- **Backend REST API**: `http://localhost:4000/api/v1`
- **Swagger Documentation**: `http://localhost:4000/api/docs`
- **Aggregate Health Check**: `http://localhost:4000/api/v1/health`
- **Liveness Probe**: `http://localhost:4000/api/v1/health/live`
- **Readiness Probe**: `http://localhost:4000/api/v1/health/ready`

---

## 9. Development Commands

| Command                                  | Description                                                    |
| ---------------------------------------- | -------------------------------------------------------------- |
| `pnpm dev` or `make dev`                 | Run Web frontend and NestJS API in parallel with hot reloading |
| `pnpm dev:web`                           | Run only React Web frontend (`localhost:3000`)                 |
| `pnpm dev:api`                           | Run only NestJS API server (`localhost:4000`)                  |
| `pnpm build` or `make build`             | Build all shared packages and applications                     |
| `pnpm lint` or `make lint`               | Run ESLint 9 Flat Config across all workspaces                 |
| `pnpm lint:fix`                          | Automatically resolve autofixable ESLint violations            |
| `pnpm typecheck` or `make typecheck`     | Run strict TypeScript compiler verification                    |
| `pnpm format`                            | Reformat codebase with Prettier                                |
| `pnpm format:check`                      | Verify codebase formatting compliance                          |
| `pnpm db:validate` or `make db-validate` | Validate Prisma schema syntax and data source config           |
| `pnpm clean` or `make clean`             | Clean all build artifacts and node_modules dist caches         |

---

## 10. Testing Commands

| Command                                 | Scope                                     | Engine                         |
| --------------------------------------- | ----------------------------------------- | ------------------------------ |
| `pnpm test:unit`                        | All unit & component test suites          | Vitest & Jest                  |
| `pnpm --filter @ecommerce/web test`     | Frontend component and hook tests         | Vitest + React Testing Library |
| `pnpm --filter @ecommerce/api test`     | Backend service and controller unit tests | Jest                           |
| `pnpm --filter @ecommerce/api test:e2e` | Backend HTTP route integration tests      | Jest + Supertest               |
| `pnpm test:e2e`                         | End-to-end browser journey verification   | Playwright                     |

---

## 11. Docker Commands

### Development Infrastructure (PostgreSQL 16 & Redis 7)

```bash
# Start background database and cache containers
make dev-deps

# Inspect container health
docker compose -f infrastructure/docker/development/docker-compose.yml ps

# Follow container logs
docker compose -f infrastructure/docker/development/docker-compose.yml logs -f

# Stop development infrastructure (data preserved in named volumes)
make dev-deps-down

# Reset development databases completely (destroys data volumes)
docker compose -f infrastructure/docker/development/docker-compose.yml down -v
```

### Production Stack Simulation

```bash
# Build multi-stage production images (non-root runtimes)
make docker-build-prod

# Launch production composition (Nginx gateway + Web + API + DB + Redis)
make docker-up-prod

# Stop production stack
make docker-down-prod
```

---

## 12. Future AI Shopping Assistant Architecture (Planned)

The planned AI Shopping Assistant utilizes a **backend-controlled Tool Calling architecture**. The AI model never connects directly to database infrastructure or client state:

```
[ Customer via React Chat UI ]
               |
               v
  [ NestJS AI Orchestrator ]
               |
               v
  [ LLM Provider Adapter ]
               |
               v
  [ Allowlisted Tool Registry ]
  ├── search_products
  ├── get_product_details
  ├── check_inventory
  ├── validate_pc_build
  ├── validate_setup
  ├── calculate_build_price
  ├── create_build_draft
  └── add_build_to_cart (Requires explicit user confirmation)
               |
               v
  [ Backend Business Services ]  <--- Enforces business rules, pricing, inventory
               |
               v
    [ Prisma ORM & Database ]
```

### Key Security Safeguards

1. **Zero Database Credentials for LLM**: The model never receives connection strings, credentials, or raw query privileges.
2. **Server-Side Price & Stock Verification**: Every price calculation and stock reservation is executed server-side.
3. **Explicit User Confirmation**: State-changing actions (such as adding a custom build to cart) strictly require explicit customer confirmation before dispatch.

---

## 13. Repository Structure

```text
ecommerce-platform/
├── apps/
│   ├── web/                     # React 18 + Vite frontend SPA
│   └── api/                     # NestJS Modular Monolith backend REST API
├── packages/
│   ├── types/                   # Shared TypeScript domain contracts & VND types
│   ├── shared/                  # Shared utilities, currency formatters, constants
│   ├── tsconfig/                # Strict base, React, and NestJS compiler configs
│   └── eslint-config/           # Monorepo ESLint 9 Flat Config presets
├── infrastructure/
│   ├── docker/
│   │   ├── development/         # Local dev compose (PostgreSQL 16, Redis 7)
│   │   └── production/          # Production multi-stage Dockerfiles & compose
│   ├── nginx/                   # Reverse proxy, rate limiting, and SPA static configs
│   ├── monitoring/              # Prometheus scrapers and metrics configs
│   └── scripts/                 # Operational maintenance scripts (backups, wait-for-it)
├── docs/
│   ├── architecture/            # System overview, Modular Monolith, AI architecture
│   ├── business/                # Retail business model, catalog, condition & warranty
│   ├── database/                # Database design principles and considerations
│   ├── development/             # Local setup, coding standards, Git workflow
│   ├── security/                # Threat mitigation and security baseline
│   └── adr/                     # Architecture Decision Records (ADRs)
├── scripts/                     # Local developer onboarding scripts
├── tests/                       # Cross-cutting integration and Playwright E2E tests
├── .github/workflows/           # GitHub Actions CI quality gates
├── .husky/                      # Git hooks (pre-commit lint-staged, commit-msg commitlint)
├── pnpm-workspace.yaml          # Monorepo workspace boundaries
├── package.json                 # Monorepo scripts and shared devDependencies
├── Makefile                     # Developer CLI workflow shortcuts
└── README.md                    # Project documentation
```

---

## 14. License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

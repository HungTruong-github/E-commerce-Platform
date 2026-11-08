# System Architecture Overview

## 1. Executive Summary

This repository contains the enterprise monorepo for the **NovaStore E-commerce Platform**. It is engineered following the **Modular Monolith** architectural paradigm for the backend and a **Feature-Driven Architecture** for the frontend, optimized for developer ergonomics, strong typing across boundaries, predictable releases, and high horizontal scalability.

```
                           +------------------------+
                           |  Client Applications   |
                           | (Web SPA, Mobile, etc) |
                           +-----------+------------+
                                       |
                                       | HTTPS / WSS
                                       v
                           +------------------------+
                           | Nginx Reverse Proxy /  |
                           |      API Gateway       |
                           +-----------+------------+
                                       |
                     +-----------------+-----------------+
                     |                                   |
         /api/v1/*   v                       /* (Assets) v
+-----------------------------+           +-----------------------------+
|        NestJS Backend       |           |     React 18 + Vite SPA     |
|      (Modular Monolith)     |           |     (Nginx Static Server)   |
|                             |           +-----------------------------+
| - Health & System           |
| - Authentication & Identity |
| - Product Catalog           |
| - Cart & Checkout Engine    |
| - Orders & Fulfillment      |
| - Payment Gateway Adapter   |
| - Promotions & Coupons      |
| - Reviews & Ratings         |
| - Notifications Worker      |
+--------------+--------------+
               |
      +--------+--------+
      |                 |
      v                 v
+------------+   +------------+
| PostgreSQL |   | Redis 7    |
| 16 (OLTP)  |   | (Queue &   |
| via Prisma |   | Cache)     |
+------------+   +------------+
```

## 2. Core Architectural Principles

1. **Modular Monolith over Premature Microservices:**
   - Single deployable backend artifact (`@ecommerce/api`) with strictly decoupled domain boundaries.
   - Modules communicate across clear internal interfaces or domain events, preventing spaghetti dependencies.
   - Direct database joins across bounded contexts are strictly avoided.
   - Future extraction into standalone microservices requires minimal friction if scaling bottlenecks arise.

2. **Single Source of Truth Contracts (`@ecommerce/types`):**
   - Shared domain entities, API request/response envelopes, enums, and pagination contracts are maintained in a standalone workspace package.
   - Frontend and backend share exact contract types, eliminating runtime schema drift.

3. **Strict Boundaries & Encapsulation:**
   - Frontend UI components are separated from API communication layers and state machines.
   - Backend controllers only validate and route requests, delegating domain logic to injectable services and data access to repository/Prisma layers.

4. **Security by Default:**
   - Zero hardcoded credentials or fallback secrets in production.
   - Non-root container execution across all Docker environments.
   - Default denial of cross-origin requests, strict CORS validation, HTTP security headers via Helmet, and rate limiting.

5. **Operational Parity:**
   - Development and production Docker compose specifications share container health check protocols, networking topologies, and environment validation rules.

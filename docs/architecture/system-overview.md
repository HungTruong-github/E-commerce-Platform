# NovaStore – System Architecture Overview

## 1. Executive Summary

**NovaStore** is a specialized custom commerce platform for computer hardware, prebuilt PCs, custom PC builds, mechanical keyboard customization, gaming and office desk setups, networking devices, and storage accessories.

The system is architected as a **Modular Monolith** for the backend (`apps/api`) and a **Feature-Driven Single Page Application (SPA)** for the frontend (`apps/web`), governed by a unified pnpm monorepo.

```
                           +------------------------+
                           |  Client Applications   |
                           | (Web SPA, Mobile Web)  |
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
|    NestJS Backend API       |           |     React 18 + Vite SPA     |
|   (Modular Monolith)        |           |  (Nginx Static File Server) |
|                             |           +-----------------------------+
| - Health (Liveness/Ready)   |
| - Identity & Access (Auth)  |
| - Product Catalog           |
| - PC Configurator Engine    |
| - Setup Configurator Engine |
| - Keyboard Customizer       |
| - Retail Inventory (New/Used|
| - Shopping Cart & Checkout  |
| - Orders & Fulfillment      |
| - Payments Gateway Adapter  |
| - AI Assistant Orchestrator |
+--------------+--------------+
               |
      +--------+--------+
      |                 |
      v                 v
+------------+   +------------+
| PostgreSQL |   |  Redis 7   |
| 16 (Prisma)|   |  (BullMQ)  |
+------------+   +------------+
```

## 2. Core Architectural Principles

1. **Modular Monolith over Premature Microservices:**
   - Single deployable backend artifact (`@ecommerce/api`) with bounded contexts.
   - Modules communicate through explicit TypeScript interfaces and events, not cross-module database foreign key mutations.
   - Extensibility to extract standalone microservices later if load characteristics diverge.

2. **Retailer-Owned Inventory (Model A):**
   - Direct store inventory management. The platform manages its own stock, physical condition grading (New, Like New, Good, Fair), and warranties.
   - Marketplace abstractions (multi-vendor splitting, vendor registration, vendor payouts) are excluded.

3. **Single Source of Truth Contracts (`@ecommerce/types`):**
   - Shared domain contracts, response envelopes (`ApiResponse<T>`, `PaginatedResponse<T>`, `ApiErrorResponse`), and integer VND monetary representations.

4. **Guided Customization Engines:**
   - Decoupled configuration validation engines: PC Builder (hardware rules), Full Setup Builder (ergonomic & port constraints), and Mechanical Keyboard Customizer (component compatibility).

5. **Backend-Controlled AI Orchestration:**
   - Future AI Shopping Assistant operates strictly via server-side allowlisted Tool Calling, enforcing business validation, pricing integrity, and explicit customer confirmation.

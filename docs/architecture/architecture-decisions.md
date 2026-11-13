# Architecture Decisions (ADR Summary)

This document provides a consolidated log of key architectural decisions made for NovaStore. Detailed individual records are maintained in `docs/adr/`.

---

## ADR-001: Monorepo with pnpm Workspaces

- **Status:** Accepted ([docs/adr/0001-monorepo-pnpm.md](../adr/0001-monorepo-pnpm.md))
- **Decision:** Use a single Git monorepo governed by pnpm Workspaces with shared packages (`@ecommerce/types`, `@ecommerce/shared`, `@ecommerce/tsconfig`, `@ecommerce/eslint-config`).

---

## ADR-002: Modular Monolith Architecture over Microservices

- **Status:** Accepted ([docs/adr/0002-modular-monolith.md](../adr/0002-modular-monolith.md))
- **Decision:** Implement a Modular Monolith backend using NestJS and Prisma ORM, avoiding premature microservices and orchestration complexity while enforcing strict domain module boundaries.

---

## ADR-003: Retailer-Owned Inventory Business Model (Model A)

- **Status:** Accepted ([docs/adr/0003-retailer-owned-inventory-business-model.md](../adr/0003-retailer-owned-inventory-business-model.md))
- **Decision:** Operate as a direct store-owned inventory business with unified quality inspection and warranties. Third-party marketplace functionality (vendor portals, seller commissions, order splitting) is explicitly excluded.

---

## ADR-004: Catalog Product vs Physical Inventory Stock Unit Distinction

- **Status:** Accepted ([docs/adr/0004-catalog-product-vs-physical-inventory-distinction.md](../adr/0004-catalog-product-vs-physical-inventory-distinction.md))
- **Decision:** Separate universal catalog products from condition tiers (New vs Used) and individual physical stock units to support serialized used hardware with individual inspection grades and warranties.

---

## ADR-005: Separation of Three Distinct Configuration Experiences

- **Status:** Accepted ([docs/adr/0005-three-distinct-configuration-experiences.md](../adr/0005-three-distinct-configuration-experiences.md))
- **Decision:** Separate PC Builder (hardware rules), Full Gaming Setup Builder (ergonomic & port constraints), and Modular Product Customizer (mechanical keyboard component rules) into dedicated workflows.

---

## ADR-006: Backend-Controlled AI Tool Calling Architecture

- **Status:** Accepted ([docs/adr/0006-backend-controlled-ai-tool-calling-architecture.md](../adr/0006-backend-controlled-ai-tool-calling-architecture.md))
- **Decision:** Orchestrate the AI Shopping Assistant via backend allowlisted tool calling without direct database access, enforcing server-side price verification and explicit customer confirmation.

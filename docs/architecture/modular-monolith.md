# Modular Monolith Architecture & Boundary Rules

## 1. Principles of the Modular Monolith

NovaStore uses a **Modular Monolith** architecture for its backend (`apps/api`). A Modular Monolith provides the operational simplicity of a single deployment pipeline while maintaining strict architectural boundaries similar to microservices:

1. **High Cohesion, Low Coupling**: Each business domain (such as `catalog`, `pc-builder`, `inventory`, `cart`) encapsulates its own business rules, data transformations, and state persistence.
2. **Explicit Public Interfaces**: Modules expose functionality only through explicit service interfaces and DTOs. Direct internal access to other modules' private helpers, raw Prisma entities, or internal repositories is strictly disallowed.
3. **Database Ownership**: Although entities share a single PostgreSQL database instance in Phase 0, tables logically belong to specific bounded contexts. Cross-module joins or direct SQL modifications are prohibited across domain boundaries.
4. **Independent Testability**: Each module must be testable in isolation using unit tests with mocked collaborators.
5. **Clear Extraction Path**: If a high-throughput domain (e.g., the PC Compatibility Engine or AI Orchestrator) requires horizontal scaling or independent deployment in the future, it can be extracted into an independent microservice with minimal architectural friction.

---

## 2. Module Directory Structure Convention

Each business domain module in `apps/api/src/modules/` adheres to a standard internal structure:

```text
module-name/
├── controllers/          # HTTP request routing, input validation, Swagger docs
├── services/             # Core business logic, transaction boundaries
├── repositories/         # Prisma data access abstraction
├── dto/                  # Request / Response Data Transfer Objects (class-validator)
├── entities/             # Domain models and business state
├── interfaces/           # Exported contracts for other modules
├── tests/                # Unit and integration test specs
└── module-name.module.ts # NestJS module wiring, providers, and exports
```

---

## 3. Boundary & Dependency Rules

To prevent spaghetti dependencies:

| Rule                             | Description                                                                                                                                                                                                           |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **No Controller Business Logic** | Controllers are strictly limited to HTTP parsing, calling services, and returning responses.                                                                                                                          |
| **Encapsulated Persistence**     | All Prisma database calls must be encapsulated within domain services or repositories. Controllers never inject `PrismaService` directly.                                                                             |
| **One-Way Dependency Flow**      | Lower-level packages (`packages/types`, `packages/shared`) must never import from application layers (`apps/api`, `apps/web`).                                                                                        |
| **No Circular Module Imports**   | Module dependencies must form a Directed Acyclic Graph (DAG). If Module A depends on Module B, Module B must never depend on Module A. Cross-boundary events (via EventEmitter or BullMQ) resolve circular coupling.  |
| **Domain Event Communication**   | Cross-domain side effects (such as notifying customer on order confirmation or updating inventory after checkout) must use event emitters or asynchronous queues (`BullMQ`) rather than synchronous deep call chains. |

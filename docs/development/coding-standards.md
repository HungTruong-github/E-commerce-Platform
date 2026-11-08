# Coding Standards and Conventions

All code contributed to this repository must adhere to the conventions detailed below.

---

## 1. General Principles

- **Single Responsibility (SRP):** Each class, module, and React component should have one clear purpose.
- **Fail Fast & Explicit Errors:** Validate inputs at boundaries (HTTP requests, environment variables, message queues) and throw typed exceptions.
- **No Premature Optimization:** Strive for readability, testability, and clarity first.
- **Type Safety First:** Avoid `any` at all costs. Use `unknown` with type guards or schemas when the type is not initially known.

---

## 2. TypeScript Guidelines

- **Strict Mode:** TypeScript `strict: true` is enabled across all workspaces.
- **Explicit Return Types:** Public methods, exported API functions, and services must declare explicit return types.
- **Consistent Type Imports:** Use `import type { ... }` when importing TypeScript types and interfaces to optimize bundle size and prevent circular module side effects.
- **Path Aliases:**
  - In `apps/web`: Use `@/*` pointing to `src/*`.
  - In `apps/api`: Use `@/*` pointing to `src/*`.
  - Shared code must be imported from `@ecommerce/types` or `@ecommerce/shared`.

---

## 3. Frontend Architecture Standards (`apps/web`)

- **Feature-Based Placement:**
  - All domain-specific screens, components, hooks, and types belong in `src/features/<feature-name>/`.
  - Place only generic, non-domain primitives (buttons, dialogs, dropdowns) into `src/components/ui/`.
- **Decoupled API Communications:**
  - Components must never call `fetch()` or `axios` directly.
  - All network calls must pass through `src/services/` or custom TanStack Query hooks using `apiClient`.
- **State Management Separation:**
  - **Server State**: Managed exclusively by **TanStack Query** (cache invalidation, refetching, pagination).
  - **Client UI State**: Managed via **Zustand** (e.g. sidebar open, active modal).
  - **Local Component State**: Managed via standard `useState` or `useReducer`.

---

## 4. Backend Architecture Standards (`apps/api`)

- **Controller Responsibilities:**
  - Controllers only handle HTTP concerns: route parameters, body parsing, status codes, and Swagger annotations.
  - Business logic must never reside in controllers.
- **Service Responsibilities:**
  - Injectable NestJS services implement core domain operations, orchestrate transactional flows, and dispatch events.
- **Data Persistence:**
  - Access the database exclusively through `PrismaService`.
  - Every DTO must use `class-validator` decorators for payload validation.
- **Exception Handling:**
  - Throw built-in NestJS `HttpException` subclasses (`NotFoundException`, `BadRequestException`, `ConflictException`, `ForbiddenException`).
  - All exceptions are automatically caught and standardized by `HttpExceptionFilter`.

---

## 5. Formatting & Linting

- Code is formatted automatically by **Prettier** with 2-space indentation, single quotes, and trailing commas.
- Linting is validated via **ESLint 9 Flat Config**.
- Pre-commit Git hooks run `lint-staged` on staged files. Do not bypass hooks (`--no-verify`) unless resolving an exceptional blocker.

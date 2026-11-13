# NovaStore Coding Conventions & Architectural Standards

All contributions to the NovaStore codebase must strictly follow these engineering conventions.

---

## 1. General Principles

- **Single Responsibility Principle (SRP)**: Each class, service, hook, and component must serve one cohesive concern.
- **Fail Fast & Explicit Boundary Validation**: Validate all untrusted inputs at the perimeter (HTTP requests via `class-validator`, environment configs via `zod`, tool inputs via JSON Schema).
- **Type Safety Without Compromise**: Strict mode is enabled (`strict: true`). The use of `any` is prohibited. Use `unknown` with schemas or type guards when type information is not yet validated.
- **Encapsulation of State**: Never directly mutate persistent state across domain boundaries.

---

## 2. Monorepo Dependency Direction

- **`packages/types`**: Declares shared domain types, DTO contracts, and API envelopes. Must remain pure and have zero dependencies on applications or framework runtimes.
- **`packages/shared`**: Houses universal utility functions (currency formatting in integer VND, validation regexes). May depend only on `@ecommerce/types`.
- **`apps/api`**: Modular Monolith backend. Depends on `@ecommerce/types`, `@ecommerce/shared`, `@ecommerce/tsconfig`, and `@ecommerce/eslint-config`.
- **`apps/web`**: Feature-driven React frontend. Depends on `@ecommerce/types`, `@ecommerce/shared`, and UI libraries. Communicates with `apps/api` strictly via REST contracts.

---

## 3. Backend Conventions (`apps/api`)

1. **Controllers**:
   - Sole responsibility: route mapping, status code definition, and Swagger annotations.
   - Business logic, raw SQL, or Prisma direct mutations are forbidden in controllers.
2. **Services**:
   - Implement business rules, state machines, and transactional flows.
   - Encapsulate data persistence via repositories or Prisma service methods.
3. **Database & Money**:
   - Monetary values in the target Vietnamese market must be stored as **whole integer VND amounts** (`priceInVnd Int` / `BigInt`), avoiding cents or float types.
4. **Error Handling**:
   - Throw standard NestJS `HttpException` subclasses (`NotFoundException`, `BadRequestException`, `ConflictException`, `ServiceUnavailableException`).
   - Global `HttpExceptionFilter` intercepts all thrown exceptions and standardizes them into the `@ecommerce/types` `ApiErrorResponse` envelope.

---

## 4. Frontend Conventions (`apps/web`)

1. **Feature-Driven Structure**:
   - Domain-specific screens, hooks, and sub-components live inside `src/features/<feature-name>/`.
   - Generic UI primitives (Buttons, Inputs, Dialogs) live in `src/components/ui/` with zero business logic.
2. **Decoupled API Client**:
   - Components never call `fetch` or `axios` directly.
   - All network calls pass through `src/services/` or TanStack Query hooks using `apiClient`.
3. **Separation of State**:
   - **Server State**: Managed exclusively by **TanStack Query** (cache invalidation, refetching, pagination).
   - **Client UI State**: Managed via **Zustand** stores (e.g. sidebar open, active modal).
   - **Local Component State**: Managed via `useState` or `useReducer`.

---

## 5. Code Quality & Formatting

- **ESLint 9 Flat Config**: Run `pnpm lint` before committing.
- **Prettier**: Consistent formatting (2 spaces, single quotes, trailing commas). Run `pnpm format` to auto-format.
- **Git Hooks**: Pre-commit hooks automatically run `lint-staged` on staged files. Commit messages are verified with `commitlint`.

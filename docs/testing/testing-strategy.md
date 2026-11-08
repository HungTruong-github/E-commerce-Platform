# Testing Strategy & Quality Gates

The platform adheres to a pragmatic testing pyramid:

```
            / \
           /   \        E2E Tests (Playwright)
          / E2E \       - Critical checkout & auth user journeys
         /-------\
        /  Integ  \     Integration Tests (Supertest, Prisma Test Env)
       /-----------\    - API endpoint routes, DB constraints, HTTP envelopes
      /    Unit     \   Unit Tests (Vitest, Jest)
     /---------------\  - Services, business calculations, UI components
```

## 1. Test Frameworks

- **Frontend Unit & Component Testing:** **Vitest** + **React Testing Library** + `jsdom`.
  - Fast ESM execution.
  - Component rendering, user events, accessibility attributes.
- **Backend Unit & Integration Testing:** **Jest** + **Supertest** + `@nestjs/testing`.
  - Dependency-injected service mocking, controller unit testing, e2e endpoint status tests.
- **End-to-End Testing:** **Playwright**.
  - Headless browser validation of critical user journeys in Chromium/Firefox/WebKit.

## 2. Test Execution Commands

```bash
# Run unit & component tests across monorepo:
pnpm test:unit

# Run frontend tests:
pnpm --filter @ecommerce/web test

# Run backend unit tests:
pnpm --filter @ecommerce/api test

# Run backend e2e tests:
pnpm --filter @ecommerce/api test:e2e

# Run Playwright E2E browser tests:
pnpm test:e2e
```

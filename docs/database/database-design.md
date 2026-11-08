# Database Architecture & Design

## 1. Storage Engine

- **RDBMS:** PostgreSQL 16
- **ORM & Migrations:** Prisma ORM (`apps/api/prisma/schema.prisma`)

## 2. Modeling Conventions

1. **Primary Keys:** Standard UUIDs (`String @id @default(uuid())`) to prevent sequential ID enumeration attacks.
2. **Monetary Precision:** Stored as integer amounts in cents (`priceInCents Int`) accompanied by an explicit currency code (`currency String @default("USD")`) to avoid floating-point rounding inaccuracies.
3. **Auditing Fields:** Tables include `createdAt DateTime @default(now())` and `updatedAt DateTime @updatedAt`.
4. **Soft Deletes vs Status States:** Entities use explicit lifecycle status enums (`ACTIVE`, `INACTIVE`, `DRAFT`, `PUBLISHED`, `ARCHIVED`).
5. **Indexes:** B-tree indices on unique slugs, natural lookup keys (`email`, `sku`, `orderNumber`), and foreign keys.

## 3. Migration Workflow

- Development: `pnpm --filter @ecommerce/api db:migrate` (creates and applies SQL migration files in `prisma/migrations`).
- Production: `pnpm --filter @ecommerce/api db:migrate:deploy` (applies existing migrations strictly without drift).

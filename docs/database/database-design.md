# Database Architecture & Design Considerations

## 1. Storage Engine

- **RDBMS:** PostgreSQL 16
- **ORM & Migrations:** Prisma ORM (`apps/api/prisma/schema.prisma`)

---

## 2. Modeling Conventions & Baseline Principles

1. **Primary Keys:** Standard UUIDs (`String @id @default(uuid())`) to prevent sequential ID enumeration attacks.
2. **Monetary Precision (Vietnam Market Target):**
   - In future database redesign (Phase 2), all prices must be represented as **whole integer Vietnamese Dong amounts** (`priceInVnd BigInt` / `Int`) with an explicit currency code (`currency String @default("VND")`).
   - The system must avoid assumptions that all currencies utilize cents or fractional subunits.
3. **Auditing Fields:** All domain entities record `createdAt DateTime @default(now())` and `updatedAt DateTime @updatedAt`.
4. **Lifecycle Enums:** Clear state machines using explicit enums (`ACTIVE`, `INACTIVE`, `DRAFT`, `PUBLISHED`, `ARCHIVED`).
5. **Indexes:** Strategic B-tree indices on unique slugs, natural lookup keys (`email`, `sku`, `orderNumber`), and foreign keys.

---

## 3. Current Phase 0 Schema Limitations

The current initial schema in `apps/api/prisma/schema.prisma` is a basic baseline intended solely to verify Prisma compilation and health check integration:

- **Currency Assumption**: Currently defines `priceInCents Int` with default `"USD"`, which does not reflect the target Vietnamese market (VND).
- **Single Inventory Counter**: Represents inventory as a simple numeric quantity per product (`Inventory.quantity`), which cannot track serialized pre-owned (used) units, individual condition grades, or inspection reports.
- **Missing Specification Schema**: Does not yet model PC hardware specifications (CPU sockets, GPU length, RAM type, cooler height, PSU wattage) required for compatibility calculations.
- **Missing Customization Entities**: Lacks models for PC build assemblies, full setup configurations, or mechanical keyboard layer options.

> [!IMPORTANT]
> In accordance with Phase 0 rules, speculative database schema expansions and migrations are deliberately postponed to the dedicated **Phase 2 (Database Design & Modeling)** phase.

---

## 4. Future Database Design Considerations (Phase 2 Scope)

The comprehensive database redesign in Phase 2 will introduce:

1. **Configurable Product Taxonomy**:
   - Universal `Product` model storing core identity, brand, media, and categorization.
   - Dynamic technical specification attributes for all 8 categories (A-H) via structured JSONB or EAV schemas.
2. **Three-Tier Catalog vs Physical Inventory**:
   - `Product` -> `ProductVariant` (New vs Used condition tiers) -> `StockUnit` (physical serialized units).
   - Serialized units tracking: condition grade (`LIKE_NEW`, `GOOD`, `FAIR`), inspection log, defect descriptions, and store warranty duration.
3. **Hardware Compatibility Rules & Constraints**:
   - Component socket matrices, dimension limits, TDP/wattage tables, and interface slots.
4. **Configuration State & Assemblies**:
   - `PcConfiguration` & `PcConfigurationItem` models tracking selected components, computed wattage, and compatibility validation status.
   - `SetupConfiguration` modeling multi-monitor, desk, and peripheral combinations.
   - `KeyboardConfiguration` tracking modular switch, plate, case, and keycap choices.
5. **Cart & Order Snapshots**:
   - Shopping cart supporting both individual products and configured build assemblies.
   - Immutable order snapshots preserving exact specifications, unit serials, condition grades, and integer VND prices at the time of purchase.

---

## 5. Migration Workflow

- Development: `pnpm --filter @ecommerce/api db:migrate` (creates and applies SQL migration files in `prisma/migrations`).
- Validation: `pnpm db:validate` or `make db-validate` (validates schema syntax).
- Production: `pnpm --filter @ecommerce/api db:migrate:deploy` (applies existing migrations strictly without drift).

# Repository Directory Structure

The repository is structured as a pnpm monorepo separating consumer applications, reusable shared packages, operational infrastructure, and system documentation.

```text
ecommerce-platform/
│
├── apps/
│   ├── web/                              # React 18 + Vite frontend SPA
│   │   ├── src/
│   │   │   ├── app/                      # Application entry, router, and provider compositions
│   │   │   │   ├── layouts/              # Top-level shell layouts (RootLayout, AuthLayout)
│   │   │   │   ├── providers/            # React Query, Router, Theme providers
│   │   │   │   └── router/               # Route definitions and navigation guards
│   │   │   ├── assets/                   # Static images, SVGs, and brand assets
│   │   │   ├── components/               # UI components
│   │   │   │   ├── ui/                   # Dumb design system primitives (Button, Input, Modal)
│   │   │   │   └── common/               # Shared composite components (Header, Footer)
│   │   │   ├── features/                 # Bounded feature contexts
│   │   │   │   ├── pc-builder/           # Interactive desktop PC configurator
│   │   │   │   ├── setup-builder/        # Full gaming & workspace setup builder
│   │   │   │   ├── keyboard-customizer/  # Modular mechanical keyboard customizer
│   │   │   │   ├── catalog/              # Product browsing across 8 categories
│   │   │   │   ├── ai-assistant/         # AI conversational shopping assistant UI
│   │   │   │   ├── auth/                 # Authentication, login, register views
│   │   │   │   ├── products/             # Product grid, filters, detail views
│   │   │   │   ├── cart/                 # Cart sidebar, items summary
│   │   │   │   ├── checkout/             # Multi-step checkout pipeline
│   │   │   │   ├── orders/               # Order history and tracking views
│   │   │   │   └── payments/             # Payment method selection and receipts
│   │   │   ├── hooks/                    # Reusable custom React hooks
│   │   │   ├── lib/                      # Client utilities (api-client, tailwind merge)
│   │   │   ├── services/                 # API service layer functions
│   │   │   ├── stores/                   # Global Zustand client state stores
│   │   │   ├── styles/                   # Tailwind CSS global styles
│   │   │   └── types/                    # Frontend view models and UI types
│   │   ├── index.html                    # HTML document entry
│   │   ├── tailwind.config.js            # Tailwind theme tokens
│   │   ├── vite.config.ts                # Vite bundler and Vitest configuration
│   │   └── tsconfig.json                 # Web TypeScript configuration
│   │
│   └── api/                              # NestJS Modular Monolith API
│       ├── prisma/                       # Database schema and migration management
│       │   ├── schema.prisma             # Prisma data models and relations
│       │   ├── migrations/               # Versioned SQL migration files
│       │   └── seed/                     # Development seed scripts
│       ├── src/
│       │   ├── main.ts                   # Application bootstrap, Swagger, security middlewares
│       │   ├── app.module.ts             # Root application module wiring
│       │   ├── config/                   # Configuration loader and Zod env validator
│       │   ├── common/                   # Cross-cutting NestJS primitives
│       │   │   ├── decorators/           # Custom decorators (@Public, @CurrentUser)
│       │   │   ├── filters/              # Global HttpExceptionFilter
│       │   │   ├── guards/               # Auth and RBAC guards
│       │   │   ├── interceptors/         # Response wrapper and logging interceptors
│       │   │   ├── middleware/           # HTTP middlewares
│       │   │   ├── pipes/                # Global validation pipe
│       │   │   └── utils/                # Pagination and formatting helpers
│       │   ├── database/                 # PrismaService and database lifecycle module
│       │   ├── modules/                  # Domain-driven bounded business modules
│       │   │   ├── health/               # Operational health check controller
│       │   │   ├── auth/                 # Authentication, JWT tokens, password hashing
│       │   │   ├── users/                # User accounts and roles
│       │   │   ├── catalog/              # Products, categories, attributes
│       │   │   ├── inventory/            # Stock tracking and reservations
│       │   │   ├── cart/                 # Shopping carts and persistent line items
│       │   │   ├── checkout/             # Checkout orchestrator
│       │   │   ├── orders/               # Order lifecycle and state machine
│       │   │   ├── payments/             # Payment provider integrations
│       │   │   ├── promotions/           # Discounts, promo codes, and rules
│       │   │   ├── shipping/             # Carriers and shipping cost calculation
│       │   │   ├── reviews/              # Product reviews and customer feedback
│       │   │   ├── notifications/        # Email, SMS, push notifications
│       │   │   └── admin/                # Back-office administration endpoints
│       │   └── workers/                  # BullMQ asynchronous queue processors
│       ├── nest-cli.json                 # NestJS CLI configuration
│       └── tsconfig.json                 # Backend TypeScript configuration
│
├── packages/
│   ├── types/                            # Shared domain models and API response types
│   ├── shared/                           # Shared utility functions, regexes, and constants
│   ├── tsconfig/                         # Shared base TypeScript configurations
│   └── eslint-config/                    # Shared ESLint 9 flat configurations
│
├── infrastructure/
│   ├── docker/
│   │   ├── development/                  # Local PostgreSQL and Redis compose manifests
│   │   └── production/                   # Production multi-stage Dockerfiles and compose
│   ├── nginx/                            # Nginx reverse proxy and SPA static serving configs
│   ├── monitoring/                       # Prometheus and metrics configurations
│   └── scripts/                          # Operational shell helpers (wait-for-it, backups)
│
├── docs/                                 # Architectural and operational documentation
│   ├── architecture/                     # System design, Modular Monolith, AI architecture, ADR index
│   ├── business/                         # Retail business model, catalog, condition & warranty, experiences
│   ├── database/                         # Database design considerations and limitations
│   ├── development/                      # Setup guide, coding conventions, Git workflow
│   ├── deployment/                       # Docker guide and production deployment strategy
│   ├── security/                         # Threat model, baseline practices, AI tool safeguards
│   ├── api/                              # REST API design conventions
│   ├── testing/                          # Testing pyramid and practices
│   └── adr/                              # Architecture Decision Records (ADR-0001 through ADR-0006)
│
├── scripts/                              # Root maintenance and setup scripts
├── tests/
│   ├── integration/                      # Cross-boundary integration tests
│   └── e2e/                              # Playwright end-to-end browser tests
│
├── .github/
│   └── workflows/
│       ├── pr-check.yml                  # PR quality gate: lint, typecheck, build, test
│       └── main-ci.yml                   # Main CI pipeline with Docker build verification
│
├── .husky/                               # Git pre-commit and commit-msg hooks
├── .editorconfig                         # Universal editor formatting standards
├── .gitignore                            # Git file ignores
├── .dockerignore                         # Docker context build ignores
├── .env.example                          # Environment variable template
├── .nvmrc                                # Node.js version pin (v22.20.0)
├── .npmrc                                # pnpm engine and workspace settings
├── pnpm-workspace.yaml                   # pnpm workspace definition
├── package.json                          # Monorepo root scripts and devDependencies
├── tsconfig.base.json                    # Monorepo root TypeScript base options
├── eslint.config.js                      # Monorepo root ESLint flat config
├── prettier.config.js                    # Monorepo root Prettier config
├── commitlint.config.js                  # Conventional commit validation config
├── Makefile                              # Quick CLI shortcuts
└── README.md                             # Monorepo documentation entry point
```

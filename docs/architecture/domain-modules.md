# Domain Modules & Bounded Contexts

NovaStore's business architecture is partitioned into 10 bounded contexts. Each context owns a specific business capability:

```
+---------------------------------------------------------------------------------+
|                               NovaStore Domains                                 |
+---------------------------------------------------------------------------------+
  |
  +---> [ Identity & Access ]      : Authentication, JWT tokens, RBAC roles
  |
  +---> [ Product Catalog ]        : Categories (A-H), product models, specifications
  |
  +---> [ Product Configuration ]  : PC Builder, Setup Builder, Keyboard Customizer
  |
  +---> [ Compatibility Engine ]   : Hardware constraints, sockets, clearances, wattage
  |
  +---> [ Retail Inventory ]       : Stock on hand, condition grades (New/Used), serials
  |
  +---> [ Shopping Cart ]          : Guest/User carts, custom build assemblies
  |
  +---> [ Checkout & Orders ]      : Pricing verification, orders state machine
  |
  +---> [ Payments Gateway ]       : Payment providers, webhooks, transaction ledger
  |
  +---> [ AI Shopping Assistant ]  : Natural language consultation, Tool Calling
  |
  +---> [ Administration ]         : Inventory management, RMA inspection, analytics
```

---

## 1. Domain Responsibilities

### 1.1 Identity and Access (`modules/auth`, `modules/users`)

- Manages customer and staff credentials, password hashing (Argon2), and session lifecycles.
- Issues short-lived access JWTs and secure HttpOnly refresh token rotation.
- Enforces Role-Based Access Control (`CUSTOMER`, `STAFF`, `ADMIN`).

### 1.2 Product Catalog (`modules/catalog`)

- Maintains the master catalog of all 8 product domains: PC Components, Prebuilts, Displays, Peripherals, Keyboard Parts, Desk Setup, Networking, Storage.
- Defines technical specifications (CPU socket, RAM DDR generation, TDP, dimensions).
- Governs product visibility (`DRAFT`, `PUBLISHED`, `ARCHIVED`).

### 1.3 Product Configuration (`modules/configuration`)

- Manages customer configurations:
  - Custom PC Builds (CPU, GPU, Motherboard, RAM, Storage, PSU, Case, Cooler, Fans).
  - Full Gaming & Office Setups (PC/Laptop, Monitor, Peripherals, Furniture, Lighting).
  - Configurable Modular Products (e.g. Mechanical Keyboards: layout, case, switch, keycap).
- Computes aggregated build specifications and draft configurations.

### 1.4 Compatibility Engine (`modules/compatibility`)

- Enforces strict hardware rules:
  - CPU socket matching motherboard socket (e.g. AM5 vs LGA1700).
  - RAM generation compatibility (DDR4 vs DDR5).
  - Motherboard form factor vs Case support (ATX, Micro-ATX, Mini-ITX).
  - GPU physical dimensions vs Case maximum clearance and radiator placement.
  - PSU wattage overhead (CPU TDP + GPU TGP + system margin).
  - Cooler height vs Case CPU cooler clearance.
- Evaluates setup-level compatibility (monitor mounting VESA standards, desk weight limits, display output bandwidth).

### 1.5 Retail Inventory (`modules/inventory`)

- Manages store-owned physical stock units across both **New** and **Used** inventory.
- Records technical inspection reports, cosmetic condition grades (`LIKE_NEW`, `GOOD`, `FAIR`), defect disclosures, and serial numbers.
- Handles stock reservations during checkout and atomic inventory decrements.

### 1.6 Shopping Cart (`modules/cart`)

- Manages customer shopping baskets for both individual products and configured bundles (PC builds, full setups).
- Validates active stock availability and updates live prices.

### 1.7 Checkout and Orders (`modules/orders`)

- Orchestrates order placement, server-side price recalculation in integer VND, and order state transitions:
  `PENDING` -> `CONFIRMED` -> `PROCESSING` -> `SHIPPED` -> `DELIVERED` -> `CANCELLED` / `REFUNDED`.
- Creates immutable order snapshots preserving exact product specs, condition, and prices at time of purchase.

### 1.8 Payments (`modules/payments`)

- Integrates with local and international payment gateways (e.g. VNPay, MoMo, ZaloPay, Credit Card, Bank Transfer).
- Handles asynchronous webhook verification with idempotent processing.

### 1.9 AI Shopping Assistant (`modules/ai-assistant`)

- Orchestrates conversational AI consultation via backend-controlled Tool Calling.
- Translates natural language requirements into allowlisted tool executions against Catalog, Compatibility, and Inventory services.
- Never directly mutates orders or executes cart changes without explicit customer confirmation.

### 1.10 Administration (`modules/admin`)

- Back-office management for store operators: inventory receiving, used goods inspection grading, order fulfillment tracking, and catalog maintenance.

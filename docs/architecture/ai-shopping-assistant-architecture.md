# AI Shopping Assistant Architecture (Planned Design)

## 1. System Vision & Purpose

NovaStore will feature an **AI Shopping Assistant** designed to help customers explore products, select hardware, configure custom desktop PCs, validate gaming setups, and balance budget constraints (including recommending warrantied used parts to optimize cost).

### Example Scenario

A customer inputs:

> _"I have a budget of 30 million VND. I want a white gaming setup for AAA games, a 2K 165Hz monitor, and a mechanical keyboard. I am willing to buy some used components to reduce the cost."_

The system will:

1. Parse the budget (30,000,000 VND), color theme (White), target use case (AAA gaming), and product scope (PC + 2K 165Hz display + mechanical keyboard).
2. Query the Product Catalog for compatible white-themed components and displays.
3. Check Retail Inventory for both new and inspected used stock units.
4. Execute the PC Compatibility Engine to verify socket, clearance, and PSU capacity.
5. Compute the total configuration price in integer VND.
6. Present the recommended configuration with transparent trade-offs (e.g. used GPU with 6-month store warranty to keep within 30m VND).
7. Solicit explicit customer confirmation before adding the configured build to the customer's cart.

---

## 2. Architectural Blueprint

The AI Shopping Assistant uses a **backend-controlled Tool Calling architecture**. The LLM operates purely as an intent-parsing and language-reasoning agent; all state verification, pricing calculations, hardware validation, and database operations are executed strictly by validated backend business services:

```text
+-------------------------------------------------------------+
|                      Customer Browser                       |
|           (React Chatbox Interface - apps/web)              |
+------------------------------+------------------------------+
                               |
                               | HTTPS / WSS (User Prompt)
                               v
+-------------------------------------------------------------+
|                   NestJS AI Orchestrator                    |
|             (modules/ai-assistant in apps/api)              |
+------------------------------+------------------------------+
                               |
                               | Clean Prompt + Tool Schemas
                               v
+-------------------------------------------------------------+
|                    LLM Provider Adapter                     |
|           (Abstract Provider: OpenAI, Gemini, etc.)         |
+------------------------------+------------------------------+
                               |
                               | Structured Tool Call Intent
                               v
+-------------------------------------------------------------+
|                Allowlisted Tool Registry                    |
|           (Input Validation via Zod / DTOs)                 |
+------------------------------+------------------------------+
                               |
                               | Strongly Typed Method Call
                               v
+-------------------------------------------------------------+
|                  Backend Business Services                  |
|    - CatalogService                                         |
|    - InventoryService (New vs Used)                         |
|    - PcCompatibilityService                                 |
|    - SetupCompatibilityService                              |
|    - PricingEngine (Integer VND)                            |
|    - CartService                                            |
+------------------------------+------------------------------+
                               |
                               | Type-Safe ORM
                               v
+-------------------------------------------------------------+
|                         Prisma ORM                          |
+------------------------------+------------------------------+
                               |
                               | SQL
                               v
+-------------------------------------------------------------+
|                     PostgreSQL Database                     |
+-------------------------------------------------------------+
```

---

## 3. Allowlisted Tool Categories

The Tool Registry exposes strictly defined, allowlisted tool contracts with JSON Schema / Zod parameter validation:

| Tool Name               | Scope & Parameters                                                                                                   | Return Payload                                                   |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `search_products`       | Searches catalog by category, keywords, price range, color, condition (New/Used).                                    | List of product summaries, specs, and base prices.               |
| `get_product_details`   | Retrieves full technical specifications, socket, dimensions, and TDP by product ID/slug.                             | Detailed product specification entity.                           |
| `check_inventory`       | Queries store stock availability for a product or variant, distinguishing New and Used units.                        | Stock status, condition grades, warranty months, serial count.   |
| `validate_pc_build`     | Takes a list of component product IDs (CPU, MB, RAM, GPU, Cooler, PSU, Case, Storage) and runs compatibility checks. | `{ compatible: boolean, issues: string[], warnings: string[] }`. |
| `validate_setup`        | Validates peripheral, display bandwidth, monitor mounting, and desk dimensions.                                      | `{ compatible: boolean, issues: string[] }`.                     |
| `calculate_build_price` | Recalculates total configuration price using live server prices in integer VND.                                      | Itemized price breakdown, total VND amount.                      |
| `create_build_draft`    | Saves a validated configuration draft associated with customer session.                                              | Draft configuration ID and shareable URL.                        |
| `add_build_to_cart`     | Adds confirmed configuration to shopping cart. **Requires explicit customer confirmation flag.**                     | Updated cart summary entity.                                     |

---

## 4. Ten Mandatory Security & Architectural Principles

1. **Zero Direct Database Access**: The LLM provider never receives database connection strings, credentials, or raw query privileges.
2. **No Arbitrary SQL Generation**: The LLM is strictly prohibited from generating or executing raw SQL strings. All queries are pre-compiled in backend business services.
3. **No Direct Prisma Invocation**: Tools do not call Prisma directly; they invoke domain services that enforce business rules.
4. **Explicit Allowlist with Validated Schemas**: Only registered tools with rigid JSON Schema input definitions can be invoked. Any unlisted tool call is rejected by the executor.
5. **Enforced Server-Side Business Rules**: Hardware compatibility and pricing rules are determined exclusively by backend deterministic algorithms, not LLM hallucinations.
6. **Live Server-Side Price & Stock Verification**: The LLM's price suggestions are never trusted. All totals are recalculated from current database records before presentation.
7. **Customer Authorization on State Changes**: Every state-changing tool call (e.g., modifying cart, saving configuration draft) requires active session authorization.
8. **Explicit Confirmation for Cart Operations**: Adding products or customized setups to a customer's shopping cart requires prior explicit user confirmation in the conversation flow.
9. **Idempotency & Duplicate Protection**: Cart and draft operations use idempotency keys to protect against duplicate executions.
10. **Database Transaction Safeguards**: Sensitive multi-entity state updates (such as stock reservations during checkout) execute within atomic Prisma transactions (`$transaction`).

---

## 5. Scope Boundary for Phase 0

In Phase 0, this architecture serves as a blueprint:

- **No LLM SDKs installed** (e.g. OpenAI SDK, LangChain, or LangGraph are excluded in Phase 0).
- **No AI endpoints or agents implemented**.
- **No speculative tool execution code created**.
- Full implementation of the AI Shopping Assistant will take place in the dedicated AI Integration Phase.

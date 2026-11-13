# 6. Backend-Controlled AI Tool Calling Architecture

Date: 2026-11-13

## Status

Accepted

## Context

Future product phases require an AI Shopping Assistant that can converse with customers in natural language, recommend hardware configurations, query live stock, and help add configurations to their shopping cart. Enabling direct database connections from an LLM, generating arbitrary SQL, or allowing unconstrained state changes creates severe security risks (SQL injection, unauthorized data access, pricing hallucinations, accidental cart mutations).

## Decision

Adopt a **Backend-Controlled Tool Calling Architecture**:

1. The LLM connects strictly via an abstract provider adapter in NestJS (`modules/ai-assistant`).
2. The LLM interacts with the platform solely by selecting from an allowlist of structured tools with rigid JSON schemas (`search_products`, `get_product_details`, `check_inventory`, `validate_pc_build`, `validate_setup`, `calculate_build_price`, `create_build_draft`, `add_build_to_cart`).
3. Tool execution is handled by a backend Tool Executor calling domain services.
4. The LLM never receives database credentials, never executes SQL, and never bypasses authorization.
5. All price calculations and stock availability checks are recomputed server-side.
6. Adding a configuration to the customer's shopping cart requires prior explicit customer confirmation.

## Alternatives Considered

1. **Direct SQL / Text-to-SQL Agent**: Rejected due to high risk of data corruption, lack of business rule enforcement, and severe security vulnerabilities.
2. **Client-Side LLM SDK in React Browser**: Rejected because it exposes API keys to the browser and allows client-side tampering of prices and cart states.

## Consequences

- Guaranteed pricing integrity, database isolation, and security compliance.
- Abstract provider interface permits switching between LLM providers (e.g. Gemini, OpenAI, Anthropic, or local open-weights models) without changing business logic.

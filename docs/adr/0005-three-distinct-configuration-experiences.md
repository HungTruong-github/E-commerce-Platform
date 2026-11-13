# 5. Separation of Three Distinct Configuration Experiences

Date: 2026-11-13

## Status

Accepted

## Context

NovaStore supports advanced customization, but customer goals vary dramatically across different use cases:

1. Building a bare-metal desktop PC requires strict electrical and physical hardware compatibility checks (CPU socket, RAM type, cooler clearance, PSU wattage).
2. Designing a full workspace or gaming room setup involves ergonomic and peripheral coordination (monitors, arms, desk dimensions, display bandwidth, cable management).
3. Customizing a mechanical keyboard requires component-level modular compatibility (switch pins, plate mounting, PCB layout, stabilizer format).
   Treating all three as a single generic "builder" creates poor user experience and convoluted validation code.

## Decision

Architect three distinct configuration experiences and domain workflows:

1. **Interactive PC Builder** (`features/pc-builder` on frontend, `modules/pc-builder` and `modules/compatibility` on backend).
2. **Full Gaming & Workstation Setup Builder** (`features/setup-builder` on frontend, `modules/setup-builder` on backend).
3. **Product Customizer** (`features/keyboard-customizer` on frontend, `modules/customizer` on backend).

## Alternatives Considered

1. **Unified Generic Form Builder**: Rejected because hardware constraint rules (e.g. CPU socket matching) cannot be cleanly expressed in the same data model as ergonomic room layout rules (e.g. desk width vs monitor count).
2. **PC Builder Only**: Rejected because NovaStore is repositioned as a full gaming and workspace commerce platform, not merely a PC component shop.

## Consequences

- Clean separation of user experiences tailored to customer intents.
- Separate, maintainable compatibility algorithms for hardware rules versus workspace/peripheral rules.

# 4. Catalog Product vs Physical Inventory Stock Unit Distinction

Date: 2026-11-13

## Status

Accepted

## Context

NovaStore sells both brand-new items and pre-owned (used) goods. In a standard tutorial e-commerce schema, a `Product` entity has a single `price` and a single `stockQuantity`. However, pre-owned hardware introduces variability:

- The same product model (e.g. RTX 4070 Super) may have multiple used units on hand.
- Each used unit may have a different cosmetic grade (`LIKE_NEW`, `GOOD`, `FAIR`), a unique serial number, a specific test inspection report, a defect disclosure, different warranty periods, and a different selling price.

## Decision

Establish a three-tier model hierarchy in future database design:

1. **Catalog Product**: Universal product identity, technical specifications, brand, media, and SEO attributes.
2. **Product Variant / Condition Tier**: Sellable configuration tier (Brand New vs Used condition groups).
3. **Physical Inventory Stock Unit**: Serialized physical stock unit records with unit-level inspection details, cosmetic notes, defect disclosures, individual store warranty terms, and integer VND selling prices.

## Alternatives Considered

1. **Single Flat Product Table with Quantity Counter**: Rejected because it cannot record individual used unit serial numbers, differing condition grades, or individual unit defect disclosures.
2. **Separate Independent Products for Every Used Unit**: Rejected because it clutters the catalog search and fragments SEO and product reviews.

## Consequences

- Accurate inventory tracking and complete transparency for customers purchasing pre-owned items.
- Sets the foundation for the Phase 2 database design without premature schema implementation in Phase 0.

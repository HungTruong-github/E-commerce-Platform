# 3. Retailer-Owned Inventory Business Model (Model A)

Date: 2026-11-13

## Status

Accepted

## Context

E-commerce platforms can operate either as third-party multi-vendor marketplaces (e.g. Shopee, Amazon Marketplace) or as direct retailer-owned stores (e.g. B&H Photo, Best Buy, An Phat PC). A custom commerce platform handling custom PC builds, prebuilts, inspected used hardware, and specialized keyboard parts requires 100% deterministic physical inventory control, guaranteed hardware compatibility, rigorous technical inspection, and direct store warranty fulfillment.

## Decision

Adopt **Model A: Retailer-Owned Inventory / Store-Owned Retail Business**. NovaStore directly purchases new products from authorized distributors, acquires pre-owned goods, performs in-house technical testing, sets integer VND pricing, holds inventory in physical facilities, and fulfills orders directly. Third-party marketplace functionality (vendor registration, vendor portals, marketplace commissions, multi-vendor order splitting) is explicitly excluded from the system architecture.

## Alternatives Considered

1. **Third-Party Multi-Vendor Marketplace**: Rejected because marketplace sellers cannot be relied upon for rigorous component compatibility, standardized used hardware stress-testing, or unified store warranties.
2. **Pure Dropshipping Model**: Rejected due to high inventory latency, lack of physical inspection for used components, and inability to build customized PC assemblies before shipping.

## Consequences

- Guaranteed hardware quality control, accurate stock levels, and immediate warranty support for customers.
- Simplifies orders, payments, and shopping cart logic by removing multi-vendor order splitting and payout reconciliations.

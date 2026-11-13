# NovaStore Business Model (Model A: Retailer-Owned Inventory)

## 1. Operating Model Overview

NovaStore operates under **Model A: Retailer-Owned Inventory / Store-Owned Retail Business**. NovaStore is the merchant of record and direct custodian of all products offered on the platform.

```text
+-----------------------------------+
|      Direct Suppliers & OEMs      |  (Authorized distributors, component manufacturers)
+-----------------+-----------------+
                  |
                  | Bulk purchasing (Brand-New Products)
                  v
+-----------------------------------+
|     NovaStore Fulfillment Hub     |  <---+ Acquisition of pre-owned hardware
|  - Technical Testing Lab          |      | (Thorough inspection, grading, refurbishing)
|  - Centralized Inventory (VND)    |
|  - Quality Control & Packaging    |
+-----------------+-----------------+
                  |
                  | Direct Sales & Fulfillment
                  v
+-----------------------------------+
|        End Customers (B2C)        |
+-----------------------------------+
```

---

## 2. Core Responsibilities of NovaStore

1. **Procurement & Acquisition**:
   - Purchasing brand-new hardware, displays, peripherals, and accessories from authorized manufacturers and regional distributors.
   - Acquiring pre-owned computer components and systems from verified trade-in programs or corporate surplus.
2. **Physical Inventory Custody**:
   - Storing all goods in NovaStore's physical warehousing facilities.
   - Tracking stock levels, physical bins, serial numbers, and unit-level conditions.
3. **Quality Assurance & Technical Inspection**:
   - Inspecting 100% of used hardware: stress testing (FurMark, Prime95, MemTest86), PCB inspection, cosmetic grading, thermal paste repasting, and fan acoustic tests.
   - Providing transparent condition reports and defect disclosures to customers before purchase.
4. **Autonomous Pricing & Currency**:
   - Setting all consumer prices directly in integer Vietnamese Dong (VND).
   - Offering tiered pricing for used items based on cosmetic grade and remaining warranty duration.
5. **Warranty & After-Sales Support**:
   - Servicing manufacturer warranty claims for new items.
   - Providing direct **NovaStore Store Warranty** (e.g. 1 month, 3 months, 6 months, 12 months) for used items.
   - Managing customer returns, repairs, and technical support.

---

## 3. Explicit Exclusion of Third-Party Marketplace

NovaStore is deliberately designed as a unified retailer rather than a platform marketplace. The system explicitly **excludes**:

- Third-party merchant / seller registration.
- Vendor dashboards, merchant back-offices, and multi-tenant seller portals.
- Seller-owned product listings and arbitrary price setting by third parties.
- Multi-vendor cart partitioning and order splitting across different suppliers.
- Marketplace commission calculation, vendor subscription fees, and payout escrow systems.
- Third-party fulfillment tracking or dropshipping abstractions.

By eliminating marketplace complexity, the architecture maintains deterministic stock reliability, unified quality standards, and immediate fulfillment without multi-vendor coordination failures.

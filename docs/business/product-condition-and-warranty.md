# Product Condition, Inspection, and Warranty Architecture

## 1. Core Architectural Distinction: Catalog vs Inventory

A fundamental requirement of NovaStore is offering both **Brand-New** and **Inspected Pre-Owned (Used)** products within the same store.

To model this accurately, the architecture establishes a three-tier hierarchy:

```text
[ 1. Catalog Product ]
  Example: "NVIDIA GeForce RTX 4070 SUPER Founders Edition"
  Defines: Brand, Model Specs (12GB GDDR6X, 220W TGP, Dimensions), Media, SEO
         |
         v
[ 2. Product Variant / Condition Tier ]
  Example A: New (Factory Sealed, Full 36-Month Manufacturer Warranty)
  Example B: Used (Inspected, Tiered Pricing, NovaStore Warranty)
         |
         v
[ 3. Physical Inventory Stock Unit (Serialized) ]
  Unit 1: Serial #SN-4070-001 -> Condition: "LIKE_NEW", Price: 14,500,000 VND, 6-Mo Warranty
  Unit 2: Serial #SN-4070-002 -> Condition: "GOOD" (Minor scratch on backplate), Price: 13,800,000 VND, 3-Mo Warranty
  Unit 3: New Batch (Lot #L-9921) -> Quantity: 25 Units, Price: 17,200,000 VND, 36-Mo Manufacturer Warranty
```

---

## 2. Product Condition Classification

NovaStore standardizes product condition into four transparent grades:

| Condition Grade        | Description & Inspection Criteria                                                                                                                           | Packaging & Accessories                                                                   |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **NEW**                | 100% brand new, unboxed, factory sealed. Sourced from authorized distribution channels.                                                                     | Original retail box with all manufacturer accessories and manuals.                        |
| **LIKE_NEW (Grade A)** | Pre-owned or open-box. 99% cosmetic condition, zero noticeable scratches or blemishes. Tested 100% functional under heavy stress testing.                   | Original packaging or premium NovaStore brown box; all essential accessories included.    |
| **GOOD (Grade B)**     | Light signs of prior usage (minor surface hairline scratches or slight wear on mounting brackets). 100% functional, stable thermals.                        | NovaStore protective packaging; essential cables/brackets included; optional items noted. |
| **FAIR (Grade C)**     | Visible cosmetic wear, scuffs, or minor non-functional cosmetic imperfections (fully disclosed in product unit photos). Fully stress-tested and functional. | Secure packaging; defects explicitly documented; budget-optimized price.                  |

---

## 3. Technical Inspection & Defect Disclosure Workflow

For every pre-owned item acquired by NovaStore:

1. **Physical Inspection**: Examination of PCB traces, capacitor health, fan bearing wobbles, heatsink fins, port corrosion, and seal stickers.
2. **Stress & Stability Testing**:
   - GPUs: 30-minute FurMark load test + 3DMark TimeSpy loop (thermal delta < 15°C across core/hotspot).
   - CPUs: Prime95 Small FFTs (no worker errors, thermal throttling verification).
   - RAM: MemTest86 4 passes (0 bit flips).
   - Storage: CrystalDiskInfo health check (0 reallocated sectors, TBW logged).
   - Monitors: Dead pixel map (zero dead pixels in primary viewing field), backlight bleed inspection.
3. **Defect Disclosure**: Any cosmetic flaw or missing non-essential accessory is logged into the specific inventory unit record and presented directly on the product detail page before customer checkout.

---

## 4. Warranty Structure

| Warranty Type                  | Coverage Scope                                                                                     | Claims Handling                                                                                                                |
| ------------------------------ | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **Manufacturer Warranty**      | Applicable to New products (typically 12 to 36 months).                                            | NovaStore assists customers with authorized warranty center RMA, or customer claims directly.                                  |
| **NovaStore Store Warranty**   | Applicable to Used products (1, 3, 6, or 12 months based on unit tier).                            | Direct 1-to-1 replacement within 15 days if hardware fault occurs, or store credit/refund if no replacement unit is available. |
| **Lifetime Technical Support** | Assembly consultation, BIOS update assistance, and diagnostic triage for all PC Builder purchases. | Provided directly by NovaStore technical support team.                                                                         |

---

## 5. Pricing Guidelines (Integer Vietnamese Dong)

- NovaStore targets the Vietnamese market; all selling prices, discounts, and invoices are represented in **whole integer VND amounts** (e.g. `15,500,000 VND`).
- System architectures must never assume VND uses sub-unit cents (avoiding `amount / 100` assumptions).
- Used items are priced dynamically based on condition grade, remaining warranty duration, and current market demand.

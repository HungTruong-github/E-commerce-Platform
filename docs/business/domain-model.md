# NovaStore Business Domain Model

The NovaStore business architecture is decomposed into cohesive bounded contexts following Domain-Driven Design (DDD) principles:

```
+---------------------------------------------------------------------------------+
|                        NovaStore Custom Commerce Domain                         |
+---------------------------------------------------------------------------------+
   |              |             |              |             |              |
   v              v             v              v             v              v
[ Identity &   [ Product     [ PC & Setup   [ Compatibility[ Retail Store [ Shopping Cart
  Access ]       Catalog ]     Configurators] Engine ]       Inventory ]    & Orders ]
                                                            (New & Used)
```

## Bounded Contexts Summary

1. **Identity & Access (`modules/auth`, `modules/users`)**: Customer and staff credentials, password security, role permissions (`CUSTOMER`, `STAFF`, `ADMIN`).
2. **Product Catalog (`modules/catalog`)**: 8 primary product categories (A-H), specifications, media assets, search taxonomy.
3. **Product Configuration (`modules/configuration`)**: PC Builder assemblies, Full Gaming Setup arrangements, Mechanical Keyboard customization.
4. **Compatibility Engine (`modules/compatibility`)**: Physical dimensions, socket matching, cooler clearance, and PSU wattage rules.
5. **Retail Store Inventory (`modules/inventory`)**: Store-owned stock units, serialized used equipment tracking, cosmetic grades (`LIKE_NEW`, `GOOD`, `FAIR`), and inspection logs.
6. **Shopping Cart & Checkout (`modules/cart`, `modules/checkout`)**: Multi-item and custom bundle carts, live stock validation, order preparation.
7. **Order Fulfillment (`modules/orders`, `modules/shipping`)**: Order state machine (`PENDING` -> `DELIVERED`), immutable order snapshots with exact component serials.
8. **Payments (`modules/payments`)**: Integration with local Vietnamese gateways (VNPay, MoMo, ZaloPay) and international card processors.
9. **AI Shopping Assistant (`modules/ai-assistant`)**: Natural language consultation and allowlisted Tool Calling with required customer confirmation.
10. **Administration (`modules/admin`)**: Internal back-office for receiving, used hardware testing, grading, warranty management, and fulfillment.

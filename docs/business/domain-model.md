# Business Domain Model

The platform domain is decomposed into cohesive bounded contexts following Domain-Driven Design (DDD) principles:

```
+-------------------------------------------------------------+
|                      E-Commerce Domain                      |
+-------------------------------------------------------------+
   |             |            |            |             |
   v             v            v            v             v
[ Identity &  [ Catalog &  [ Cart &     [ Orders &    [ Payments &
  Accounts ]    Inventory ]  Checkout ]   Fulfillment ] Invoicing ]
```

## Bounded Contexts Summary

1. **Identity & Accounts (`modules/auth`, `modules/users`)**: User identity, credential verification, roles (CUSTOMER, ADMIN, SUPPORT), profile records.
2. **Product Catalog (`modules/catalog`)**: Categories, product specifications, pricing, media references, search indexing.
3. **Inventory Management (`modules/inventory`)**: Stock on hand, reservation locks during checkout, safety stock thresholds.
4. **Cart & Basket (`modules/cart`)**: Temporary and persistent shopping baskets, price calculations.
5. **Checkout & Discounts (`modules/checkout`, `modules/promotions`)**: Order preparation, coupon validations, tax estimations.
6. **Order Fulfillment (`modules/orders`, `modules/shipping`)**: Order state machine (PENDING -> CONFIRMED -> PROCESSING -> SHIPPED -> DELIVERED).
7. **Payments (`modules/payments`)**: Payment gateway adapters, authorization, capture, refund tracking.
8. **Feedback & Ratings (`modules/reviews`)**: Customer reviews, ratings, and verification badges.
9. **Notifications (`modules/notifications`, `workers/`)**: Asynchronous customer email, SMS, and transactional dispatches.

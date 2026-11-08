# REST API Conventions & Standards

## 1. URL Path Design

- Base URL: `/api/v1`
- Plural nouns for resource endpoints:
  - `/api/v1/products`
  - `/api/v1/categories`
  - `/api/v1/orders`
  - `/api/v1/users`

## 2. Standard Response Envelope

All API responses implement the shared contract types defined in `@ecommerce/types`:

### Success Single Resource Envelope:

```json
{
  "success": true,
  "data": { ... },
  "timestamp": "2026-11-09T03:00:00.000Z"
}
```

### Success Paginated Envelope:

```json
{
  "success": true,
  "data": [ ... ],
  "meta": {
    "page": 1,
    "limit": 20,
    "totalItems": 150,
    "totalPages": 8,
    "hasNextPage": true,
    "hasPreviousPage": false
  },
  "timestamp": "2026-11-09T03:00:00.000Z"
}
```

### Standard Error Envelope:

```json
{
  "success": false,
  "statusCode": 400,
  "error": "Bad Request",
  "message": ["email must be an email"],
  "timestamp": "2026-11-09T03:00:00.000Z",
  "path": "/api/v1/auth/register"
}
```

## 3. OpenAPI Documentation

Live interactive Swagger OpenAPI documentation is served at `/api/docs` and exported to CI artifacts.

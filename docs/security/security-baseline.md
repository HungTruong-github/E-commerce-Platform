# Security Baseline and Threat Mitigation

This document outlines the security controls, baseline configurations, and architectural safeguards integrated into the platform.

---

## 1. Zero Secret Ingestion Policy

- **No Committed Secrets:** Repository scanners (GitGuardian, Trufflehog) are supported. `.gitignore` strictly blocks `.env`, `.env.*.local`, `.env.production`.
- **Validation on Startup:** The NestJS API validates all configuration using **Zod** (`env.validation.ts`) before binding to any network interface. If mandatory secrets are missing or fail entropy constraints, boot halts immediately.

---

## 2. Container & OS Hardening

- **Non-Root Execution:**
  - `apps/api`: Runs as the built-in non-root `node` user (UID 1000).
  - `apps/web`: Served via `nginxinc/nginx-unprivileged` on port 8080 as user `nginx` (UID 101).
- **Minimal Attack Surface:**
  - Base images are pinned to `node:22-alpine` and `nginx:alpine`.
  - Development tools, compilers, and source files are discarded during multi-stage image generation.
- **Network Isolation:**
  - In production, PostgreSQL and Redis do not map ports to the host system. They are only reachable via Docker's bridge network from the `api` container.

---

## 3. Web & API Application Security

- **Security Headers (OWASP Recommended):**
  - Configured via **Helmet** in NestJS and matching headers in Nginx:
    - `X-Frame-Options: DENY` (Anti-Clickjacking)
    - `X-Content-Type-Options: nosniff` (Anti-MIME sniffing)
    - `X-XSS-Protection: 1; mode=block`
    - `Referrer-Policy: strict-origin-when-cross-origin`
- **CORS Protection:**
  - Restricted to whitelisted domains (`CORS_ORIGIN`). Wildcard `*` is explicitly disabled when credentials/cookies are active.
- **Input Validation & Sanitization:**
  - Every incoming payload is validated using `class-validator` with strict `whitelist: true` and `forbidNonWhitelisted: true`, discarding unexpected fields and preventing mass-assignment vulnerabilities.
- **Rate Limiting:**
  - Nginx provides edge rate limiting zones (`limit_req_zone`) for both general API access (`30r/s`) and authentication routes (`5r/s`).

---

## 4. Authentication & Cryptography Baseline (Planned Implementation)

- **Password Hashing:** Argon2id or bcrypt with cost factor >= 12.
- **Tokens:** JWT signed with HMAC-SHA256 or asymmetric RS256 with short expiration (15m access, 7d refresh in HttpOnly cookies).
- **Data at Rest:** Sensitive credentials stored as cryptographically hashed or encrypted values.

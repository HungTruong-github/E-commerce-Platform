# 1. Monorepo Architecture with pnpm Workspaces

Date: 2026-11-09

## Status

Accepted

## Context

We need to develop an enterprise-ready E-commerce Platform consisting of a modern single-page frontend (React + Vite), a modular backend (NestJS + Prisma), and shared libraries (TypeScript types, utility helpers, build configs). Multi-repo structures introduce synchronisation delays, duplicate dependency versions, and complex cross-repo pull requests.

## Decision

Adopt a single Git monorepo governed by **pnpm Workspaces**, utilizing a unified root lockfile and strict module boundary packages (`@ecommerce/types`, `@ecommerce/shared`, `@ecommerce/tsconfig`, `@ecommerce/eslint-config`).

## Consequences

- Single atomic PRs spanning UI components, API endpoints, and contract schemas.
- Consistent Node.js (v22.x) and pnpm (v9.x) versions across all environments.
- Fast, space-efficient dependency management using content-addressable storage.

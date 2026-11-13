# 2. Modular Monolith Architecture over Microservices

Date: 2026-11-13

## Status

Accepted

## Context

NovaStore requires sophisticated business capabilities (PC compatibility checks, setups, used inventory, pricing in VND, and AI tool calling). Decomposing early into microservices introduces significant operational overhead: distributed transactions, network partitioning latency, polyrepo synchronization, and container orchestration overhead (Kubernetes/Kafka), which is unsuitable for a lean team and a standard development workstation (e.g. 16GB RAM Windows laptop).

## Decision

Adopt a **Modular Monolith** architecture using **NestJS** and **Prisma ORM** within a single backend application (`apps/api`). Enforce strict domain boundaries where modules communicate via explicit TypeScript interfaces or asynchronous events, avoiding cross-module database direct mutations.

## Alternatives Considered

1. **Microservices Architecture**: Rejected due to premature complexity, distributed transaction issues, and high resource requirements.
2. **Layered Monolith (traditional MVC)**: Rejected because it encourages tight coupling across layers, leading to spaghetti code and poor testability.

## Consequences

- Fast local development cycle, simple zero-downtime container deployment, and unified debugging.
- Clean bounded contexts allow future extraction of individual high-load domains (e.g. Compatibility Engine) into standalone microservices if needed.

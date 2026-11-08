.PHONY: help install dev dev-deps dev-deps-down build lint typecheck test clean docker-build-prod docker-up-prod docker-down-prod db-generate db-migrate

# Default target
help:
	@echo "Available commands:"
	@echo "  make install         - Install all monorepo dependencies"
	@echo "  make dev-deps        - Start development infrastructure (Postgres, Redis)"
	@echo "  make dev-deps-down   - Stop development infrastructure"
	@echo "  make dev             - Run all applications in development mode"
	@echo "  make build           - Build all shared packages and applications"
	@echo "  make lint            - Run ESLint across all workspaces"
	@echo "  make typecheck       - Run TypeScript compiler checks across all workspaces"
	@echo "  make test            - Run all test suites"
	@echo "  make clean           - Remove build artifacts and temporary files"
	@echo "  make db-generate     - Generate Prisma Client"
	@echo "  make db-migrate      - Run Prisma database migrations"

install:
	pnpm install

dev-deps:
	docker compose -f infrastructure/docker/development/docker-compose.yml up -d

dev-deps-down:
	docker compose -f infrastructure/docker/development/docker-compose.yml down

dev:
	pnpm dev

build:
	pnpm build

lint:
	pnpm lint

typecheck:
	pnpm typecheck

test:
	pnpm test

clean:
	pnpm clean

db-generate:
	pnpm --filter @ecommerce/api db:generate

db-migrate:
	pnpm --filter @ecommerce/api db:migrate

docker-build-prod:
	docker compose -f infrastructure/docker/production/docker-compose.yml build

docker-up-prod:
	docker compose -f infrastructure/docker/production/docker-compose.yml up -d

docker-down-prod:
	docker compose -f infrastructure/docker/production/docker-compose.yml down


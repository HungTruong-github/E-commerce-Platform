# Production Deployment Plan

This guide outlines the production deployment topology, security policies, and execution steps for Ubuntu Server environments.

---

## 1. Production Architecture Topology

```
                  Internet (HTTPS :443, HTTP :80)
                                 |
                                 v
                 +-------------------------------+
                 |        Nginx Gateway          |
                 |  - TLS termination (Let's    |
                 |    Encrypt / Certbot)         |
                 |  - Rate limiting              |
                 |  - Security headers           |
                 +---------------+---------------+
                                 |
                  Internal Docker Bridge Network
                  (No direct host port mapping)
                                 |
        +------------------------+------------------------+
        |                                                 |
        v                                                 v
+-------------------------------+         +-------------------------------+
|     ecommerce_prod_web        |         |     ecommerce_prod_api        |
|  - Nginx unprivileged (:8080) |         |  - NestJS Node 22 runtime     |
|  - Pre-built static bundles   |         |    non-root (:4000)           |
+-------------------------------+         +---------------+---------------+
                                                          |
                                          Internal Network Only
                                          (Isolated from internet)
                                                          |
                                      +-------------------+-------------------+
                                      |                                       |
                                      v                                       v
                          +-----------------------+               +-----------------------+
                          | ecommerce_prod_postgres |             | ecommerce_prod_redis  |
                          |  - Postgres 16 Alpine |               |  - Redis 7 with auth  |
                          |  - Named volume mount |               |  - Appendonly journal |
                          +-----------------------+               +-----------------------+
```

---

## 2. Server Prerequisites (Ubuntu Server 22.04 / 24.04 LTS)

1. **System Packages**:
   ```bash
   sudo apt update && sudo apt upgrade -y
   sudo apt install -y curl git ufw fail2ban ca-certificates gnupg
   ```
2. **Docker Engine & Compose Plugin**:
   Install official Docker CE engine following Docker's official Ubuntu repository guide.
3. **Firewall (UFW)**:
   ```bash
   sudo ufw default deny incoming
   sudo ufw default allow outgoing
   sudo ufw allow ssh
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   sudo ufw enable
   ```

---

## 3. Production Environment Secret Provisioning

Secrets must **never** be checked into version control. On the deployment server, create a production `.env` file with high-entropy cryptographic strings:

```bash
# Generate high-entropy keys:
openssl rand -base64 48
```

Required variables:

- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `REDIS_PASSWORD`
- `JWT_SECRET`
- `JWT_REFRESH_SECRET`
- `CORS_ORIGIN`

---

## 4. Deployment Execution Steps

1. **Clone repository on target server**:

   ```bash
   git clone <repo-url> /opt/ecommerce-platform
   cd /opt/ecommerce-platform
   ```

2. **Place production `.env`**:

   ```bash
   chmod 600 .env
   ```

3. **Build and launch containers**:

   ```bash
   docker compose -f infrastructure/docker/production/docker-compose.yml build --no-cache
   docker compose -f infrastructure/docker/production/docker-compose.yml up -d
   ```

4. **Run database migrations inside API container**:

   ```bash
   docker compose -f infrastructure/docker/production/docker-compose.yml exec api pnpm db:migrate:deploy
   ```

5. **Verify service health**:
   ```bash
   docker compose -f infrastructure/docker/production/docker-compose.yml ps
   curl -f http://localhost/api/v1/health
   ```

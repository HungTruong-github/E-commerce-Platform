#!/bin/sh
# Database backup script for PostgreSQL
set -e

BACKUP_DIR="${BACKUP_DIR:-/backups}"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="${BACKUP_DIR}/ecommerce_db_${TIMESTAMP}.sql.gz"

mkdir -p "$BACKUP_DIR"

echo "Creating database backup: $BACKUP_FILE"
pg_dump -h "${DB_HOST:-postgres}" -U "${DB_USER:-ecommerce_user}" "${DB_NAME:-ecommerce_db}" | gzip > "$BACKUP_FILE"
echo "Backup created successfully."


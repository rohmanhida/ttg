#!/bin/bash
# ============================================================
# Runs once on first container start via docker-entrypoint-initdb.d
# Environment variables available here come from the compose
# `environment` block: MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD
# ============================================================

set -e

echo ">>> [init] Creating user '${MYSQL_USER}' and granting privileges on '${MYSQL_DATABASE}'..."

mysql -u root -p"${MYSQL_ROOT_PASSWORD}" <<-EOSQL

    -- Create user accessible from any host (for inter-container access)
    CREATE USER IF NOT EXISTS '${MYSQL_USER}'@'%'
        IDENTIFIED BY '${MYSQL_PASSWORD}';

    -- Grant all privileges on the app database
    GRANT ALL PRIVILEGES ON \`${MYSQL_DATABASE}\`.* TO '${MYSQL_USER}'@'%';

    -- Also allow localhost access (useful for local tooling / CLI)
    CREATE USER IF NOT EXISTS '${MYSQL_USER}'@'localhost'
        IDENTIFIED BY '${MYSQL_PASSWORD}';

    GRANT ALL PRIVILEGES ON \`${MYSQL_DATABASE}\`.* TO '${MYSQL_USER}'@'localhost';

    FLUSH PRIVILEGES;

EOSQL

echo ">>> [init] Done. User '${MYSQL_USER}' granted ALL PRIVILEGES on '${MYSQL_DATABASE}'."

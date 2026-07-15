# Playwright SQL Testing Framework

## Project Overview

This repository provides a lightweight, automation-oriented framework for validating SQL behavior through Playwright test cases. The core objective is to exercise database-backed business logic against PostgreSQL and assert expected results with deterministic test checks..

The project is useful for regression testing, schema validation, and data-quality checks where SQL queries must be verified repeatedly as application logic or database structures evolve.

## Technical Architecture

### Technology Stack

| Layer | Tooling | Purpose |
| :--- | :--- | :--- |
| Test runner | Playwright | Executes JavaScript-based test specifications and assertions |
| Database client | PostgreSQL + pg | Connects to PostgreSQL and runs SQL statements |
| Configuration | dotenv | Loads environment variables for database access |
| Test organization | Playwright spec files in tests/ | Encapsulates joins, aggregates, CTEs, views, and window functions |
| Reporting | Allure Playwright | Produces structured test reports for local and CI runs |

### Repository Structure

| Path | Description |
| :--- | :--- |
| tests/ | SQL-focused Playwright specs covering customer, orders, payments, joins, aggregates, CTEs, views, and window functions |
| database/ | Reusable connection and query helpers for PostgreSQL access |
| playwright.config.js | Playwright runner configuration, reporters, and browser project settings |
| package.json | Node dependencies and scripts for running the suite |
| test-db-connection.js | Simple connectivity check for the PostgreSQL instance |

## Getting Started

These steps assume a Fedora Linux environment using the Zsh shell.

### 1. Install prerequisites

```bash
sudo dnf update -y
sudo dnf install -y nodejs npm python3 python3-pip postgresql postgresql-server
```

Verify versions:

```bash
node --version
npm --version
python3 --version
```

### 2. Start PostgreSQL

```bash
sudo postgresql-setup initdb
sudo systemctl enable --now postgresql
```

Create a database user and database if needed:

```bash
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres';"
sudo -u postgres psql -c "CREATE DATABASE ecommerce;"
```

### 3. Clone and install dependencies

```bash
cd /path/to/playwright-sql-testing-framework
npm install
npx playwright install --with-deps chromium
```

### 4. Configure environment variables

Create a local environment file:

```bash
cat > .env <<'EOF'
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=ecommerce
DB_SSL=false
EOF
```

### 5. Run the example suite

```bash
npx playwright test tests/customer.spec.js
```

If the database is reachable and the expected tables exist, the test should execute successfully.

## Usage

### Happy Path

The recommended workflow is:

1. Ensure PostgreSQL is running and accessible.
2. Configure the database connection in the .env file.
3. Install the Node dependencies.
4. Run a specific Playwright spec.

Example:

```bash
npm install
npx playwright install --with-deps chromium
npx playwright test tests/joins.spec.js
```

This validates a join query over the customers, orders, and payments tables and confirms that the returned values match the expected assertions.

### Primary Use Cases

#### 1. Validate customer lookups

```javascript
const { executeQuery } = require("../database/db");

const result = await executeQuery("SELECT * FROM customers WHERE customer_id = $1;", [1]);
console.log(result.rows[0]);
```

#### 2. Assert aggregate totals

```sql
SELECT SUM(amount) AS total
FROM payments;
```

#### 3. Verify view-based query behavior

```sql
SELECT * FROM completed_orders;
```

#### 4. Exercise window functions

```sql
SELECT
  payment_method,
  amount,
  ROW_NUMBER() OVER (PARTITION BY payment_method ORDER BY amount DESC) AS rank
FROM payments;
```

## Features

- Reusable PostgreSQL connection management through the database helper layer.
- Parameterized query execution for safer database access patterns.
- Playwright-based SQL test cases covering joins, aggregates, grouping, CTEs, views, and window functions.
- Configurable environment variables for local and CI database connections.
- Allure reporting support for readable execution summaries.
- Test modules organized by SQL concept, making it straightforward to expand coverage.

## Running the Full Suite

```bash
npm run test:playwright
```

## Notes

The current test suite assumes a PostgreSQL database populated with tables such as customers, orders, and payments, along with a view named completed_orders. If your environment uses a different schema or table layout, update the SQL in the spec files and the database query helpers accordingly.

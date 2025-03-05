# E2E Tests with Testcontainers

This directory contains end-to-end tests for the URL Shortener backend API using Testcontainers for PostgreSQL.

## Overview

The e2e tests use [Testcontainers](https://testcontainers.com/) to spin up a PostgreSQL container for each test run, ensuring that tests run against a clean database environment. This approach provides several benefits:

- Tests run in isolation with a fresh database for each test run
- No need to set up a separate test database
- Tests can be run in CI/CD pipelines without additional configuration
- Tests are more reliable and deterministic

## Running the Tests

To run the e2e tests with Testcontainers:

```bash
pnpm test:e2e:testcontainers
```

## Test Structure

The tests are organized to test the main API endpoints:

1. Creating a shortened URL (`POST /url`)
2. Retrieving a URL by slug (`GET /url/:slug`)
3. Redirecting to the original URL (`GET /:slug`)

Each test verifies the expected behavior of the API, including error cases.

## Configuration

The test configuration is defined in `jest-e2e-testcontainers.json`. Key settings include:

- Extended timeout (60 seconds) to allow for container startup
- Custom module mapping to resolve imports correctly
- Mocking of the `nanoid` module to avoid ESM-related issues

## Database Migrations

The tests automatically run migrations on the test database using the `run-migrations.ts` helper, which uses Drizzle ORM to apply migrations from the `./migrations` folder.

## Requirements

- Docker must be installed and running on your machine to use Testcontainers
- Node.js 18+ and pnpm 
<div align="center">

# E-Commerce Core API

<p>
  <img alt="Node.js" src="https://cdn.simpleicons.org/nodedotjs/339933" height="20" />
  <img alt="Express" src="https://cdn.simpleicons.org/express/000000" height="20" />
  <img alt="MongoDB" src="https://cdn.simpleicons.org/mongodb/47A248" height="20" />
  <img alt="Swagger" src="https://cdn.simpleicons.org/swagger/85EA2D" height="20" />
  <img alt="Jest" src="https://cdn.simpleicons.org/jest/C21325" height="20" />
</p>

<p>
  <img alt="Node" src="https://img.shields.io/badge/Node.js-%E2%89%A520-339933?logo=node.js&logoColor=white" />
  <img alt="Express" src="https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white" />
  <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-8.x-47A248?logo=mongodb&logoColor=white" />
  <img alt="License" src="https://img.shields.io/badge/License-MIT-blue" />
</p>

</div>

Modern backend base for an e-commerce platform (Node.js + Express + MongoDB), with JWT auth, request validation, i18n, error handling, and Swagger schema generation.

---

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Scripts](#scripts)
- [API](#api)
- [Localization (i18n)](#localization-i18n)
- [Validation](#validation)
- [Error format](#error-format)
- [Testing](#testing)
- [Lint & format](#lint--format)

---

## Features

- <img alt="JWT" src="https://cdn.simpleicons.org/jsonwebtokens/000000" height="16" /> JWT authentication (access + refresh)
- <img alt="Joi" src="https://cdn.simpleicons.org/jira/0052CC" height="16" /> Request validation with Joi
- <img alt="i18next" src="https://cdn.simpleicons.org/translate/1A73E8" height="16" /> Multilingual responses (i18next) – English & Vietnamese
- <img alt="Sentry" src="https://cdn.simpleicons.org/sentry/362D59" height="16" /> Optional Sentry error tracking
- <img alt="Swagger" src="https://cdn.simpleicons.org/swagger/85EA2D" height="16" /> Swagger OpenAPI schema generation (`swagger-jsdoc`)
- <img alt="ESLint" src="https://cdn.simpleicons.org/eslint/4B32C3" height="16" /> ESLint + Prettier + Husky + lint-staged

---

## Tech stack

- Runtime: Node.js (requires `>= 20`)
- Framework: Express 5 (ESM)
- Database: MongoDB (Mongoose)
- Validation: Joi
- Auth: JSON Web Token
- Docs: swagger-jsdoc + swagger-ui-express
- Testing: Jest + Supertest

---

## Project structure

```text
server/
  src/
    config/          # database, i18n, swagger
    controllers/     # request handlers
    middlewares/     # auth, validation, error handler
    models/          # mongoose models
    routes/          # route definitions + swagger JSDoc
    services/        # business logic (user, token)
    utils/           # ApiError, catchAsync
    locates/         # i18n JSON (en, vi)
    validations/     # Joi schemas
```

---

## Getting started

### 1) Install

```bash
npm install
```

### 2) Configure environment

Create `.env` based on `.env.example`.

### 3) Run in development

```bash
npm run dev
```

Server runs at:

- API: `http://localhost:${PORT:-8000}`
- Health check: `GET /health`

---

## Environment variables

See `.env.example`.

Common required variables:

- `PORT`
- `MONGO_URI`
- `JWT_SECRET`
- `JWT_ACCESS_EXPIRATION_MINUTES`
- `JWT_REFRESH_EXPIRATION_DAYS`

Optional integrations (only if you use them):

- <img alt="Stripe" src="https://cdn.simpleicons.org/stripe/635BFF" height="16" /> `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
- <img alt="Cloudinary" src="https://cdn.simpleicons.org/cloudinary/3448C5" height="16" /> `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- <img alt="Sentry" src="https://cdn.simpleicons.org/sentry/362D59" height="16" /> `SENTRY_ENABLED`, `SENTRY_DSN`

Security note: never commit `.env` (already ignored by `.gitignore`).

---

## Scripts

```bash
npm run dev          # start with nodemon
npm test             # run Jest tests
npm run test:watch   # watch mode
npm run coverage     # coverage report
npm run lint         # eslint
npm run lint:fix     # eslint --fix
npm run format       # prettier
```

---

## API

Base path: `/api`

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`

### Users

- `GET /api/users` (admin)
- `POST /api/users` (admin)
- `GET /api/users/:id`
- `PUT /api/users/:id`
- `DELETE /api/users/:id` (admin)
- Address ops under `/api/users/:id/addresses`

### Swagger (OpenAPI)

Swagger schema generation is configured in `src/config/swagger.js` and route JSDoc is placed in `src/routes/*.js`.

If you want Swagger UI at `/api-docs`, mount it in `src/index.js`:

```js
import swaggerUi from 'swagger-ui-express'
import specs from './config/swagger.js'

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
```

---

## Localization (i18n)

This project uses `i18next` + filesystem backend.

- Locales live in `src/locates/{en,vi}/*.json`
- Namespaces: `auth`, `validation`
- Default: `en`

Switch language using:

- HTTP header: `Accept-Language: vi`
- Query string (supported by the language detector): `?lng=vi`

---

## Validation

Validation uses Joi schemas in `src/validations/`.

- Routes call `validate(schema)` middleware.
- Joi message keys map to i18n keys (e.g. `validation:any.required`).

---

## Error format

Errors are returned as JSON:

```json
{
  "success": false,
  "message": "...",
  "stack": "..."
}
```

In production, `stack` is hidden.

---

## Testing

Run tests:

```bash
npm test
```

HTTP tests are typically written with `supertest`.

---

## Lint & format

- ESLint config: `eslint.config.js`
- Prettier config: `.prettierrc.cjs`
- Git hooks: Husky (`npm run prepare`) + lint-staged

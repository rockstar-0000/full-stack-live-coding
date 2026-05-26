# Full Stack Live Coding

A production-quality full-stack monorepo using React, Express, PostgreSQL, and shared TypeScript types.

## Stack

| Layer      | Tech                                    |
| ---------- | --------------------------------------- |
| Frontend   | React 18, Vite, TypeScript, TailwindCSS |
| Backend    | Node.js, Express, TypeScript            |
| Database   | PostgreSQL, Prisma ORM                  |
| Validation | Zod (shared frontend + backend)         |
| Testing    | Vitest (web), Jest (api)                |
| Monorepo   | npm workspaces                          |

## Structure

```
/
├── apps/
│   ├── web/          # React + Vite frontend (port 3000)
│   └── api/          # Express backend (port 3001)
├── packages/
│   └── shared/       # Shared Zod schemas + TypeScript types
└── package.json      # Workspace root
```

## Quick Start

### 1. Prerequisites

- Node.js ≥ 18
- PostgreSQL running locally (or update `DATABASE_URL`)

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
```

Edit `apps/api/.env` with your database credentials.

### 4. Set up the database

```bash
# Run migrations
npm run db:migrate --workspace=apps/api

# (Optional) Seed example data
npm run db:seed --workspace=apps/api
```

### 5. Start development servers

```bash
npm run dev
```

- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- Health check: http://localhost:3001/api/v1/health

## Scripts

| Command                                   | Description                     |
| ----------------------------------------- | ------------------------------- |
| `npm run dev`                             | Start both servers concurrently |
| `npm run build`                           | Build both apps                 |
| `npm run test`                            | Run all tests                   |
| `npm run lint`                            | Lint all workspaces             |
| `npm run format`                          | Prettier format all files       |
| `npm run db:migrate --workspace=apps/api` | Run Prisma migrations           |
| `npm run db:studio --workspace=apps/api`  | Open Prisma Studio              |

## API Reference

Base URL: `/api/v1`

| Method   | Path         | Description    |
| -------- | ------------ | -------------- |
| `GET`    | `/health`    | Health check   |
| `GET`    | `/items`     | List all items |
| `GET`    | `/items/:id` | Get item by id |
| `POST`   | `/items`     | Create item    |
| `PUT`    | `/items/:id` | Update item    |
| `DELETE` | `/items/:id` | Delete item    |

### Example request

```bash
curl -X POST http://localhost:3001/api/v1/items \
  -H "Content-Type: application/json" \
  -d '{"title": "My item", "description": "optional"}'
```

## Adding a New Feature

1. Add/update shared types or Zod schemas in `packages/shared/src/`
2. Add Prisma model in `apps/api/prisma/schema.prisma`, then run `db:migrate`
3. Create service → controller → route in `apps/api/src/`
4. Register the route in `apps/api/src/routes/index.ts`
5. Add API client method in `apps/web/src/api/`
6. Build the UI in `apps/web/src/pages/` or `components/`

## Testing

```bash
# All tests
npm run test

# Watch mode (web)
npm run test:watch --workspace=apps/web

# Coverage (api)
npx jest --coverage --workspace=apps/api
```

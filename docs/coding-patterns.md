# Coding Patterns

---

## Architecture Flow (IMPORTANT)

BACKEND FLOW:
Route → Controller → Service → Prisma

FRONTEND FLOW:
API → Hook → Component → Page

---

## Backend Rules

- Routes: wiring only
- Controllers: request/response only
- Services: business logic + DB calls
- Prisma: database only

---

## Frontend Rules

- API layer: fetch only
- Hooks: state + logic
- Components: UI only
- Pages: composition only

---

## Core Rule (NON-NEGOTIABLE)

Prisma only exists in service layer.
No business logic in routes or controllers.

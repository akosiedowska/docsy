# Docsy

A pet project — a web app for booking medical appointments. Users can register, sign in, and book appointments with doctors.

## Tech stack

### Frontend (`/frontend`)

- React 19 + TypeScript
- Vite
- MUI (Material UI) + Emotion
- React Router
- React Hook Form + Zod (forms & validation)
- TanStack Query (data fetching/caching)
- Zustand (state management)
- Axios (HTTP client)
- lucide-react (icons)

### Backend (`/backend`)

- Node.js + TypeScript
- Fastify (with `fastify-type-provider-zod`, `@fastify/cors`, `@fastify/cookie`, `@fastify/jwt`)
- Prisma ORM (`@prisma/client`, `@prisma/adapter-pg`)
- PostgreSQL
- Zod (validation)
- bcrypt (password hashing)

## Getting started

### Prerequisites

- Node.js (LTS)
- Docker (for running PostgreSQL locally)

### 1. Clone the repo

```bash
git clone https://github.com/akosiedowska/docsy.git
cd docsy
```

### 2. Set up environment variables

Copy the example env files and adjust if needed:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

### 3. Start the database

```bash
cd backend
npm install
npm run db:up
```

This starts a PostgreSQL container (via `docker-compose.yml`) on `localhost:5433`.

### 4. Run database migrations

```bash
npm run prisma:migrate
```

### 5. Start the backend

```bash
npm run dev
```

The API runs at `http://localhost:3000`.

### 6. Start the frontend

In a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

---
description: Coding, layering, and convention rules for backend and frontend source code.
paths:
  - 'backend/src/**/*.ts'
  - 'frontend/src/**/*.{ts,tsx,css}'
---

# Coding Standards

Rules for all code in this repo. Architecture details live in `CLAUDE.md`; this file covers how code should be written.

## General

- TypeScript everywhere. Avoid `any`; prefer `unknown` plus narrowing. No unchecked casts or non-null assertions (`!`) unless justified.
- Match the surrounding code: naming, file layout, comment density. Look at a neighbouring module/feature before adding a new one.
- Keep changes focused. Don't refactor unrelated code or reformat files you aren't otherwise changing.
- No dead code, commented-out code, or leftover `console.log`. Comments explain _why_, not _what_.
- Never commit secrets. Configuration comes from env vars (`.env.example` documents them); add new vars to the example file.
- Prefer small functions with early returns over deep nesting.

## Formatting

- Prettier config in `.prettierrc` is the source of truth: no semicolons, single quotes (also in JSX), 2-space indent, 100-column width.
- Format touched files with `npm run format -- <paths>` from the repo root.

## Naming

- Files: backend `<feature>.<layer>.ts` (e.g. `appointment.service.ts`); React components `PascalCase.tsx`; hooks `useThing.tsx`/`.ts`; other frontend files `camelCase.ts`.
- Variables/functions `camelCase`; types, interfaces, components, classes `PascalCase`; constants `UPPER_SNAKE_CASE` only for true constants.
- Zod schemas: `camelCaseSchema`, with the inferred type exported as `PascalCase` (`z.infer`).
- Booleans read as questions: `isAuthenticated`, `hasSlots`.

## Backend (`backend/`)

- Respect module layering: `routes` (schemas + preHandlers) → `controller` → `service` (the only place that touches Prisma). Controllers don't contain business logic; services don't touch `request`/`reply`.
- Every route declares Zod schemas for params/query/body **and** response. Responses must never expose sensitive fields (password hashes, token hashes).
- Protect every non-public route: `preHandler: [authenticate, requireRole(...), authorize(policy)]`. Resource-level access checks go in a `*.policy.ts`, not inline in controllers.
- Throw errors from `src/errors/http-error.ts` (`middleware/error-handler.ts` maps them to responses); don't hand-build error responses or swallow errors.
- Import the Prisma client from `backend/generated/prisma`, never `@prisma/client`.
- Use `prisma.$transaction` when several writes must succeed or fail together (e.g. booking a slot). Use `select`/`include` deliberately; avoid N+1 queries.
- Schema changes go through `npm run prisma:migrate` (commit the migration). Never edit applied migrations or `generated/`.
- Store dates in UTC; convert for display only on the client.
- Read config from env, not hardcoded values (note: the CORS origin is currently hardcoded — don't add more).

## Frontend (`frontend/`)

- Routing is TanStack Router, file-based. Never edit `src/routeTree.gen.ts`. Put role-specific routes inside the matching layout folder (`_patient`, `dashboard/_doctor`, `dashboard/_admin`) and add path constants to `src/app/paths.ts`.
- Route files stay thin and render a page component from `src/pages/<role>/`.
- Feature code lives in `src/features/<name>/`: `api.ts` (HTTP calls), `hooks/` (TanStack Query wrappers), `queryKeys.ts`, `components/`, `schemas.ts`/`types.ts`.
- All HTTP goes through the shared Axios instance in `src/api/client.ts`. Components never call Axios directly; they use feature hooks.
- Server state belongs in TanStack Query (with keys from `queryKeys.ts`; invalidate on mutations). Zustand is for client/auth state only.
- Forms use React Hook Form + Zod resolvers; derive types from the Zod schema.
- UI uses Mantine and the theme in `src/styles/theme.ts` / `colors.ts`. Don't add new UI libraries and don't use `@mui/material` for new code. Layout-level styling uses CSS modules; avoid inline style objects for anything reusable.
- Handle loading, empty, and error states for every query. Keep components accessible: labelled inputs, keyboard operable, meaningful `alt`/`aria-*`.
- The access token stays in memory (Zustand store), never in `localStorage`/`sessionStorage`.
- Function components only; keep effects minimal and prefer derived values over syncing state in `useEffect`. Include correct dependency arrays.

## Git

- Small, focused commits with conventional-style messages (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`), matching existing history.
- Before finishing frontend work run `npm run lint` and `npm run build` in `frontend/`.

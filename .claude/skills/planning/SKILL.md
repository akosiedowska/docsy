---
name: planning
description: Plan a new feature or non-trivial change in the Docsy repo before any code is written. Use when the user asks to plan, design, scope, or break down a feature (e.g. "plan the doctor schedule page", "how should we implement X"). Produces an implementation plan and open questions, not code.
---

# Planning a feature

Produce a concrete, repo-specific implementation plan. **Do not write or edit code** while using this skill. Output the plan, ask questions, and wait for approval.

## Steps

1. **Understand the request.** Restate the goal in one or two sentences. Identify the role(s) involved (`PATIENT`, `DOCTOR`, `ADMIN`).
2. **Explore the codebase** before planning. Find the closest existing feature and mirror it:
   - Backend modules: `backend/src/modules/<name>/` (`*.routes.ts`, `*.controller.ts`, `*.service.ts`, `*.schemas.ts`, optional `*.policy.ts`).
   - Frontend features: `frontend/src/features/<name>/` (`api.ts`, `hooks/`, `queryKeys.ts`, `components/`, `schemas.ts`/`types.ts`), pages in `frontend/src/pages/<role>/`, routes in `frontend/src/routes/`.
   - Check `backend/prisma/schema.prisma` for the data model and `CLAUDE.md` for architecture rules.
3. **Identify gaps and ambiguities.** If requirements, edge cases, or UX are unclear, ask questions (see below) instead of guessing.
4. **Write the plan** using the template below.

## Plan template

```
## Goal
<what and why, 1-3 sentences>

## Scope
In: <...>
Out: <explicitly not included>

## Data model
<Prisma schema changes + migration, or "none">

## Backend
<per module: routes (method + path + roles), Zod schemas, service logic, policy/authorization, error cases>

## Frontend
<routes (and which role layout folder), paths.ts constants, pages, components, hooks + query keys, forms/schemas, loading/empty/error states>

## Affected files
- path — new | modified — what changes

## Steps
1. <ordered, small, independently verifiable steps; backend before frontend>

## Risks & edge cases
<double booking, race conditions, timezones, auth/ownership, migrations on existing data...>

## Verification
<how to check it works: manual flows per role, commands to run (`npm run build`, `npm run lint`), no automated tests exist yet>

## Open questions
<numbered list, or "none">
```

## Guidelines

- Follow the project's layering and conventions from `CLAUDE.md` and `.claude/rules/coding-standards.md`; reference them instead of restating them.
- Prefer reusing existing components, hooks, and helpers; name the ones to reuse.
- Always consider authorization: which middleware (`authenticate`, `requireRole`, `authorize(policy)`) protects each new endpoint, and which role guard protects each new route.
- Keep steps small and ordered so the user can review progressively.
- Keep the plan short and scannable. Skip template sections that don't apply instead of padding them.
- Flag anything that needs a decision (new dependency, schema change, breaking API change) explicitly.

## Questions

If anything material is ambiguous, list numbered questions (offer a recommended default for each), stop, and end the response with:

`Awaiting your answers…`

Do not begin implementation until the user answers or approves the plan.

# Repository Guidelines

## Project Structure & Module Organization
- `backend/` hosts the Node.js + Express API in TypeScript; `src/` contains config, database accessors, and route controllers.
- `frontend/` is the Vite + React TypeScript client; `src/` keeps feature folders, UI primitives, and shared utilities, while `public/` stores static assets.
- `docs/` stores architectural notes (`docs/architecture.md`) and contributor references.
- `docker/` centralises container assets: service Dockerfiles and PostgreSQL init SQL live here; Compose manifests sit at the repo root.

## Build, Test, and Development Commands
- `npm install` (at repo root) installs all workspace dependencies; run inside a package for scoped installs when needed.
- `npm run dev:backend` / `npm run dev:frontend` start services locally with hot reload outside Docker.
- `npm run dev` => `docker compose -f docker-compose.dev.yml up --build` launches PostgreSQL, API, and frontend together.
- `npm run build` chains backend `tsc` emit and frontend Vite build. `npm run lint` aggregates ESLint across workspaces. `npm test` currently prints placeholders until suites land.

## Coding Style & Naming Conventions
- TypeScript strict mode is enforced; exported functions should declare explicit return types when not obvious.
- 2-space indentation, trailing commas on multiline literals, single quotes in TypeScript, and kebab-case filenames for configs (`docker-compose.dev.yml`).
- React components live in PascalCase files (`HeroSection.tsx`), utilities in camelCase, and backend modules grouped by responsibility (`routes/`, `services/`, `repositories/`).
- Run `npm run lint -- --fix` before committing to apply ESLint/Prettier rules.

## Testing Guidelines
- Backend tests will live under `backend/tests/` with `.test.ts` suffix; prefer integration tests that exercise the PostgreSQL container (use test schema or transaction rollbacks).
- Frontend component/unit tests reside beside source as `.spec.tsx` using Vitest + React Testing Library.
- Smoke tests under `tests/smoke/` should verify `/api/health` and hero render after `docker compose` boot.
- Target ≥80% line coverage in new modules once suites exist; document gaps explicitly in PRs.

## Commit & Pull Request Guidelines
- Follow Conventional Commits (e.g., `feat(frontend): add hero status banner`). Keep commits focused and logically separated.
- Pull requests must state intent, list manual/automated tests (`npm run lint`, `npm run test`, `docker compose -f docker-compose.dev.yml up`), and attach UI screenshots for visual updates.
- Reference related issues via `Closes #123` and call out follow-up work with TODO links.
- Aim for reviewable diffs (≤500 LOC touched). Large changes require prior discussion.

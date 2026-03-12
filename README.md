# Next.js Boilerplate

Production-ready template for Next.js web apps built with the **App Router**, **React 19**, **TypeScript** (strict mode), and **Bun**. Includes a centralized API client, structured error handling, logging, optional Sentry integration, linters, formatters, git hooks, and tests out of the box.

## Prerequisites

- [Bun](https://bun.sh/) (v1.0+) -- runtime and package manager
- [Git](https://git-scm.com/)

## Getting Started

### 1. Create your project from the template

```bash
# Option A: GitHub "Use this template" button (creates a new repo)
# Option B: Clone directly
git clone <repo-url> my-app
cd my-app
rm -rf .git && git init
```

### 2. Configure

```bash
# Set your project name in package.json
# "name": "my-app"

# Create your environment file
cp .env.example .env.local
```

Edit `.env.local` with your values. Next.js requires the `NEXT_PUBLIC_` prefix for client-exposed variables. See `src/config/index.ts` for all available keys.

### 3. Install and run

```bash
bun install
bun run dev
```

The dev server starts at [http://localhost:3000](http://localhost:3000) with fast refresh.

### 4. Initialize git hooks (optional but recommended)

```bash
bunx husky init
```

This sets up pre-commit hooks that run ESLint and Prettier on staged files automatically.

## Project Structure

```
.
├── __tests__/            # Unit and integration tests
│   ├── unit/
│   └── integration/
├── app/                  # Next.js App Router
│   ├── layout.tsx        # Root layout (metadata, global styles)
│   ├── page.tsx          # Home page (server component)
│   ├── page.module.css   # Page-scoped styles
│   └── globals.css       # Global styles
├── docs/                 # Standalone guides for adopting features individually
├── src/
│   ├── api/              # Centralized Axios HTTP client with interceptors
│   ├── components/       # Reusable UI components
│   ├── config/           # Environment config (single source for env vars)
│   ├── hooks/            # Custom React hooks
│   ├── models/           # TypeScript interfaces and domain types
│   ├── services/         # Business logic and API call wrappers
│   └── utils/            # Error classes, logger, Sentry
├── .eslintrc.cjs         # ESLint config
├── .prettierrc           # Prettier config
├── next.config.ts        # Next.js config
├── tsconfig.json         # TypeScript config (strict mode)
├── vitest.config.ts      # Vitest config
├── AGENTS.md             # AI assistant coding standards
└── BEST_PRACTICES.md     # Architecture and engineering patterns
```

A `@/` path alias is configured in `tsconfig.json`, mapping to `src/`. Use it for imports:

```typescript
import { apiClient } from '@/api';
import { logger } from '@/utils/logger';
```

### App Router vs. src/

Next.js uses file-system routing via the `app/` directory. Pages, layouts, and route-specific styles live there. Shared application logic (API client, config, utils, services, models, hooks, components) lives in `src/` to keep concerns separated.

## Customizing the Template

The template ships with example placeholder code to demonstrate the architecture. Replace it with your own domain logic.

### Models

Edit `src/models/index.ts`. The example `Item` interface is a placeholder -- replace it with your domain types. Keep `ApiErrorResponse` and `PaginatedResponse` if they match your API contract.

### Services

Edit `src/services/index.ts`. The example `getItems` and `getItemById` functions show the pattern: services call the API client and return typed data. Replace these with your own API calls.

### Pages

Modify `app/page.tsx` or add new route directories under `app/`. Pages are server components by default -- add `'use client'` only when you need browser APIs, event handlers, or hooks.

### Routes

Next.js uses file-system routing. To add a new route:

1. Create `app/dashboard/page.tsx` for a `/dashboard` route.
2. Create `app/dashboard/layout.tsx` if the route needs its own layout.
3. Use `app/dashboard/[id]/page.tsx` for dynamic routes.

## Environment Variables

Copy `.env.example` to `.env.local` and adjust. Next.js requires the `NEXT_PUBLIC_` prefix for client-exposed variables. All env access is centralized in `src/config/index.ts` -- add new keys there, not as scattered `process.env` reads.

Available variables:

| Variable | Purpose | Default |
|----------|---------|---------|
| `NEXT_PUBLIC_APP_NAME` | Application name | `NextjsBoilerplate` |
| `NEXT_PUBLIC_ENVIRONMENT` | Environment identifier | `development` |
| `NEXT_PUBLIC_API_BASE_URL` | API base URL | `http://localhost:8000/api/v1` |
| `NEXT_PUBLIC_API_TIMEOUT` | Request timeout (ms) | `30000` |
| `NEXT_PUBLIC_SENTRY_DSN` | Sentry DSN (leave unset to disable) | -- |
| `NEXT_PUBLIC_SENTRY_ENVIRONMENT` | Sentry environment tag | -- |
| `NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE` | Sentry performance sample rate | -- |

## Key Conventions

- **TypeScript strict mode** with `@/` path alias mapping to `src/`.
- **App Router** with file-system routing. Server components by default; use `'use client'` only when needed.
- **Functional components** with hooks. No class components.
- **CSS Modules** (`.module.css`) for component-scoped styles. No inline style objects.
- **Services** handle business logic; pages handle layout and data fetching. Pages call services, not the API client directly.
- **Shared error classes** in `src/utils/errors.ts` (`AppError`, `NetworkError`, `ServerError`, `NotFoundError`, `ValidationError`). API errors are mapped automatically in the Axios interceptors.
- **Structured logger** in `src/utils/logger.ts`. Use instead of `console.log`.
- **Centralized config** in `src/config/index.ts`. All environment variable access goes through this module.

## Scripts

| Script | Description |
|--------|-------------|
| `bun run dev` | Start Next.js dev server with fast refresh |
| `bun run build` | Production build |
| `bun run start` | Start production server |
| `bun run lint` | Run ESLint with auto-fix |
| `bun run typecheck` | Run TypeScript compiler (no emit) |
| `bun run format` | Format all source files with Prettier |
| `bun run format:check` | Check formatting without writing changes |
| `bun run test` | Run all tests (Vitest) |
| `bun run test:unit` | Run unit tests only |
| `bun run test:integration` | Run integration tests only |
| `bun run test:watch` | Run tests in watch mode |
| `bun run test:coverage` | Run tests with coverage report |

## Tooling

### ESLint

Config in `.eslintrc.cjs`. Extends `eslint:recommended`, `@typescript-eslint/recommended`, `next/core-web-vitals`, and `prettier`. Import ordering is enforced. `console.log` triggers a warning (use the structured logger instead).

### Prettier

Config in `.prettierrc`: single quotes, semicolons, trailing commas, 100-character line width, 2-space indent.

### Husky + lint-staged

Pre-commit hooks run ESLint (with `--fix`) and Prettier on staged `.ts`/`.tsx` files in both `app/` and `src/`. Prettier also runs on staged `.json`, `.css`, and `.md` files. Configuration is in `package.json` under `lint-staged`.

Run `bunx husky init` after cloning to set up the `.husky/` directory.

### Sentry (optional)

Sentry is fully optional. If `NEXT_PUBLIC_SENTRY_DSN` is not set, the app runs without it and no Sentry code is active. To enable:

1. Set `NEXT_PUBLIC_SENTRY_DSN` in your `.env.local` file.
2. Optionally set `NEXT_PUBLIC_SENTRY_ENVIRONMENT` and `NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE`.

Sentry is initialized in `src/utils/sentry.ts` using `@sentry/nextjs` with browser tracing and session replay integrations.

### Next.js Config

Config in `next.config.ts`:
- `reactStrictMode: true` for development warnings.
- `poweredByHeader: false` to remove the `X-Powered-By` header for security.

## Testing

Tests live in `__tests__/` and use [Vitest](https://vitest.dev/) with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

- **Unit tests** (`__tests__/unit/`): No browser, no network. Test utils, services, hooks, and pure logic with mocked dependencies.
- **Integration tests** (`__tests__/integration/`): Render pages with React Testing Library. Mock router and API. Verify rendering and user interactions.

```bash
bun run test              # all tests
bun run test:unit         # unit only
bun run test:integration  # integration only
bun run test:watch        # watch mode
bun run test:coverage     # with coverage report
```

For the full testing guide, conventions, and examples, see [`__tests__/TESTING_GUIDE.md`](__tests__/TESTING_GUIDE.md).

## AI Assistant Integration

This template includes coding standards for AI assistants (Cursor, Copilot, etc.):

- **`AGENTS.md`** at the repo root defines naming conventions, project structure rules, component patterns (including server vs. client components), error handling, and DRY principles that AI tools follow when generating code.
- **`.cursor/rules/`** contains Cursor-specific rule files that point to `AGENTS.md` as the single source of truth.
- **`.github/copilot-instructions.md`** points GitHub Copilot to `AGENTS.md`.
- **Optional sections** in `AGENTS.md` (linters, formatters, githooks, Sentry) can be toggled on or off by wrapping them in HTML comments (`<!-- ... -->`).

## Standalone Guides

The [`docs/`](docs/) folder contains self-contained guides for adopting individual features in **existing projects** that don't use this template:

| Guide | Topic |
|-------|-------|
| [`01-linters.md`](docs/01-linters.md) | ESLint + TypeScript setup |
| [`02-formatters.md`](docs/02-formatters.md) | Prettier setup |
| [`03-githooks.md`](docs/03-githooks.md) | Husky + lint-staged setup |
| [`04-sentry.md`](docs/04-sentry.md) | Sentry error tracking setup |

## Further Reading

- [`BEST_PRACTICES.md`](BEST_PRACTICES.md) -- Architecture, security, CI/CD, API layer, and observability patterns.
- [`AGENTS.md`](AGENTS.md) -- Full coding standards for developers and AI assistants.
- [`__tests__/TESTING_GUIDE.md`](__tests__/TESTING_GUIDE.md) -- Testing conventions, examples, and CI integration.
- [`docs/`](docs/) -- Standalone integration guides for existing projects.

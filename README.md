# Next.js Boilerplate — Engineering Standards

Boilerplate for Next.js (App Router) web apps with TypeScript, linters, formatters, common utils, tests, and engineering standards. Uses **Bun** as the runtime and package manager.

## References & Best Practices

- **Next.js**: [nextjs.org/docs](https://nextjs.org/docs) — App Router, server components, data fetching
- **React**: [react.dev](https://react.dev/) — hooks, concurrent features
- **TypeScript**: Strict mode, path aliases, no `any`
- **Testing**: [Vitest](https://vitest.dev/), [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- **Security**: CSP headers, env-based secrets, no secrets in client bundle
- **Observability**: Structured logging, Sentry error tracking (see `utils/logger`, `utils/sentry`)

## Project Structure

```
app/              # Next.js App Router (pages, layouts, styles)
src/
├── api/          # Centralized HTTP client (Axios)
├── components/   # Reusable UI components
├── config/       # Environment config (process.env)
├── hooks/        # Custom React hooks
├── models/       # TypeScript interfaces and types
├── services/     # Business logic and API call wrappers
└── utils/        # Error classes, logger, Sentry
```

## Quick Start

```bash
# Install dependencies
bun install

# Start dev server (port 3000)
bun run dev

# Type check
bun run typecheck

# Lint
bun run lint

# Format
bun run format

# Run tests
bun run test

# Build for production
bun run build

# Start production server
bun run start
```

## Environment Variables

Copy `.env.example` to `.env.local` and adjust. Next.js requires the `NEXT_PUBLIC_` prefix for client-exposed variables. See `src/config/index.ts` for all keys.

## Key Conventions

- **TypeScript strict mode** with path alias `@/` mapping to `src/`.
- **App Router** with file-system routing. Server components by default.
- **Functional components** with hooks. No class components.
- **Services** handle business logic; pages handle layout and data fetching.
- **Shared error classes** in `src/utils/errors.ts`. API errors are mapped in interceptors.
- **Structured logger** in `src/utils/logger.ts`. Use instead of `console.log`.
- **Sentry** is optional: set `NEXT_PUBLIC_SENTRY_DSN` to enable; runs without it by default.

## Scripts

| Script | Description |
|--------|-------------|
| `bun run dev` | Start Next.js dev server with HMR |
| `bun run build` | Production build |
| `bun run start` | Start production server |
| `bun run lint` | Run ESLint with auto-fix |
| `bun run typecheck` | Run TypeScript compiler (no emit) |
| `bun run format` | Format with Prettier |
| `bun run test` | Run all tests (Vitest) |
| `bun run test:unit` | Run unit tests only |
| `bun run test:integration` | Run integration tests only |
| `bun run test:watch` | Run tests in watch mode |
| `bun run test:coverage` | Run tests with coverage report |

## Docs

See the [`docs/`](docs/) folder for standalone guides on adding linters, formatters, githooks, and Sentry to existing projects.

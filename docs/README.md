# Next.js best-practices: standalone guides

This folder contains **standalone documentation** so you can adopt individual features (linters, formatters, githooks, Sentry) in **existing projects** that do not follow this repo's structure. Each doc is self-contained and includes copy-paste config and step-by-step integration.

---

## Docs overview

| Doc | Topic | Use when |
|-----|--------|----------|
| [01-linters.md](01-linters.md) | **Linters** (ESLint + TypeScript) | You want to add linting and/or type checking to an existing Next.js project. |
| [02-formatters.md](02-formatters.md) | **Formatters** (Prettier) | You want consistent code formatting in an existing project. |
| [03-githooks.md](03-githooks.md) | **Githooks** (Husky + lint-staged) | You want to run lint/format/tests automatically before each commit. |
| [04-sentry.md](04-sentry.md) | **Sentry** | You want error tracking and performance monitoring in an existing Next.js app. |

---

## How to use these guides

- **Pick what you need**: Use one doc or combine several (e.g. linters + formatters + githooks).
- **Adapt to your layout**: Paths (e.g. `src/`, `app/`), config file location, and env vars can be adjusted to your project.
- **No full migration**: You don't have to adopt this repo's full structure; the goal is to add or configure each feature in place.

For the full project structure, conventions, and patterns used in this repo, see the root [README.md](../README.md) and [BEST_PRACTICES.md](../BEST_PRACTICES.md).

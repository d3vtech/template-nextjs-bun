# Next.js Web Repository Standards

When writing or modifying code in this repository, follow these rules so all developers and AI assistants produce consistent, maintainable, and optimized output.

**Optional groups:** Rules are grouped below. To disable a group (e.g. linters, formatters, githooks, or Sentry), wrap that entire section in HTML comments: `<!-- ... -->`. Leave core groups active unless you have a reason to relax them.

---

## Core: Language & runtime

- **TypeScript** with strict mode. Type all component props, route params, API responses, and public function signatures.
- Use **functional components** with hooks. No class components.
- Use **Next.js App Router** with file-system routing in `app/`. No Pages Router.
- **Server components** are the default. Mark client components with `'use client'` only when they need interactivity, hooks, or browser APIs.
- Prefer **centralized config** via `src/config/index.ts`. No scattered `process.env` reads.
- Use **Bun** as runtime and package manager. Use `bun run`, `bun add`, `bunx` commands.
- Use **Next.js** as the framework (build, dev server, SSR/SSG).

---

## Core: Naming conventions

Enforce these names consistently:

- **Files / directories**: `camelCase` for utility files (e.g. `client.ts`, `logger.ts`), `PascalCase` for components (e.g. `Button.tsx`). App Router pages use Next.js conventions (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`).
- **Components**: `PascalCase` (e.g. `HomePage`, `Button`, `NavBar`).
- **Functions and hooks**: `camelCase` (e.g. `getItems`, `useAuth`). Custom hooks must start with `use`.
- **Constants**: `UPPER_SNAKE_CASE` (e.g. `MAX_RETRIES`, `DEFAULT_TIMEOUT`).
- **Types and interfaces**: `PascalCase` (e.g. `Item`, `ApiErrorResponse`).
- **Variables and parameters**: `camelCase`.
- **Private/internal**: leading underscore `_camelCase` for module-private helpers.
- **CSS Modules**: `camelCase` class names (e.g. `styles.container`, `styles.navBar`).

---

## Core: Indentation & formatting

- **Indentation**: 2 spaces (no tabs).
- **Line length**: 100 characters maximum.
- **Quotes**: Single quotes `'` for strings (Prettier config).
- **Trailing commas**: Use in multi-line structures (arrays, objects, function params).
- **Semicolons**: Always use.
- **Blank lines**: One between logical blocks; two between top-level exports in non-component files.

---

## Core: Project structure

- **App Router**: `app/` — file-system routing. `page.tsx` for pages, `layout.tsx` for layouts, `loading.tsx` / `error.tsx` for loading and error states.
- **Config**: `src/config/index.ts` — all env variable access. Add new keys here, not scattered `process.env` reads.
- **API client**: `src/api/client.ts` — single Axios instance with interceptors. `src/api/index.ts` for barrel exports. Do not create ad-hoc Axios instances.
- **Utils**: `src/utils/errors.ts` (AppError, NetworkError, etc.), `src/utils/logger.ts`, `src/utils/sentry.ts`. **Reuse these**; do not reimplement error handling or logging.
- **Services**: `src/services/` — business logic and API call wrappers. Pages call services, not the API client directly.
- **Models**: `src/models/` — TypeScript types/interfaces for API responses and domain objects.
- **Hooks**: `src/hooks/` — reusable stateful logic (client-side only).
- **Components**: `src/components/` — reusable UI components.

---

## Core: Components & pages

- **Functional components** only. Use `React.JSX.Element` as return type.
- **Server components** are the default in App Router. Only add `'use client'` when needed (hooks, event handlers, browser APIs).
- **Props**: Define a `Props` type/interface for every component that accepts props. Export it if consumers need it.
- **Styles**: Use CSS Modules (`.module.css`) for component-scoped styles. No inline style objects in JSX.
- **No business logic in components**: Delegate to services or hooks. Components handle rendering and user interaction.

```tsx
// GOOD: typed props, CSS Module, no inline logic
import styles from './ItemCard.module.css';

interface ItemCardProps {
  item: Item;
  onPress: (id: string) => void;
}

export function ItemCard({ item, onPress }: ItemCardProps): React.JSX.Element {
  return (
    <button className={styles.card} onClick={() => onPress(item.id)}>
      <h3 className={styles.title}>{item.title}</h3>
    </button>
  );
}
```

---

## Core: Server vs client components

- **Server components** (default): Can access server-only resources, fetch data directly, and reduce client bundle size. Cannot use hooks, event handlers, or browser APIs.
- **Client components** (`'use client'`): Needed for interactivity, hooks (`useState`, `useEffect`, etc.), event handlers, and browser APIs.
- **Rule of thumb**: Push `'use client'` as far down the tree as possible. Keep layouts and data-fetching pages as server components.

---

## Core: Error handling

- **Use shared error classes**: Import from `src/utils/errors.ts` (`AppError`, `NetworkError`, `ServerError`, `NotFoundError`, `ValidationError`).
- **API errors are mapped in interceptors**: The API client converts HTTP errors to typed `AppError` subclasses. Do not catch raw Axios errors in pages or services.
- **User-facing messages**: Use `getErrorMessage(error)` to extract a safe message for display. Never show raw error objects to users.
- **Next.js error boundaries**: Use `error.tsx` files in the App Router for route-level error handling.

---

## Core: Optimization & reducing repetition (DRY)

- **Reuse before writing new**: Prefer `src/utils/errors`, `src/utils/logger`, `src/config`, and `src/api/client`. Do not duplicate error handling, log format, or config loading.
- **Extract shared logic**: If the same pattern appears in more than one place, extract to a hook, utility, or service.
- **Small, focused functions**: Prefer short functions that do one thing; compose them.
- **Single source of truth**: Define constants and types in one module and import them.
- **No copy-paste of blocks**: Extract helpers (e.g. `useItemById(id)` hook wrapping the service call).

When generating or reviewing code, ask: "Can this reuse an existing util or config? Is there duplicated logic that should be one function?" and refactor accordingly.

---

## Optional: Linters (ESLint + TypeScript)

<!-- To disable linter-related rules, comment out this entire section. -->

- Follow **ESLint** config in `.eslintrc.cjs` and **TypeScript** config in `tsconfig.json`.
- **ESLint**: `eslint:recommended` base, `@typescript-eslint/recommended`, `next/core-web-vitals`, `prettier` (last). No `console.log` (use logger).
- **TypeScript**: `strict: true`, `noUnusedLocals`, `noUnusedParameters`, `noImplicitReturns`. Path alias `@/` maps to `src/`.
- Run `bunx next lint --fix` and `bunx tsc --noEmit` before commit.

---

## Optional: Formatters (Prettier)

<!-- To disable formatter-related rules, comment out this entire section. -->

- Use **Prettier** as the project formatter. Config in `.prettierrc`: single quotes, trailing commas, 100 char width, 2-space indent.
- Run `bunx prettier --write 'app/**/*' 'src/**/*'` to format; use `bunx prettier --check 'app/**/*' 'src/**/*'` in CI.
- Prefer editor integration (Prettier extension + format on save).

---

## Optional: Githooks (Husky + lint-staged)

<!-- To disable githooks-related rules, comment out this entire section. -->

- Use **Husky + lint-staged** to run ESLint and Prettier on staged files before each commit.
- Config: `.husky/pre-commit` runs `bunx lint-staged`. lint-staged config in `package.json`.
- After changing hooks: `bunx husky init` and verify with a test commit.

---

## Optional: Sentry

<!-- To disable Sentry-related rules, comment out this entire section. -->

- **Sentry** is optional: if `NEXT_PUBLIC_SENTRY_DSN` is not set, the app runs without Sentry.
- Initialize in one place: `src/utils/sentry.ts` with `initSentry()`. Call during app startup.
- Use `@sentry/nextjs` which handles both client and server instrumentation.
- Optionally use `instrumentation.ts` for server-side initialization.

---

## Testing

Follow **`__tests__/TESTING_GUIDE.md`**.

- **Unit tests** (`__tests__/unit/`): No browser, no network. Mock API client. Test utils, services, hooks, and pure logic. Fast (< 10 seconds).
- **Integration tests** (`__tests__/integration/`): Render pages with React Testing Library. Mock router and API. Verify rendering and user interactions.
- **Naming**: `describe/it` blocks that read like specifications. One concern per test.
- **Coverage**: Focus on `src/utils/`, `src/services/`, `src/hooks/`. Use `vitest run --coverage`.

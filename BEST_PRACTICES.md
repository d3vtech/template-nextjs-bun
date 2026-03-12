# Next.js Web & Engineering Best Practices

References and patterns used in this boilerplate and recommended for the team.

---

## 1. App architecture

- **Feature-based structure**: Group by feature when the app grows (e.g. `src/features/auth/`, `src/features/dashboard/`). Start with the flat structure in this template, graduate to feature folders as complexity warrants it.
- **Separation of concerns**: Pages handle layout and data fetching; services handle business logic and API calls; hooks encapsulate reusable stateful logic.
- **Routing**: Use Next.js App Router with file-system conventions (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`).
- **Server vs client**: Default to server components. Push `'use client'` as far down the tree as possible.
- **State management**: Use React context for simple global state; Zustand for complex state. Avoid prop drilling beyond 2 levels.

**References**

- [Next.js docs](https://nextjs.org/docs)
- [React docs](https://react.dev/)
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)

---

## 2. Configuration & security

- **Twelve-Factor (adapted)**: Config via environment variables using `process.env`. No secrets in source code or client bundle.
- **Centralized config**: All env access goes through `src/config/index.ts`. No scattered `process.env` reads throughout the codebase.
- **Secrets**: Never commit `.env` or `.env.local` files. Use `.env.example` for documentation. API keys that must remain secret should stay server-side; only expose public keys via `NEXT_PUBLIC_` prefix.
- **CSP**: Configure Content-Security-Policy headers in `next.config.ts` or middleware to prevent XSS.

**References**

- [Next.js environment variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [OWASP Web Security](https://owasp.org/www-project-web-security-testing-guide/)

---

## 3. Code quality

- **Linting**: ESLint with `@typescript-eslint`, `next/core-web-vitals`, and `prettier` integration. Run in pre-commit and CI.
- **Types**: TypeScript strict mode. Type all component props, route params, API responses, and service interfaces. Avoid `any`.
- **Formatting**: Prettier with consistent settings (single quotes, trailing commas, 100 char width). Format on save.
- **Git hooks**: Husky + lint-staged so broken style/types don't get committed.

**References**

- [TypeScript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

---

## 4. Testing

- **Layers**:
  - **Unit**: Fast, no browser. Test hooks, utils, services, and pure logic. Mock API calls.
  - **Integration**: Test page rendering and user interactions with React Testing Library. Mock router and API.
  - **E2E** (optional): Playwright or Cypress for full browser testing.
- **Naming**: `describe/it` blocks that read like specifications.
- **Coverage**: Run with `vitest run --coverage`; focus on business logic, hooks, and services.
- **CI**: Run lint, typecheck, unit, then integration tests.

**References**

- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Vitest](https://vitest.dev/)
- [Playwright](https://playwright.dev/)

---

## 5. Observability & operations

- **Logging**: Use a structured logger (`src/utils/logger.ts`). Log levels (debug, info, warn, error). Suppress debug logs in production.
- **Error tracking**: Sentry for crash reporting and performance monitoring. Use `@sentry/nextjs` for unified client/server instrumentation.
- **Performance**: Monitor with Sentry transactions, React DevTools Profiler, and Lighthouse. Watch for unnecessary re-renders and large bundle sizes.

**References**

- [Sentry Next.js SDK](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Lighthouse](https://developer.chrome.com/docs/lighthouse/)

---

## 6. CI/CD

- **Pipeline**: Lint -> typecheck -> unit tests -> integration tests -> build -> deploy.
- **Build**: `bun run build` produces optimized output in `.next/`.
- **Deploy**: Vercel (recommended), Cloudflare Pages, Docker, or any Node.js-capable host.
- **Secrets**: Inject at build time via CI environment variables. Never bake secrets into the client bundle.

**References**

- [Next.js deployment](https://nextjs.org/docs/app/building-your-application/deploying)
- [Vercel](https://vercel.com/)

---

## 7. Security

- **OWASP Web Top 10**: Follow [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/).
- **Network**: Use HTTPS everywhere. Configure CORS and CSP headers.
- **Storage**: Do not store sensitive data in localStorage. Use httpOnly cookies for auth tokens when possible.
- **Dependencies**: Audit regularly (`bun audit` or `npm audit`). Pin versions. Update frequently.
- **Bundle**: Avoid exposing debug info in production builds. Use source maps only in error tracking (Sentry).

---

## 8. API layer

- **Centralized client**: Use a single Axios instance with interceptors for auth, error handling, and logging (`src/api/client.ts`).
- **Typed responses**: Define TypeScript interfaces for all API request/response shapes in `src/models/`.
- **Error handling**: Map API errors to app-level errors using `src/utils/errors.ts`. Never let raw API errors reach the UI.
- **Retry & timeout**: Configure timeouts and optional retry logic in the API client.

---

## 9. Sentry (optional)

- **Plug-in**: Set `NEXT_PUBLIC_SENTRY_DSN` to enable; leave unset to disable. No code paths depend on Sentry.
- **SDK**: `@sentry/nextjs` handles both client and server instrumentation.
- **Instrumentation**: Optionally use `instrumentation.ts` for server-side initialization.
- **Source maps**: Use `withSentryConfig()` in `next.config.ts` for production source map uploads.

**References**

- [Sentry Next.js SDK](https://docs.sentry.io/platforms/javascript/guides/nextjs/)

---

## 10. This boilerplate

| Area       | Where                              |
|------------|-------------------------------------|
| App Router | `app/`                             |
| Config     | `src/config/index.ts`              |
| API client | `src/api/client.ts`                |
| Models     | `src/models/`                      |
| Errors     | `src/utils/errors.ts`              |
| Logging    | `src/utils/logger.ts`              |
| Sentry     | `src/utils/sentry.ts`              |
| Services   | `src/services/`                    |
| Lint       | `.eslintrc.cjs`                    |
| Format     | `.prettierrc`                      |
| Types      | `tsconfig.json`                    |
| Hooks      | Husky + lint-staged                |
| Tests      | `__tests__/unit`, `__tests__/integration` |

Extend with feature folders, state management, auth, and analytics as your app grows.

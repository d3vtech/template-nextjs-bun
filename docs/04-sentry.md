# Sentry Configuration

This guide explains how to add **Sentry** (error tracking and performance monitoring) to an existing Next.js app. Sentry is optional: if `NEXT_PUBLIC_SENTRY_DSN` is not set, the app runs without Sentry.

---

## Why use Sentry?

- **Error tracking**: Unhandled exceptions are reported with stack traces and context.
- **Performance**: Optional transaction tracing for page loads, navigations, and API routes.
- **Session replay**: Record and replay user sessions to debug reported issues.
- **Optional at runtime**: No DSN means no Sentry; no code paths or env required for local/dev.

---

## 1. Install

```bash
bun add -d @sentry/nextjs
```

---

## 2. Environment / config

Add Sentry settings to your environment config.

### Example: `.env.local`

```bash
# Sentry (leave unset to disable)
NEXT_PUBLIC_SENTRY_DSN=https://key@org.ingest.sentry.io/project
NEXT_PUBLIC_SENTRY_ENVIRONMENT=production
NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE=0.1
```

### Example: Config module (`src/config/index.ts`)

```typescript
export const config = {
  sentry: {
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN ?? '',
    environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT ?? 'development',
    tracesSampleRate: parseFloat(process.env.NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE ?? '0.1'),
  },
} as const;
```

---

## 3. Initialize Sentry (single place)

Create a module that initializes Sentry only when `NEXT_PUBLIC_SENTRY_DSN` is set:

```typescript
// src/utils/sentry.ts
import * as Sentry from '@sentry/nextjs';

import { config } from '@/config';

export function initSentry(): void {
  if (!config.sentry.dsn) {
    return;
  }
  Sentry.init({
    dsn: config.sentry.dsn,
    environment: config.sentry.environment,
    tracesSampleRate: config.sentry.tracesSampleRate,
    sendDefaultPii: false,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
}

export { Sentry };
```

---

## 4. Next.js instrumentation hook (optional)

Next.js supports an `instrumentation.ts` file at the project root for server-side initialization:

```typescript
// instrumentation.ts
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { initSentry } = await import('@/utils/sentry');
    initSentry();
  }
}
```

---

## 5. Error boundary (optional)

Use Sentry's error boundary for graceful error handling in client components:

```tsx
'use client';

import * as Sentry from '@sentry/nextjs';

function FallbackComponent() {
  return <div>Something went wrong. Please refresh the page.</div>;
}

export function ErrorBoundaryWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Sentry.ErrorBoundary fallback={FallbackComponent}>
      {children}
    </Sentry.ErrorBoundary>
  );
}
```

---

## 6. Source maps (production)

For readable stack traces in production, use the Sentry webpack plugin via `next.config.ts`:

```typescript
import { withSentryConfig } from '@sentry/nextjs';

const nextConfig = {
  // your config
};

export default withSentryConfig(nextConfig, {
  org: 'your-org',
  project: 'your-project',
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: true,
});
```

---

## 7. Integrating into an existing project

1. Install `@sentry/nextjs`.
2. Add Sentry env vars to your config module and `.env.example`.
3. Create `initSentry()` in a single module (e.g. `utils/sentry.ts`).
4. Optionally add `instrumentation.ts` for server-side initialization.
5. Set `NEXT_PUBLIC_SENTRY_DSN` only in environments where you want Sentry (staging, production).
6. Optionally wrap `next.config.ts` with `withSentryConfig` for source map uploads.

---

## Summary

| Item                        | Purpose                                       |
|-----------------------------|-----------------------------------------------|
| `NEXT_PUBLIC_SENTRY_DSN`   | Enable Sentry; leave unset to disable         |
| `initSentry()`             | Single place to init SDK with your config     |
| `instrumentation.ts`       | Server-side Sentry initialization hook        |
| Error boundary              | Graceful error handling in React tree         |
| `withSentryConfig()`       | Upload source maps during build               |

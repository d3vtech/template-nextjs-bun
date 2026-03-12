# Testing Guide

This guide covers the testing strategy, conventions, and patterns used in this Next.js boilerplate.

---

## Test layers

### 1. Unit tests (`__tests__/unit/`)

Fast, isolated tests that run without a browser.

**What to test:**
- Utility functions (`src/utils/`)
- Service logic (`src/services/`)
- Custom hooks (`src/hooks/`)
- Pure helper functions
- Error classes and type guards

**What to mock:**
- API client (Axios)
- Next.js router (`next/navigation`)
- Browser APIs (localStorage, fetch, etc.)

**Example:**

```typescript
import { describe, it, expect } from 'vitest';

import { getErrorMessage, AppError, NetworkError } from '@/utils/errors';

describe('getErrorMessage', () => {
  it('should return message from AppError', () => {
    const error = new AppError('Something failed', 400);
    expect(getErrorMessage(error)).toBe('Something failed');
  });

  it('should return message from NetworkError', () => {
    const error = new NetworkError();
    expect(getErrorMessage(error)).toBe('Network request failed');
  });

  it('should return default message for unknown errors', () => {
    expect(getErrorMessage('string error')).toBe('An unexpected error occurred');
  });
});
```

### 2. Integration tests (`__tests__/integration/`)

Tests that render components and verify user interactions.

**What to test:**
- Page rendering with mock data
- User interactions (click, type, scroll)
- Client component behavior
- Component integration with services

**Tools:**
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for rendering and queries
- [Vitest](https://vitest.dev/) for assertions and mocking

**Example:**

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import HomePage from '../../app/page';

describe('HomePage', () => {
  it('should render the app name', () => {
    render(<HomePage />);
    expect(screen.getByText('NextjsBoilerplate')).toBeTruthy();
  });
});
```

### 3. E2E tests (optional, not included)

Full browser tests using Playwright or Cypress. Add when your app has critical user flows that need end-to-end validation.

---

## Naming conventions

Use descriptive `describe` / `it` blocks that read like specifications:

```typescript
describe('apiClient', () => {
  describe('when the server returns a 404', () => {
    it('should throw a NotFoundError', async () => {
      // ...
    });
  });

  describe('when the network is unreachable', () => {
    it('should throw a NetworkError', async () => {
      // ...
    });
  });
});
```

For file names: `<module>.test.ts` or `<Component>.test.tsx`.

---

## Vitest configuration

Tests are configured in `vitest.config.ts`:

```typescript
/// <reference types="vitest/config" />
import { fileURLToPath, URL } from 'url';

import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['__tests__/**/*.test.{ts,tsx}'],
  },
});
```

---

## Running tests

```bash
# Run all tests
bun run test

# Run unit tests only
bun run test:unit

# Run integration tests only
bun run test:integration

# Run with coverage
bun run test:coverage

# Run in watch mode
bun run test:watch
```

---

## Coverage

Focus coverage on:
- `src/utils/` — error handling, logger, helpers
- `src/services/` — business logic and API call wrappers
- `src/hooks/` — custom hooks with state logic
- `app/` — page rendering and user interactions (integration tests)

Low-value coverage targets (skip or minimal):
- Layout boilerplate
- Pure style modules
- Re-export barrels

---

## CI integration

Recommended CI pipeline order:

1. `bunx next lint` — lint
2. `bunx tsc --noEmit` — type check
3. `bun run test:unit` — unit tests
4. `bun run test:integration` — integration tests

---

## Summary

| Layer       | Location               | Tools                          | Speed  |
|-------------|------------------------|--------------------------------|--------|
| Unit        | `__tests__/unit/`      | Vitest                         | Fast   |
| Integration | `__tests__/integration/`| Vitest + Testing Library       | Medium |
| E2E         | (optional)             | Playwright / Cypress           | Slow   |

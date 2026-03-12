# Linters (ESLint + TypeScript)

This guide explains how to add **ESLint** (linting) and **TypeScript strict mode** (type checking) to an existing Next.js project. You can adopt one or both; they work independently.

---

## Why use these linters?

- **ESLint**: Catches style issues, unused imports, hook rule violations, and common bugs. Replaces manual code review for mechanical issues.
- **TypeScript**: Static type checker. Ensures type safety and catches type-related bugs before runtime. With strict mode, prevents `any` leaks and missing return types.

---

## 1. ESLint

### Install

```bash
bun add -d eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser \
  eslint-plugin-import eslint-config-next eslint-config-prettier
```

### Add config: `.eslintrc.cjs`

Create or edit `.eslintrc.cjs` in your project root:

```js
module.exports = {
  root: true,
  env: { browser: true, es2022: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'next/core-web-vitals',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
  ignorePatterns: ['node_modules/', '.next/', 'coverage/', '*.config.*'],
};
```

### Run ESLint

```bash
# Lint with Next.js built-in lint command
bunx next lint

# Lint and auto-fix
bunx next lint --fix

# Lint specific file
bunx eslint app/page.tsx
```

### Key rules explained

- **`next/core-web-vitals`**: Next.js-specific rules including image optimization, link usage, and Core Web Vitals best practices.
- **`@typescript-eslint/no-unused-vars`**: Warns on unused variables; ignores names starting with `_`.
- **`import/order`**: Enforces consistent import ordering with newlines between groups.
- **`no-console`**: Warns on `console.log`; allows `console.warn` and `console.error`.

---

## 2. TypeScript strict mode

### Config: `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "preserve",
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "allowImportingTsExtensions": true,
    "esModuleInterop": true,
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },
    "plugins": [
      { "name": "next" }
    ]
  },
  "include": ["next-env.d.ts", "app/**/*", "src/**/*", "__tests__/**/*", "next.config.ts"],
  "exclude": ["node_modules", ".next", "coverage"]
}
```

### Run TypeScript

```bash
# Type check (no output files)
bunx tsc --noEmit
```

### Key flags explained

- **`strict: true`**: Enables all strict type checking options.
- **`jsx: "preserve"`**: Next.js handles JSX transformation; TypeScript preserves it as-is.
- **`moduleResolution: "bundler"`**: Optimized for Next.js bundler resolution.
- **`noUnusedLocals` / `noUnusedParameters`**: Error on unused variables and parameters.
- **`noImplicitReturns`**: Error when not all code paths return a value.
- **`plugins: [{ "name": "next" }]`**: Enables Next.js TypeScript plugin for enhanced type checking.
- **`paths`**: Enables `@/` path alias for clean imports.

---

## Integrating into an existing project

1. Install ESLint packages and create `.eslintrc.cjs` as shown above.
2. Run `bunx next lint --fix` and fix remaining issues.
3. Update `tsconfig.json` to enable `strict: true` and additional checks.
4. Run `bunx tsc --noEmit` and fix type errors.
5. Add both to CI and/or pre-commit hooks (see [03-githooks.md](03-githooks.md)).

---

## Summary

| Tool       | Purpose           | Config in       | Command                  |
|------------|-------------------|-----------------|--------------------------|
| ESLint     | Lint (style, bugs)| `.eslintrc.cjs` | `bunx next lint --fix`   |
| TypeScript | Type checking     | `tsconfig.json` | `bunx tsc --noEmit`      |

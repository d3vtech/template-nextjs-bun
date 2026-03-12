# Githooks (Husky + lint-staged)

This guide explains how to add **Husky** (Git hooks) and **lint-staged** (run tasks on staged files) to an existing Next.js project so that lint, format, and type checks run automatically before each commit.

---

## Why use Git hooks?

- **Catch issues early**: Prevent broken style, formatting, or type errors from being committed.
- **Automated**: No manual step required; hooks run on `git commit`.
- **Fast**: `lint-staged` only processes staged files, not the entire codebase.

---

## 1. Install

```bash
bun add -d husky lint-staged
```

---

## 2. Initialize Husky

```bash
bunx husky init
```

This creates a `.husky/` directory and adds a `prepare` script to `package.json`.

---

## 3. Add pre-commit hook

Create or edit `.husky/pre-commit`:

```bash
bunx lint-staged
```

---

## 4. Configure lint-staged

Add to your `package.json`:

```json
{
  "lint-staged": {
    "app/**/*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "src/**/*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "{app,src}/**/*.{json,css,md}": [
      "prettier --write"
    ]
  }
}
```

---

## 5. Test it

```bash
# Stage a file
git add app/page.tsx

# Commit — lint-staged will run ESLint + Prettier on staged files
git commit -m "test: verify pre-commit hook"
```

If ESLint or Prettier find issues they can't auto-fix, the commit will be blocked.

---

## 6. Optional: add typecheck hook

To run TypeScript type checking before commit, add a second command. Note that `tsc` checks all files (not just staged), so it may be slower:

```json
{
  "lint-staged": {
    "app/**/*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write",
      "bash -c 'bunx tsc --noEmit'"
    ],
    "src/**/*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write",
      "bash -c 'bunx tsc --noEmit'"
    ]
  }
}
```

Alternatively, run typecheck only in CI to keep commits fast.

---

## 7. Integrating into an existing project

1. Install Husky and lint-staged.
2. Run `bunx husky init` to create `.husky/` directory.
3. Add `bunx lint-staged` to `.husky/pre-commit`.
4. Configure lint-staged in `package.json` with your desired commands.
5. Test with a commit to verify the hook runs.

---

## Troubleshooting

- **Hook not running**: Ensure `.husky/pre-commit` is executable (`chmod +x .husky/pre-commit`).
- **Skipping hooks**: Use `git commit --no-verify` to bypass (not recommended for regular use).
- **After cloning**: Run `bun install` — the `prepare` script runs Husky automatically.

---

## Summary

| Tool        | Purpose                  | Config in           |
|-------------|--------------------------|---------------------|
| Husky       | Git hook management      | `.husky/pre-commit` |
| lint-staged | Run tasks on staged files| `package.json`      |

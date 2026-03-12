# Formatters (Prettier)

This guide explains how to add **Prettier** (code formatter) to an existing Next.js project and integrate it with ESLint so they don't conflict.

---

## Why use Prettier?

- **Consistent style**: Automatically formats code to a single style. No debates about tabs vs spaces, trailing commas, or quote style.
- **Works with ESLint**: Prettier handles formatting; ESLint handles logic and correctness. Use `eslint-config-prettier` to disable ESLint rules that conflict with Prettier.

---

## 1. Install

```bash
bun add -d prettier eslint-config-prettier
```

---

## 2. Add config: `.prettierrc`

Create `.prettierrc` in your project root:

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2,
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

---

## 3. Integrate with ESLint

Add `'prettier'` as the **last** item in your `.eslintrc.cjs` `extends` array:

```js
module.exports = {
  extends: [
    // ... your other extends
    'prettier', // must be last
  ],
};
```

This disables all ESLint rules that would conflict with Prettier.

---

## 4. Run Prettier

```bash
# Format all source files
bunx prettier --write 'app/**/*' 'src/**/*'

# Check formatting (CI-friendly, exits non-zero if unformatted)
bunx prettier --check 'app/**/*' 'src/**/*'

# Format specific file
bunx prettier --write app/page.tsx
```

---

## 5. Editor integration

For the best experience, install the Prettier extension for your editor and enable **format on save**:

**VS Code / Cursor** (`settings.json`):

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "[typescript]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "[typescriptreact]": { "editor.defaultFormatter": "esbenp.prettier-vscode" }
}
```

---

## 6. Integrating into an existing project

1. Install Prettier and `eslint-config-prettier`.
2. Create `.prettierrc` with your preferred settings.
3. Add `'prettier'` to ESLint extends (last position).
4. Run `bunx prettier --write 'app/**/*' 'src/**/*'` to format existing code.
5. Enable format on save in your editor.
6. Add `bunx prettier --check 'app/**/*' 'src/**/*'` to CI.

---

## Summary

| Tool     | Purpose    | Config in    | Command                                    |
|----------|------------|-------------|--------------------------------------------|
| Prettier | Formatting | `.prettierrc`| `bunx prettier --write 'app/**/*' 'src/**/*'` |
| eslint-config-prettier | Disable conflicting ESLint rules | `.eslintrc.cjs` extends | — |

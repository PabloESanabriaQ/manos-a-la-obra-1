Set up Prettier in this project and integrate it with the existing ESLint configuration.

## What to do

### 1. Install dependencies

Run:
```
npm install --save-dev prettier eslint-config-prettier
```

- `prettier` — the formatter itself.
- `eslint-config-prettier` — disables ESLint rules that would conflict with Prettier's formatting.

### 2. Create `.prettierrc`

Create the file `.prettierrc` at the project root:
```json
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

### 3. Create `.prettierignore`

Create `.prettierignore` at the project root:
```
dist/
node_modules/
package-lock.json
```

### 4. Update `eslint.config.js`

Add `eslint-config-prettier` as the last entry in the config array so it overrides any conflicting ESLint formatting rules. Read the current `eslint.config.js` first, then add:

```js
import prettierConfig from "eslint-config-prettier";
```

And append `prettierConfig` as the last element of the exported array.

### 5. Add npm scripts to `package.json`

Add these two scripts alongside the existing ones:
```json
"format": "prettier --write .",
"format:check": "prettier --check ."
```

### 6. (Optional) Set up husky + lint-staged

Ask the user: "¿Querés también configurar husky para correr el linter y formatter automáticamente antes de cada commit?"

If yes:
```
npm install --save-dev husky lint-staged
npx husky init
```

Then update `package.json` to add:
```json
"lint-staged": {
  "*.{js,jsx}": ["eslint --fix", "prettier --write"],
  "*.{css,scss,json,md}": ["prettier --write"]
}
```

And set the pre-commit hook (`.husky/pre-commit`) to:
```
npx lint-staged
```

### 7. Format existing files

After setup, run:
```
npm run format
```

to apply Prettier to the existing codebase.

### 8. Report to the user

Tell the user:
- What was installed and configured.
- The new scripts available (`npm run format`, `npm run format:check`).
- Whether husky was set up.
- Any files that were reformatted.

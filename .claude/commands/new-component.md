Create a new React component for this project.

Component name: $ARGUMENTS

## What to do

1. Determine whether this is a **reusable component** (goes in `src/components/`) or a **view/page** (goes in `src/views/`). If the name ends in `View` or clearly represents a page, treat it as a view. Otherwise, treat it as a component. If ambiguous, ask the user.

2. Create the folder `src/components/<ComponentName>/` (or `src/views/<ComponentName>/`) with exactly two files:

**`index.jsx`** — following the existing pattern in this project:
```jsx
import styles from "./styles.module.scss";

export default function <ComponentName>() {
  return (
    <section className={styles.container}>
      <p><ComponentName> works!</p>
    </section>
  );
}
```

**`styles.module.scss`** — start with a minimal scoped block:
```scss
.container {
}
```

3. After creating the files, tell the user:
   - The full path of the created files.
   - How to import it: `import <ComponentName> from "./<relative-path>";`
   - Any props they might want to add based on the component name.

## Rules
- Use the component name exactly as provided (PascalCase).
- Do NOT add prop-types, default exports at the bottom, or any boilerplate beyond what's shown above.
- Do NOT add comments.
- If the name contains spaces or is in another case, convert it to PascalCase silently.

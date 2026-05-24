Create a new service file for this project.

Arguments: $ARGUMENTS

## Argument format

The user may pass:

- Just a name: `useGetAllEpics` → creates a data-fetching hook at `src/services/getAllEpics.js`
- Name + endpoint: `useGetAllEpics /epics` → also pre-fills the fetch URL

If no arguments are given, ask the user for the service name and the API endpoint.

## What to do

Determine the type of service from the name:

- If it starts with `use` or fetches data (GET), create a **custom hook** (uses `useState` + `useEffect`).
- If it performs a mutation (login, logout, create, update, delete), create a **plain async function**.

### For a data-fetching hook (`useXxx`):

File: `src/services/<nameWithoutUse starting lowercase>.js`
(e.g., `useGetAllEpics` → `src/services/getAllEpics.js`)

```js
import { useEffect, useState } from "react";

export default function useGetAllEpics() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/epics`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        auth: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
```

> Note: return `{ data, loading, error }` — not just the data — so callers can show spinners and handle errors. This is an improvement over the existing services that only return null.

### For a mutation function:

```js
export default async function createProject(payload) {
  const API_URL = import.meta.env.VITE_API_URL;

  const response = await fetch(`${API_URL}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      auth: localStorage.getItem("token"),
    },
    body: JSON.stringify(payload),
  });

  return response.json();
}
```

## After creating the file

Tell the user:

- Full path of the created file.
- How to import and use it.
- If it's a hook: show a quick usage example inside a component.

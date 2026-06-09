# new-test

Crea un test para un servicio, hook o componente siguiendo los patrones del proyecto.

## Stack

- **Vitest** como test runner (`globals: true`)
- **@testing-library/react** para render de componentes
- **@testing-library/user-event** para interacciones (`userEvent.setup()`)
- **@testing-library/jest-dom** para matchers del DOM (disponible via `src/test/setup.js`)

## Setup global (`src/test/setup.js`)

- `react-i18next` está mockeado globalmente: `t` devuelve la clave tal cual (`t('key') === 'key'`), `i18n.language === 'es'`
- `localStorage` está mockeado con una implementación funcional que soporta `getItem`, `setItem`, `removeItem` y `clear`
- `window.matchMedia` está mockeado

## Patrones por tipo

### Servicio de mutación (ej: `changePassword.js`)

```js
import { describe, it, expect, vi, beforeEach } from "vitest";
import miServicio from "./miServicio";
import { apiFetch } from "../api/client";

vi.mock("../api/client");

beforeEach(() => vi.clearAllMocks());

describe("miServicio", () => {
  it("returns success on successful request", async () => {
    apiFetch.mockResolvedValueOnce({ message: "ok" });

    const result = await miServicio(args);

    expect(result).toEqual({ success: true });
    expect(apiFetch).toHaveBeenCalledWith("/endpoint", {
      method: "PATCH",
      body: JSON.stringify({ ... }),
    });
  });

  it("returns error on failed request", async () => {
    apiFetch.mockRejectedValueOnce(new Error("mensaje de error"));

    const result = await miServicio(args);

    expect(result).toEqual({ success: false, error: "mensaje de error" });
  });
});
```

### Hook de datos (`useAlgo.js`)

```js
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import useAlgo from "./useAlgo";
import { apiFetch } from "../api/client";

vi.mock("../api/client");

beforeEach(() => vi.clearAllMocks());

describe("useAlgo", () => {
  it("starts with loading true and no data", () => {
    apiFetch.mockReturnValue(new Promise(() => {})); // nunca resuelve

    const { result } = renderHook(() => useAlgo());

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it("sets data on success", async () => {
    apiFetch.mockResolvedValueOnce({ data: [...] });

    const { result } = renderHook(() => useAlgo());

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual([...]);
  });

  it("sets error on failure", async () => {
    apiFetch.mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useAlgo());

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe("Network error");
  });
});
```

### Componente sin dependencias externas

```jsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MiComponente from "./index";

describe("MiComponente", () => {
  it("renders correctly", () => {
    render(<MiComponente prop="valor" />);
    expect(screen.getByText("texto esperado")).toBeInTheDocument();
  });

  it("calls callback on interaction", async () => {
    const onAction = vi.fn();
    const user = userEvent.setup();
    render(<MiComponente onAction={onAction} />);

    await user.click(screen.getByRole("button", { name: "label" }));

    expect(onAction).toHaveBeenCalledWith(valorEsperado);
  });
});
```

### Vista con router y servicios mockeados

```jsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import MiVista from "./index";
import miServicio from "../../services/miServicio";

vi.mock("../../services/miServicio");

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => mockNavigate };
});

const renderVista = (props = {}) =>
  render(
    <MemoryRouter>
      <MiVista {...props} />
    </MemoryRouter>
  );

beforeEach(() => vi.clearAllMocks());
```

## Convenciones

- Archivos de test co-localizados: `MiComponente.test.jsx` junto a `index.jsx`
- `react-i18next` ya mockeado globalmente: las aserciones usan claves (`'login.submit'`), no el texto traducido
- Usar `userEvent.setup()` para interacciones, no `fireEvent`
- Usar `waitFor` para aserciones sobre estado asíncrono
- Siempre `vi.clearAllMocks()` en `beforeEach`
- El mock de `apiFetch` va en el módulo `"../api/client"` (ruta relativa al archivo de test)

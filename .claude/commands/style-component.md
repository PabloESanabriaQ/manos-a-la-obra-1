# style-component

Agrega o mejora los estilos SCSS de un componente o vista existente, respetando el sistema de diseño de la aplicación.

Componente/vista a estilizar: $ARGUMENTS

---

## Sistema de diseño

Antes de escribir cualquier estilo, interiorizate con estas reglas. **No inventes valores fuera de este sistema.**

### Colores

| Token                | Valor                      | Uso                                         |
| -------------------- | -------------------------- | ------------------------------------------- |
| `$color-primary`     | `#385752`                  | Textos, bordes, botones, íconos             |
| `$color-accent`      | `#f9bc60`                  | Subrayados decorativos, acentos, highlights |
| `$color-bg`          | `aliceblue`                | Fondo de vistas, botones secundarios        |
| `$color-nav-overlay` | `rgba(220, 235, 235, 0.9)` | Overlay del nav, hover de items             |
| `$color-error`       | `#b8454d`                  | Textos y fondos de error                    |
| `$color-error-bg`    | `#f8d7da`                  | Fondo suave de error                        |
| `$color-white`       | `white`                    | Fondos de pantallas de login/auth           |

> No usar variables SCSS reales (el proyecto no tiene un archivo de variables), escribir los valores hex directamente.

### Tipografía

- Fuente: `Roboto` (ya importada globalmente).
- Títulos principales: `font-size: 2–3rem; font-weight: 800`.
- Subtítulos / nav links: `font-size: 2rem; font-weight: 500`.
- Cuerpo / inputs: `font-size: medium` o `font-size: 24px`.
- Peso normal: `400`, énfasis: `700`, headings: `800`.
- Decoración de título: `text-decoration: underline 3px solid #f9bc60`.

### Layout

- Vistas a pantalla completa: `width: 100vw; height: 100vh`.
- Centrado: `display: flex; justify-content: center; align-items: center`.
- Columna centrada: agregar `flex-direction: column`.
- Contenedores con max-width: `max-width: 512px; margin: 0 auto`.
- Gap entre elementos: `gap: 10px` (items) o `gap: 20px` (secciones).

### Bordes y formas

- Borde primario: `border: 2px solid black` (elementos interactivos tipo input/button clásicos).
- Borde de sección: `border-bottom: 1px solid #385752`.
- Border-radius estándar: `5px`.
- Border-radius de card principal: `15% 0 15% 0` (patrón asimétrico del login, usar con moderación).

### Interacciones

- Hover de item de lista:
  ```scss
  &:hover {
    background-color: rgba(220, 235, 235, 0.9);
    border-radius: 5px;
    animation: grow 0.2s;
  }
  ```
- Hover de link de navegación:
  ```scss
  &:hover {
    text-decoration: underline 3px solid #f9bc60;
  }
  ```
- Transiciones suaves: `transition: all 0.3s` o `transition: 0.4s`.

### Estados especiales

#### Loading

```scss
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  font-size: 1.5rem;
  font-weight: 500;
  color: #385752;
}
```

#### Error (inline, dentro de una vista)

```scss
.error {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f8d7da;
  width: 100%;
  height: 100%;
  color: #b8454d;
  font-size: larger;
  text-align: center;
}
```

#### Toast de error (posición fija)

```scss
.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #b8454d;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  width: 200px;
  height: 50px;
  text-align: center;
  position: fixed;
  bottom: 20px;
  right: 20px;
}
```

#### Empty state

```scss
.emptyList {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 500;
  text-align: center;
  padding: 1rem;
  border-radius: 0.5rem;
  margin: 1rem;
  transition: all 0.3s;
}
```

---

## Qué hacer

1. **Leé el componente** (`index.jsx`) para entender qué clases CSS ya usa.
2. **Leé el archivo de estilos actual** (`styles.module.scss`) para ver qué ya existe.
3. **Identificá qué falta o qué está sin estilo** según lo que se pide.
4. **Escribí solo el SCSS necesario**, siguiendo el sistema de diseño de arriba.
5. No agregues propiedades que el componente no usa.
6. No rompas estilos existentes que ya funcionen.
7. Si el componente tiene estado `loading` o `error` y no tiene estilos para ellos, agregalos.

## Qué no hacer

- No uses colores, fuentes ni valores fuera del sistema de diseño documentado arriba.
- No uses variables CSS (`--var`) ni variables SCSS (`$var`) — el proyecto escribe los valores directamente.
- No uses `px` para font-size salvo que ya existan con `px` en el componente.
- No uses `!important`.
- No agregues animaciones complejas salvo que se pida explícitamente.

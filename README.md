# Manos a la Obra

Frontend de una aplicación de gestión de proyectos. Permite navegar proyectos, épicas, historias de usuario y tareas organizadas jerárquicamente.

## Qué hace

- Autenticación con cookies HttpOnly y renovación automática de token
- Navegación por la jerarquía: Proyectos → Épicas → Historias de Usuario → Tareas
- Vista de "Mis Historias" con todas las historias asignadas al usuario
- Configuración de idioma (español / inglés) y tema (claro / oscuro) que persisten entre sesiones
- Cambio de contraseña desde Settings

## Stack

- React 18 + Vite
- React Router DOM v6
- react-i18next para internacionalización
- SCSS Modules
- Vitest + React Testing Library

## Requisitos

- Node.js >= 20.10.0
- El backend [`be-manos-a-la-obra`](https://github.com/pabloesanabriaq/be-manos-a-la-obra) corriendo localmente en el puerto 3000

## Instalación

```bash
npm install
```

Copiar el archivo de variables de entorno y completarlo:

```bash
cp .env.example .env
```

```env
VITE_API_URL=http://localhost:3000/api
```

## Comandos

| Comando            | Descripción            |
| ------------------ | ---------------------- |
| `npm run dev`      | Servidor de desarrollo |
| `npm run build`    | Build de producción    |
| `npm run test`     | Tests en modo watch    |
| `npm run test:run` | Tests una sola vez     |
| `npm run lint`     | ESLint                 |
| `npm run format`   | Prettier               |

## Tests

Los tests usan Vitest + React Testing Library y están co-localizados con el código que testean (ej: `LoginView.test.jsx` junto a `index.jsx`).

```bash
# Correr todos los tests una vez
npm run test:run

# Modo watch (re-corre al guardar)
npm run test
```

Cubren servicios de mutación, hooks de datos GET, componentes con lógica interactiva y flujos de vista completos. Para agregar tests nuevos, ver el skill `/new-test` en `.claude/commands/`.

## Estilo y linting

El proyecto usa ESLint + Prettier con hooks de pre-commit via husky. Antes de cada commit se ejecutan automáticamente.

Para correrlos manualmente:

```bash
# Verificar y corregir problemas de ESLint
npm run lint

# Formatear todos los archivos
npm run format

# Solo verificar formato sin modificar
npm run format:check
```

### Convenciones de estilo

- **Componentes**: función nombrada con `export default`, archivo `index.jsx` dentro de su carpeta
- **Estilos**: SCSS Modules (`styles.module.scss`) co-localizados con el componente. Los colores usan variables CSS (`var(--color-*)`) definidas en `src/styles/theme.scss`
- **Servicios GET**: hooks que retornan `{ data, loading, error }`
- **Servicios de mutación**: funciones async que retornan `{ success, error? }`
- **Strings de UI**: siempre via `t('clave')` de react-i18next, nunca hardcodeados. Los archivos de traducción están en `src/locales/`
- **prop-types**: requeridos en todos los componentes

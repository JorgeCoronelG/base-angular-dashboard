# base-angular-dashboard

Base para dashboards con Angular 22, Angular Material y Tailwind CSS.

- Signals, `OnPush` y detección de cambios **zoneless**.
- Signal Forms (`@angular/forms/signals`).
- Layouts intercambiables (vertical/horizontal), modo claro/oscuro y temas.
- Docker para desarrollo y producción.

## Requisitos

- Node `^22.22.3`, `^24.15.0` o superior (o solo Docker).

## Desarrollo

```bash
npm ci
npm start          # http://localhost:4200
```

Con Docker:

```bash
docker compose --profile dev up --build    # http://localhost:4200
docker compose --profile prod up --build   # http://localhost:8080
```

## Scripts

| Comando | Descripción |
| --- | --- |
| `npm start` | Servidor de desarrollo |
| `npm run build` | Build de producción en `dist/base-angular-dashboard` |
| `npm test` | Tests unitarios (Vitest) |
| `npm run lint` | ESLint |
| `npm run format` | Formatea con Prettier |
| `npm run format:check` | Verifica el formato |

## Estructura

```
src/
├── @vex/   # Kit de UI y layout (componentes, servicios, estilos, tema Tailwind)
└── app/    # Aplicación: rutas, navegación, layouts y componentes propios
```

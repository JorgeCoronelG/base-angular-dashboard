# base-angular-dashboard

Base para dashboards con **Angular 22**, **Angular Material 3** y **Tailwind CSS 3**.

- Signals, `OnPush` y detección de cambios **zoneless** (sin `zone.js`).
- Signal Forms (`@angular/forms/signals`).
- Seis layouts intercambiables (vertical/horizontal), modo claro/oscuro, temas de color y radios de borde configurables en runtime.
- Docker para desarrollo y producción (nginx sin privilegios, cabeceras de seguridad y healthcheck).
- ESLint, Prettier, Vitest, CI y Dependabot listos.

> Estado: es una base de UI/layout. **Todavía no incluye** entornos, capa HTTP, autenticación ni features de ejemplo (ver [Pendiente](#pendiente)).

## Requisitos

- Node `^22.22.3`, `^24.15.0` o superior, o solo Docker.

## Empezar

```bash
npm ci
npm start                  # http://localhost:4200
```

Con Docker:

```bash
docker compose --profile dev  up --build   # http://localhost:4200 (hot reload)
docker compose --profile prod up --build   # http://localhost:8080 (nginx)
```

## Scripts

| Comando                | Descripción                                          |
| ---------------------- | ---------------------------------------------------- |
| `npm start`            | Servidor de desarrollo                               |
| `npm run build`        | Build de producción en `dist/base-angular-dashboard` |
| `npm test`             | Tests unitarios (Vitest, `ng test`)                  |
| `npm run lint`         | ESLint (`angular-eslint`)                            |
| `npm run format`       | Formatea todo con Prettier                           |
| `npm run format:check` | Verifica el formato (lo usa CI)                      |

## Estructura

```
src/
├── @ui/            # Kit de UI y layout, independiente de la aplicación
│   ├── components/ #   sidebar, popover, scrollbar, progress bar, breadcrumbs, page-layout...
│   ├── config/     #   AppConfigService y las configuraciones de layout (app-configs.ts)
│   ├── services/   #   AppLayoutService (estado del layout), plataforma, splash
│   ├── styles/     #   Sass: tema Material 3, variables CSS, layouts, overrides de Material
│   ├── tailwind/   #   plugin de Tailwind que genera los temas como variables CSS
│   └── app.provider.ts  # provideApp(): registra config y temas
└── app/            # La aplicación
    ├── core/       #   navegación, iconos, luxon
    ├── layouts/    #   layout, toolbar, sidenav, config-panel, footer...
    ├── app.config.ts
    └── app.routes.ts
```

El alias `@ui/*` apunta a `src/@ui/*`. El prefijo de selectores es `app-`.

## Cómo agregar una página

1. Crea el componente (standalone, `OnPush`) en `src/app/<feature>/`.
2. Regístralo con carga lazy dentro de los `children` del layout en `src/app/app.routes.ts`:

   ```ts
   {
     path: "reports",
     loadComponent: () =>
       import("./reports/reports.component").then((m) => m.ReportsComponent),
     data: { toolbarShadowEnabled: true },
   }
   ```

3. Agrégala al menú en `src/app/core/navigation/navigation-loader.service.ts`.

Los `data` de una ruta pueden controlar el layout: `scrollDisabled`, `toolbarShadowEnabled` y `footerVisible` (ver `AppRouteData`).

## Tema y estilos

Los colores viven en **un solo lugar**: el objeto `themes` de [tailwind.config.ts](tailwind.config.ts).

```
tailwind.config.ts (themes)
        │  plugin @ui/tailwind/plugins/themes.ts
        ▼
variables CSS  --app-color-primary-600, --app-foreground-text, --app-background-card...
        │  @ui/styles/_themes.scss
        ▼
tokens de Material 3  --mat-sys-primary, --mat-sys-surface...   →  componentes Material
```

Cambiar de tema (`.app-theme-*`) o de esquema (`.light`/`.dark`) en runtime solo intercambia variables CSS; no se regenera nada.

- **Agregar un tema:** añade una entrada en `themes` de `tailwind.config.ts` y regístrala en `availableThemes` dentro de `src/app/app.config.ts`.
- **Cambiar la marca:** título en `src/@ui/config/app-configs.ts`, logo en `src/assets/img/logo/logo.svg`, favicon en `src/favicon.svg`, título en `src/index.html`.
- **Color de botones:** Material 3 solo conoce `primary`. El proyecto mantiene `color="accent"` (terciario) y `color="warn"` (error) para botones y `mat-icon` (ver `_button.scss` y `_icon.scss`); otros componentes usan siempre el color primario.
- **Overrides de componentes Material:** declara los tokens en `body`, no en `:root`. Las variables CSS que referencian a otras se resuelven donde se declaran, y en `:root` quedarían congeladas con los colores base.
- Utilidades de Tailwind en el HTML; en SCSS de componente se puede usar `@apply` y `theme()`.

## Convenciones

- Componentes standalone, `ChangeDetectionStrategy.OnPush`, `inject()` en lugar de constructor.
- API de signals: `input()`, `output()`, `model()`, `viewChild()`, `computed()`, `effect()`. Estado local con `signal()`; `toSignal()` para observables.
- **Zoneless:** no hay `zone.js`. Cualquier estado que cambie fuera de un evento del template (timers, callbacks de librerías) debe ser un signal.
- Servicios con `@Service()` (`@angular/core`).
- Formularios con Signal Forms (`form()` + `[formField]`).
- Control flow `@if` / `@for` / `@switch`; no `*ngIf`/`*ngFor`.
- Sin `any` y sin elementos no nativos clicables: usa `<button>` o `<a>`. Ambas reglas son **error** en ESLint.
- Sass con `@use` (nunca `@import`).
- Prettier: comillas dobles, comas finales (excepto SCSS, donde rompen los mapas de Sass).

## Docker y despliegue

La imagen de producción usa `nginxinc/nginx-unprivileged`: corre como usuario no-root en el puerto **8080**, expone `/healthz`, envía cabeceras de seguridad (CSP, `X-Frame-Options`, etc.) y sirve el `index.html` sin caché y los archivos con hash como `immutable`.

El servicio `prod` de `docker-compose.yml` además usa sistema de archivos de solo lectura, `cap_drop: ALL` y `no-new-privileges`.

> Cuando la app llame a una API, agrega su origen a `connect-src` en [nginx/security-headers.inc](nginx/security-headers.inc); de lo contrario la CSP bloqueará las peticiones.

## Calidad

- **CI** ([.github/workflows/ci.yml](.github/workflows/ci.yml)): formato, lint, tests, build y prueba de humo de la imagen Docker.
- **Dependabot** ([.github/dependabot.yml](.github/dependabot.yml)): agrupa las dependencias de Angular, lint/formato, tests y Tailwind. Ignora las versiones mayores de Angular (requieren `ng update`) y de Tailwind (migración planificada).

## Crear un proyecto nuevo desde esta base

1. Clona o usa el repositorio como plantilla.
2. Cambia el nombre en `package.json`, la clave del proyecto en `angular.json` y la ruta `dist/...` en el `Dockerfile`.
3. Actualiza la marca (ver [Tema y estilos](#tema-y-estilos)) y quita los datos de ejemplo: usuario, notificaciones y menú de usuario en `src/app/layouts/components/`.
4. Elimina de `src/@ui/components/` lo que no uses.

## Pendiente

- Entornos (`apiUrl`), capa HTTP con interceptores y autenticación.
- Una feature de ejemplo con carga lazy y datos reales.
- Migración a Tailwind CSS 4.

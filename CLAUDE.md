# CLAUDE.md

Base de dashboard con Angular 22, Angular Material 3 y Tailwind CSS 3. Lee el [README](README.md) para la visión general; aquí están las reglas que hay que respetar al modificar el código.

## Comandos

```bash
npm start              # ng serve
npm run build          # build de producción
npm test               # Vitest vía ng test (usa -- --watch=false en CI)
npm run lint           # ESLint; debe terminar sin errores ni warnings
npm run format         # Prettier; format:check lo verifica
```

Antes de dar algo por terminado: `npm run format:check && npm run lint && npm test -- --watch=false && npm run build`. El build no debe emitir warnings.

Node no siempre está instalado en la máquina: si falta, ejecuta los comandos dentro de `node:24` con Docker montando el proyecto.

## Estructura

- `src/@ui/` — kit de UI/layout (alias `@ui/*`). No debe importar nada de `src/app/`.
- `src/app/` — la aplicación: rutas, navegación, layouts.
- El prefijo de selectores es `app-` (`<app-toolbar>`), las clases CSS/variables usan `app-` (`.app-layout-poseidon`, `--app-sidenav-width`) y los símbolos `App*` (`AppConfigService`, `provideApp`).
- Estado global del layout: `AppLayoutService` (`@ui/services`). Configuración y tema en runtime: `AppConfigService` (`@ui/config`). Ambos exponen **signals de solo lectura** y métodos para mutarlos.

## Reglas de código

- Componentes standalone (es el valor por defecto; no escribas `standalone: true`) con `changeDetection: ChangeDetectionStrategy.OnPush`.
- `inject()` en lugar de inyección por constructor. Servicios con `@Service()` de `@angular/core`.
- Signals: `input()`, `output()`, `model()`, `viewChild()`, `computed()`, `effect()`. **No** uses `@Input`, `@Output`, `@ViewChild`, `@HostListener` ni `@HostBinding`; los bindings del host van en `host: {}`.
- Estado derivado de observables: `toSignal()`. Evita `| async` en templates nuevos.
- **La app es zoneless** (no existe `zone.js`). Un valor que cambie fuera de un evento del template (timers, callbacks, promesas) tiene que ser un `signal` o la vista no se actualizará. No uses `ChangeDetectorRef.markForCheck()` como parche.
- Formularios nuevos: Signal Forms (`form()` de `@angular/forms/signals` y `[formField]`), no `FormGroup`/`ngModel`.
- Templates: `@if` / `@for` (con `track`) / `@switch` / `@let`. Nada de `*ngIf`, `*ngFor` ni `ngClass`/`ngStyle`; usa `[class]`/`[style]`.
- Sin `any` (usa `unknown` o genéricos): es error de ESLint.
- Los elementos interactivos son `<button type="button">` o `<a>`. No pongas `(click)` en un `div`/`span`: es error de ESLint (accesibilidad). Un fondo que solo captura clics lleva `role="presentation"`.
- Nuevas páginas: carga lazy (`loadComponent`) dentro de los `children` del layout en `app.routes.ts` y entrada en `navigation-loader.service.ts`.
- Providers de inicialización: `provideEnvironmentInitializer()`. `ENVIRONMENT_INITIALIZER` está deprecado.
- Formato lo decide Prettier (`.prettierrc.json`); no lo discutas ni lo formatees a mano. No edites archivos generados.

## Estilos

- Sass siempre con `@use` (o `meta.load-css`), **nunca `@import`**.
- Los colores salen de `themes` en `tailwind.config.ts` → variables CSS (plugin `@ui/tailwind/plugins/themes.ts`) → tokens `--mat-sys-*` en `@ui/styles/_themes.scss`. No hardcodees colores en componentes: usa las clases de Tailwind (`bg-primary-600`, `text-default`) o las variables `--app-*`.
- Angular Material 3: solo `primary` viene de serie. `color="accent"` y `color="warn"` funcionan únicamente en botones y `mat-icon` (`partials/plugins/@angular/material/_button.scss` y `_icon.scss`).
- Overrides de tokens de Material (`mat.*-overrides`) van dentro de `body`, no de `:root`: las variables que referencian a otras se resuelven donde se declaran.
- En SCSS de componente se puede usar `@apply` y `theme()`, pero eso es lo que hace costosa la futura migración a Tailwind 4; prefiere clases en el HTML en código nuevo.
- Los estilos globales y de Material viven en `@ui/styles`; los de un componente, junto al componente.

## Verificar cambios de UI

Los tests no cubren la UI. Para cambios visuales, construye la imagen de producción y recórrela con un navegador (Playwright en Docker funcionó bien): sidenav, panel de configuración, los seis layouts, modo oscuro, un tema alternativo y los overlays (menú, popover, diálogo). La consola del navegador debe quedar sin errores (ojo con violaciones de CSP).

## Docker y seguridad

- La imagen `prod` es `nginx-unprivileged` en el puerto 8080; la CSP está en `nginx/security-headers.inc` y se repite en cada `location`. Al llamar a una API hay que añadir su origen a `connect-src`.
- El build de producción tiene `inlineCritical: false` a propósito: el CSS crítico inline necesita un `onload` inline que la CSP bloquea.

## Fuera de alcance (por ahora)

Aún no hay entornos, capa HTTP, autenticación ni features de ejemplo, y Tailwind sigue en la versión 3. No los agregues sin que se pida; y no subas Tailwind a 4 ni Angular a una mayor nueva sin una migración planificada (Dependabot está configurado para ignorarlas).

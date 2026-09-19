import {
  ApplicationConfig,
  provideZonelessChangeDetection,
} from "@angular/core";
import { appRoutes } from "./app.routes";
import {
  provideHttpClient,
  withInterceptorsFromDi,
  withXhr,
} from "@angular/common/http";
import { provideRouter, withInMemoryScrolling } from "@angular/router";
import { provideNativeDateAdapter } from "@angular/material/core";
import { provideIcons } from "./core/icons/icons.provider";
import { provideLuxon } from "./core/luxon/luxon.provider";
import { provideApp } from "@ui/app.provider";
import { provideNavigation } from "./core/navigation/navigation.provider";
import { appConfigs } from "@ui/config/app-configs";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideNativeDateAdapter(),
    provideRouter(
      appRoutes,
      // TODO: Add preloading withPreloading(),
      withInMemoryScrolling({
        anchorScrolling: "enabled",
        scrollPositionRestoration: "enabled",
      }),
    ),
    provideHttpClient(withXhr(), withInterceptorsFromDi()),

    provideApp({
      /**
       * The config that will be used by default.
       * This can be changed at runtime via the config panel or using the AppConfigService.
       */
      config: appConfigs.poseidon,
      /**
       * Only themes that are available in the config in tailwind.config.ts should be listed here.
       * Any theme not listed here will not be available in the config panel.
       */
      availableThemes: [
        {
          name: "Default",
          className: "app-theme-default",
        },
        {
          name: "Teal",
          className: "app-theme-teal",
        },
        {
          name: "Green",
          className: "app-theme-green",
        },
        {
          name: "Purple",
          className: "app-theme-purple",
        },
        {
          name: "Red",
          className: "app-theme-red",
        },
        {
          name: "Orange",
          className: "app-theme-orange",
        },
      ],
    }),
    provideNavigation(),
    provideIcons(),
    provideLuxon(),
  ],
};

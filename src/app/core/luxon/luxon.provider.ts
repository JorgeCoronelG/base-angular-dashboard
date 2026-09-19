import {
  EnvironmentProviders,
  inject,
  provideEnvironmentInitializer,
} from "@angular/core";
import { LuxonService } from "./luxon.service";

export function provideLuxon(): EnvironmentProviders {
  return provideEnvironmentInitializer(() => {
    inject(LuxonService);
  });
}

import { LOCALE_ID, inject, Service } from "@angular/core";
import { Settings } from "luxon";

@Service()
export class LuxonService {
  private localeId = inject(LOCALE_ID);

  constructor() {
    Settings.defaultLocale = this.localeId;
  }
}

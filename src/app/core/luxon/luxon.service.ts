import { Injectable, LOCALE_ID, inject } from "@angular/core";
import { Settings } from "luxon";

@Injectable({
  providedIn: "root",
})
export class LuxonService {
  private localeId = inject(LOCALE_ID);

  constructor() {
    Settings.defaultLocale = this.localeId;
  }
}

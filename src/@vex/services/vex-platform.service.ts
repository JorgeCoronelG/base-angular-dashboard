import { Injectable, RendererFactory2, DOCUMENT, inject } from "@angular/core";
import { Platform } from "@angular/cdk/platform";

@Injectable({
  providedIn: "root",
})
export class VexPlatformService {
  private document = inject<Document>(DOCUMENT);
  private readonly rendererFactory2 = inject(RendererFactory2);
  private readonly platform = inject(Platform);

  constructor() {
    const renderer = this.rendererFactory2.createRenderer(null, null);

    if (this.platform.BLINK) {
      renderer.addClass(this.document.body, "is-blink");
    }
  }
}

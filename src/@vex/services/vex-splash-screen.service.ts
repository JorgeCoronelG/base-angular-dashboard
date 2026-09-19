import { DOCUMENT, inject, Service } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";

import { filter, take } from "rxjs/operators";
import { animate, AnimationBuilder, style } from "@angular/animations";

@Service()
export class VexSplashScreenService {
  private router = inject(Router);
  private document = inject<Document>(DOCUMENT);
  private animationBuilder = inject(AnimationBuilder);

  splashScreenElem?: HTMLElement;

  constructor() {
    this.splashScreenElem =
      this.document.body.querySelector("#vex-splash-screen") ?? undefined;

    if (this.splashScreenElem) {
      this.router.events
        .pipe(
          filter((event) => event instanceof NavigationEnd),
          take(1),
        )
        .subscribe(() => this.hide());
    }
  }

  hide() {
    const player = this.animationBuilder
      .build([
        style({
          opacity: 1,
        }),
        animate(
          "400ms cubic-bezier(0.25, 0.8, 0.25, 1)",
          style({
            opacity: 0,
          }),
        ),
      ])
      .create(this.splashScreenElem);

    player.onDone(() => this.splashScreenElem?.remove());
    player.play();
  }
}

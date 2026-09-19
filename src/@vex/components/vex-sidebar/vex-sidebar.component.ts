import {
  Component,
  DOCUMENT,
  ChangeDetectionStrategy,
  DestroyRef,
  computed,
  effect,
  inject,
  input,
  model,
} from "@angular/core";

@Component({
  selector: "vex-sidebar",
  templateUrl: "./vex-sidebar.component.html",
  styleUrls: ["./vex-sidebar.component.scss"],
  host: {
    class: "vex-sidebar",
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VexSidebarComponent {
  private document = inject<Document>(DOCUMENT);

  readonly position = input<"left" | "right">("left");
  readonly invisibleBackdrop = input<boolean>(false);
  readonly opened = model<boolean>(false);

  readonly positionLeft = computed(() => this.position() === "left");
  readonly positionRight = computed(() => this.position() === "right");

  constructor() {
    effect(() =>
      this.opened() ? this.enableScrollblock() : this.disableScrollblock(),
    );

    inject(DestroyRef).onDestroy(() => this.disableScrollblock());
  }

  enableScrollblock() {
    this.document.body.classList.add("vex-scrollblock");
  }

  disableScrollblock() {
    this.document.body.classList.remove("vex-scrollblock");
  }

  open() {
    this.opened.set(true);
  }

  close() {
    this.opened.set(false);
  }
}

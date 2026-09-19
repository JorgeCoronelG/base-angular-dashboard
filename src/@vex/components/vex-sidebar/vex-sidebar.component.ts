import {
  Component,
  Input,
  OnDestroy,
  DOCUMENT,
  ChangeDetectionStrategy,
  inject,
  input,
} from "@angular/core";

@Component({
  selector: "vex-sidebar",
  templateUrl: "./vex-sidebar.component.html",
  styleUrls: ["./vex-sidebar.component.scss"],
  host: {
    class: "vex-sidebar",
  },
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: true,
})
export class VexSidebarComponent implements OnDestroy {
  private document = inject<Document>(DOCUMENT);

  readonly position = input<"left" | "right">("left");
  readonly invisibleBackdrop = input<boolean>(false);

  private _opened: boolean = false;

  get opened() {
    return this._opened;
  }

  // TODO: Skipped for migration because:
  //  Accessor inputs cannot be migrated as they are too complex.
  @Input() set opened(opened: boolean) {
    this._opened = opened;
    opened ? this.enableScrollblock() : this.disableScrollblock();
  }

  get positionLeft() {
    return this.position() === "left";
  }

  get positionRight() {
    return this.position() === "right";
  }

  enableScrollblock() {
    if (!this.document.body.classList.contains("vex-scrollblock")) {
      this.document.body.classList.add("vex-scrollblock");
    }
  }

  disableScrollblock() {
    if (this.document.body.classList.contains("vex-scrollblock")) {
      this.document.body.classList.remove("vex-scrollblock");
    }
  }

  open() {
    this.opened = true;
  }

  close() {
    this.opened = false;
  }

  ngOnDestroy(): void {}
}

import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input,
} from "@angular/core";

@Component({
  selector: "vex-page-layout",
  template: "<ng-content />",
  host: {
    class: "vex-page-layout",
    "[class.vex-page-layout-card]": "mode() === 'card'",
    "[class.vex-page-layout-simple]": "mode() === 'simple'",
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./vex-page-layout.component.scss"],
})
export class VexPageLayoutComponent {
  readonly mode = input<"card" | "simple">("simple");
}

import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "vex-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  readonly year = new Date().getFullYear();
}

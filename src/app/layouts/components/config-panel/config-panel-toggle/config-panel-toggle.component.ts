import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  output,
} from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "vex-config-panel-toggle",
  templateUrl: "./config-panel-toggle.component.html",
  styleUrls: ["./config-panel-toggle.component.scss"],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [MatButtonModule, MatIconModule],
})
export class ConfigPanelToggleComponent implements OnInit {
  readonly openConfig = output();

  constructor() {}

  ngOnInit() {}
}

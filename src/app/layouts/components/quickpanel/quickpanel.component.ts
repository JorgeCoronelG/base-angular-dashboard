import { Component, ChangeDetectionStrategy } from "@angular/core";
import { DateTime } from "luxon";
import { MatDividerModule } from "@angular/material/divider";

@Component({
  selector: "vex-quickpanel",
  templateUrl: "./quickpanel.component.html",
  styleUrls: ["./quickpanel.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatDividerModule],
})
export class QuickpanelComponent {
  date = DateTime.local().toFormat("DD");
  dayName = DateTime.local().toFormat("EEEE");
}

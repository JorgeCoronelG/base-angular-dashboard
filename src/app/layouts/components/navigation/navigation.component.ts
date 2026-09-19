import { Component, ChangeDetectionStrategy, inject } from "@angular/core";
import { NavigationService } from "../../../core/navigation/navigation.service";
import { NavigationItemComponent } from "./navigation-item/navigation-item.component";

@Component({
  selector: "vex-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NavigationItemComponent],
})
export class NavigationComponent {
  readonly items = inject(NavigationService).items;
}

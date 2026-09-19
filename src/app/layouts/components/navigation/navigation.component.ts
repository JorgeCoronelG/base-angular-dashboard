import { Component, ChangeDetectionStrategy, inject } from "@angular/core";
import { NavigationService } from "../../../core/navigation/navigation.service";
import { NavigationItemComponent } from "./navigation-item/navigation-item.component";
import { AsyncPipe } from "@angular/common";
import { Observable } from "rxjs";
import { NavigationItem } from "../../../core/navigation/navigation-item.interface";

@Component({
  selector: "vex-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NavigationItemComponent, AsyncPipe],
})
export class NavigationComponent {
  private navigationService = inject(NavigationService);

  items$: Observable<NavigationItem[]> = this.navigationService.items$;
}

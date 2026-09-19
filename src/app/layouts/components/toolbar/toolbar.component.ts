import {
  Component,
  inject,
  ChangeDetectionStrategy,
  computed,
} from "@angular/core";
import { VexLayoutService } from "@vex/services/vex-layout.service";
import { VexConfigService } from "@vex/config/vex-config.service";
import { NavigationService } from "../../../core/navigation/navigation.service";
import { VexPopoverService } from "@vex/components/vex-popover/vex-popover.service";
import { NavigationComponent } from "../navigation/navigation.component";
import { ToolbarUserComponent } from "./toolbar-user/toolbar-user.component";
import { ToolbarNotificationsComponent } from "./toolbar-notifications/toolbar-notifications.component";
import { NavigationItemComponent } from "../navigation/navigation-item/navigation-item.component";
import { MatMenuModule } from "@angular/material/menu";
import { RouterLink } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { routeDataSignal } from "@vex/utils/route-data-signal";

@Component({
  selector: "vex-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.shadow-b]": "showShadow()",
  },
  imports: [
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatMenuModule,
    NavigationItemComponent,
    ToolbarNotificationsComponent,
    ToolbarUserComponent,
    NavigationComponent,
  ],
})
export class ToolbarComponent {
  private readonly layoutService = inject(VexLayoutService);
  private readonly configService = inject(VexConfigService);
  private readonly navigationService = inject(NavigationService);
  private readonly popoverService = inject(VexPopoverService);

  readonly showShadow = routeDataSignal(
    (data) => data.toolbarShadowEnabled ?? false,
  );

  readonly navigationItems = this.navigationService.items;

  private readonly config = this.configService.config;
  readonly isHorizontalLayout = computed(
    () => this.config().layout === "horizontal",
  );
  readonly isVerticalLayout = computed(
    () => this.config().layout === "vertical",
  );
  readonly isNavbarInToolbar = computed(
    () => this.config().navbar.position === "in-toolbar",
  );
  readonly isNavbarBelowToolbar = computed(
    () => this.config().navbar.position === "below-toolbar",
  );
  readonly userVisible = computed(() => this.config().toolbar.user.visible);
  readonly title = computed(() => this.config().sidenav.title);

  readonly isDesktop = this.layoutService.isDesktop;

  openQuickpanel(): void {
    this.layoutService.openQuickpanel();
  }

  openSidenav(): void {
    this.layoutService.openSidenav();
  }

  openSearch(): void {
    this.layoutService.openSearch();
  }
}

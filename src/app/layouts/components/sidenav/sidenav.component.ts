import {
  Component,
  ChangeDetectionStrategy,
  computed,
  inject,
  input,
  signal,
} from "@angular/core";
import { NavigationService } from "../../../core/navigation/navigation.service";
import { AppLayoutService } from "@ui/services/app-layout.service";
import { AppConfigService } from "@ui/config/app-config.service";
import { NavigationItem } from "../../../core/navigation/navigation-item.interface";
import { AppPopoverService } from "@ui/components/app-popover/app-popover.service";
import { SidenavUserMenuComponent } from "./sidenav-user-menu/sidenav-user-menu.component";
import { SidenavItemComponent } from "./sidenav-item/sidenav-item.component";
import { AppScrollbarComponent } from "@ui/components/app-scrollbar/app-scrollbar.component";
import { MatRippleModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    AppScrollbarComponent,
    SidenavItemComponent,
  ],
})
export class SidenavComponent {
  private navigationService = inject(NavigationService);
  private layoutService = inject(AppLayoutService);
  private configService = inject(AppConfigService);
  private readonly popoverService = inject(AppPopoverService);

  readonly collapsed = input<boolean>(false);
  readonly collapsedOpen = this.layoutService.sidenavCollapsedOpen;
  readonly title = computed(() => this.configService.config().sidenav.title);
  readonly imageUrl = computed(
    () => this.configService.config().sidenav.imageUrl,
  );
  readonly showCollapsePin = computed(
    () => this.configService.config().sidenav.showCollapsePin,
  );
  readonly userVisible = computed(
    () => this.configService.config().sidenav.user.visible,
  );

  readonly userMenuOpen = signal(false);

  readonly items = this.navigationService.items;

  collapseOpenSidenav() {
    this.layoutService.collapseOpenSidenav();
  }

  collapseCloseSidenav() {
    this.layoutService.collapseCloseSidenav();
  }

  toggleCollapse() {
    if (this.collapsed()) {
      this.layoutService.expandSidenav();
    } else {
      this.layoutService.collapseSidenav();
    }
  }

  trackByRoute(item: NavigationItem): string {
    if (item.type === "link") {
      return typeof item.route === "string" ? item.route : item.label;
    }

    return item.label;
  }

  openProfileMenu(origin: HTMLElement): void {
    const popoverRef = this.popoverService.open({
      content: SidenavUserMenuComponent,
      origin,
      offsetY: -8,
      width: origin.clientWidth,
      position: [
        {
          originX: "center",
          originY: "top",
          overlayX: "center",
          overlayY: "bottom",
        },
      ],
    });

    this.userMenuOpen.set(true);
    popoverRef.afterClosed$.subscribe(() => this.userMenuOpen.set(false));
  }
}

import {
  Component,
  ChangeDetectionStrategy,
  computed,
  inject,
  input,
  signal,
} from "@angular/core";
import { NavigationService } from "../../../core/navigation/navigation.service";
import { VexLayoutService } from "@vex/services/vex-layout.service";
import { VexConfigService } from "@vex/config/vex-config.service";
import { NavigationItem } from "../../../core/navigation/navigation-item.interface";
import { VexPopoverService } from "@vex/components/vex-popover/vex-popover.service";
import { SidenavUserMenuComponent } from "./sidenav-user-menu/sidenav-user-menu.component";
import { MatDialog } from "@angular/material/dialog";
import { SearchModalComponent } from "./search-modal/search-modal.component";
import { SidenavItemComponent } from "./sidenav-item/sidenav-item.component";
import { VexScrollbarComponent } from "@vex/components/vex-scrollbar/vex-scrollbar.component";
import { MatRippleModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "vex-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    VexScrollbarComponent,
    SidenavItemComponent,
  ],
})
export class SidenavComponent {
  private navigationService = inject(NavigationService);
  private layoutService = inject(VexLayoutService);
  private configService = inject(VexConfigService);
  private readonly popoverService = inject(VexPopoverService);
  private readonly dialog = inject(MatDialog);

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
  readonly searchVisible = computed(
    () => this.configService.config().sidenav.search.visible,
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
    this.collapsed()
      ? this.layoutService.expandSidenav()
      : this.layoutService.collapseSidenav();
  }

  trackByRoute(item: NavigationItem): string {
    if (item.type === "link") {
      return typeof item.route === "string" ? item.route : item.label;
    }

    return item.label;
  }

  openProfileMenu(origin: HTMLDivElement): void {
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

  openSearch(): void {
    this.dialog.open(SearchModalComponent, {
      panelClass: "vex-dialog-glossy",
      width: "100%",
      maxWidth: "600px",
    });
  }
}

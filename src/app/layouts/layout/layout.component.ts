import {
  Component,
  ChangeDetectionStrategy,
  computed,
  inject,
} from "@angular/core";
import { VexLayoutService } from "@vex/services/vex-layout.service";
import { RouterOutlet } from "@angular/router";
import { VexConfigService } from "@vex/config/vex-config.service";
import { VexSidebarComponent } from "@vex/components/vex-sidebar/vex-sidebar.component";

import { SidenavComponent } from "../components/sidenav/sidenav.component";
import { ToolbarComponent } from "../components/toolbar/toolbar.component";
import { FooterComponent } from "../components/footer/footer.component";
import { QuickpanelComponent } from "../components/quickpanel/quickpanel.component";
import { ConfigPanelToggleComponent } from "../components/config-panel/config-panel-toggle/config-panel-toggle.component";
import { ConfigPanelComponent } from "../components/config-panel/config-panel.component";
import { MatDialogModule } from "@angular/material/dialog";
import { BaseLayoutComponent } from "../base-layout/base-layout.component";
import { MatDrawerMode, MatSidenavModule } from "@angular/material/sidenav";
import { SearchComponent } from "../components/toolbar/search/search.component";
import { VexProgressBarComponent } from "@vex/components/vex-progress-bar/vex-progress-bar.component";

@Component({
  selector: "vex-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    BaseLayoutComponent,
    SidenavComponent,
    ToolbarComponent,
    FooterComponent,
    QuickpanelComponent,
    ConfigPanelToggleComponent,
    VexSidebarComponent,
    ConfigPanelComponent,
    MatDialogModule,
    MatSidenavModule,
    RouterOutlet,
    SearchComponent,
    VexProgressBarComponent,
  ],
})
export class LayoutComponent {
  private readonly layoutService = inject(VexLayoutService);
  private readonly configService = inject(VexConfigService);

  readonly config = this.configService.config;
  readonly sidenavCollapsed = this.layoutService.sidenavCollapsed;
  readonly sidenavDisableClose = this.layoutService.isDesktop;
  readonly sidenavFixedInViewport = computed(
    () => !this.layoutService.isDesktop(),
  );
  readonly sidenavMode = computed<MatDrawerMode>(() =>
    !this.layoutService.isDesktop() || this.config().layout === "vertical"
      ? "over"
      : "side",
  );
  readonly sidenavOpen = this.layoutService.sidenavOpen;
  readonly configPanelOpen = this.layoutService.configPanelOpen;
  readonly quickpanelOpen = this.layoutService.quickpanelOpen;

  onSidenavClosed(): void {
    this.layoutService.closeSidenav();
  }

  onConfigPanelChange(opened: boolean): void {
    opened
      ? this.layoutService.openConfigpanel()
      : this.layoutService.closeConfigpanel();
  }

  onQuickpanelClosed(): void {
    this.layoutService.closeQuickpanel();
  }
}

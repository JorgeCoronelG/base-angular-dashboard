import { Component, ChangeDetectionStrategy, inject } from "@angular/core";
import { AppPopoverRef } from "@ui/components/app-popover/app-popover-ref";
import { MatRippleModule } from "@angular/material/core";
import { RouterLink } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-sidenav-user-menu",
  templateUrl: "./sidenav-user-menu.component.html",
  styleUrls: ["./sidenav-user-menu.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatRippleModule, RouterLink, MatIconModule],
})
export class SidenavUserMenuComponent {
  private readonly popoverRef = inject(AppPopoverRef);

  close(): void {
    /** Wait for animation to complete and then close */
    setTimeout(() => this.popoverRef.close(), 250);
  }
}

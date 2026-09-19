import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
} from "@angular/core";
import { VexPopoverService } from "@vex/components/vex-popover/vex-popover.service";
import { ToolbarNotificationsDropdownComponent } from "./toolbar-notifications-dropdown/toolbar-notifications-dropdown.component";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "vex-toolbar-notifications",
  templateUrl: "./toolbar-notifications.component.html",
  styleUrls: ["./toolbar-notifications.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule, MatIconModule],
})
export class ToolbarNotificationsComponent {
  private popover = inject(VexPopoverService);

  readonly originRef = viewChild("originRef", { read: ElementRef });

  readonly dropdownOpen = signal(false);

  showPopover() {
    this.dropdownOpen.set(true);

    const originRef = this.originRef();
    if (!originRef) {
      throw new Error("originRef undefined!");
    }

    const popoverRef = this.popover.open({
      content: ToolbarNotificationsDropdownComponent,
      origin: originRef,
      offsetY: 12,
      position: [
        {
          originX: "center",
          originY: "top",
          overlayX: "center",
          overlayY: "bottom",
        },
        {
          originX: "end",
          originY: "bottom",
          overlayX: "end",
          overlayY: "top",
        },
      ],
    });

    popoverRef.afterClosed$.subscribe(() => {
      this.dropdownOpen.set(false);
    });
  }
}

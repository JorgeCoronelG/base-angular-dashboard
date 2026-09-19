import {
  Component,
  OnInit,
  TemplateRef,
  ChangeDetectionStrategy,
  inject,
} from "@angular/core";
import { VexPopoverContent, VexPopoverRef } from "./vex-popover-ref";
import { NgComponentOutlet, NgTemplateOutlet } from "@angular/common";

@Component({
  selector: "vex-popover",
  templateUrl: "./vex-popover.component.html",
  styleUrls: ["./vex-popover.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, NgComponentOutlet],
})
export class VexPopoverComponent implements OnInit {
  private popoverRef = inject(VexPopoverRef);

  renderMethod: "template" | "component" | "text" = "component";
  content: VexPopoverContent;
  context: any;

  ngOnInit() {
    this.content = this.popoverRef.content;

    if (typeof this.content === "string") {
      this.renderMethod = "text";
    }

    if (this.content instanceof TemplateRef) {
      this.renderMethod = "template";
      this.context = {
        close: this.popoverRef.close.bind(this.popoverRef),
      };
    }
  }
}

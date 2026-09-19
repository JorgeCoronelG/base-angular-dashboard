import {
  Component,
  OnInit,
  TemplateRef,
  ChangeDetectionStrategy,
  inject,
} from "@angular/core";
import { AppPopoverContent, AppPopoverRef } from "./app-popover-ref";
import { NgComponentOutlet, NgTemplateOutlet } from "@angular/common";

@Component({
  selector: "app-popover",
  templateUrl: "./app-popover.component.html",
  styleUrls: ["./app-popover.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, NgComponentOutlet],
})
export class AppPopoverComponent implements OnInit {
  private popoverRef = inject(AppPopoverRef);

  renderMethod: "template" | "component" | "text" = "component";
  content: AppPopoverContent;
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

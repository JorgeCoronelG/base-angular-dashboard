import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  signal,
  viewChild,
} from "@angular/core";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "vex-toolbar-search",
  templateUrl: "./toolbar-search.component.html",
  styleUrls: ["./toolbar-search.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule],
})
export class ToolbarSearchComponent {
  readonly isOpen = signal(false);

  readonly input = viewChild.required<ElementRef<HTMLInputElement>>("input");

  open() {
    this.isOpen.set(true);

    setTimeout(() => this.input().nativeElement.focus(), 100);
  }

  close() {
    this.isOpen.set(false);
  }
}

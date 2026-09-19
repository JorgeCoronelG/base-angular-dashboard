import {
  AfterContentInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  ChangeDetectionStrategy,
  inject,
  input,
} from "@angular/core";
import SimpleBar from "simplebar";

@Component({
  selector: "vex-scrollbar",
  template: ` <ng-content />`,
  styleUrls: ["./vex-scrollbar.component.scss"],
  host: {
    class: "vex-scrollbar",
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class VexScrollbarComponent implements AfterContentInit, OnDestroy {
  private _element = inject(ElementRef);
  private zone = inject(NgZone);

  readonly options = input<Partial<any>>();

  scrollbarRef?: SimpleBar;

  ngAfterContentInit() {
    this.zone.runOutsideAngular(() => {
      this.scrollbarRef = new SimpleBar(
        this._element.nativeElement,
        this.options(),
      );
    });
  }

  ngOnDestroy(): void {
    /**
     * Exists, but not typed in the type definition
     * https://github.com/Grsmto/simplebar/blob/master/packages/simplebar/src/simplebar.js#L903
     */
    if (this.scrollbarRef && (this.scrollbarRef as any).unMount) {
      (this.scrollbarRef as any).unMount();
    }
  }
}

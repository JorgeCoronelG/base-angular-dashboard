import {
  Directive,
  NgZone,
  OnChanges,
  SimpleChanges,
  inject,
  input,
  output,
} from "@angular/core";
import { VexHighlightResult } from "./vex-highlight.model";
import { VexHighlightService } from "./vex-highlight.service";

@Directive({
  selector: "[vexHighlight]",
  host: {
    "[class.hljs]": "true",
    "[innerHTML]": "highlightedCode",
  },
  standalone: true,
})
export class VexHighlightDirective implements OnChanges {
  private _highlightService = inject(VexHighlightService);
  private _zone = inject(NgZone);

  /** Highlighted Code */
  highlightedCode?: string;

  /** An optional array of language names and aliases restricting detection to only those languages.
   * The subset can also be set with configure, but the local parameter overrides the option if set.
   */
  readonly languages = input<string[]>([]);

  /** Highlight code input */
  readonly code = input.required<string>({ alias: "vexHighlight" });

  /** Stream that emits when code string is highlighted */
  readonly highlighted = output<VexHighlightResult>();

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes["code"] &&
      changes["code"].currentValue !== changes["code"].previousValue
    ) {
      this.highlightElement(this.code(), this.languages());
    }
  }

  /**
   * Highlighting with language detection and fix markup.
   * @param code Accepts a string with the code to highlight
   * @param languages An optional array of language names and aliases restricting detection to only those languages.
   * The subset can also be set with configure, but the local parameter overrides the option if set.
   */
  highlightElement(code: string, languages: string[]) {
    this._zone.runOutsideAngular(() => {
      const res = this._highlightService.highlightAuto(code, languages);
      this.highlightedCode = res.value;
      this.highlighted.emit(res);
    });
  }
}

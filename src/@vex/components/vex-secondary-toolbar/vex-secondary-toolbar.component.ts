import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from "@angular/core";
import { VexConfigService } from "../../config/vex-config.service";

@Component({
  selector: "vex-secondary-toolbar",
  template: `
    <div class="secondary-toolbar-placeholder">&nbsp;</div>

    <div
      [class.fixed]="fixed()"
      [class.w-full]="!fixed()"
      class="secondary-toolbar py-1 z-40 border-t flex"
    >
      <div
        class="px-6 flex items-center flex-auto"
        [class.container]="isVerticalLayout()"
      >
        @if (current(); as current) {
          <h1
            class="subheading-2 font-medium m-0 ltr:pr-3 rtl:pl-3 ltr:border-r rtl:border-l ltr:mr-3 rtl:ml-3 flex-none"
          >
            {{ current }}
          </h1>
        }

        <ng-content />
      </div>
    </div>
  `,
  styleUrls: ["./vex-secondary-toolbar.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VexSecondaryToolbarComponent {
  private readonly config = inject(VexConfigService).config;

  readonly current = input<string>();

  readonly fixed = computed(() => this.config().toolbar.fixed);
  readonly isVerticalLayout = computed(
    () => this.config().layout === "vertical",
  );
}

import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { VexBreadcrumbComponent } from "./vex-breadcrumb/vex-breadcrumb.component";
import { RouterLink } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "vex-breadcrumbs",
  template: `
    <div class="flex items-center gap-2">
      <vex-breadcrumb>
        <a [routerLink]="['/']">
          <mat-icon svgIcon="mat:home" class="icon-sm" />
        </a>
      </vex-breadcrumb>
      @for (crumb of crumbs(); track crumb) {
        <div class="w-1 h-1 bg-gray-600 rounded-full"></div>
        <vex-breadcrumb>
          <a [routerLink]="[]">{{ crumb }}</a>
        </vex-breadcrumb>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [VexBreadcrumbComponent, RouterLink, MatIconModule],
})
export class VexBreadcrumbsComponent {
  readonly crumbs = input<string[]>([]);
}

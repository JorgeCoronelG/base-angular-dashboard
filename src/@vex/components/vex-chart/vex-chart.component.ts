import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  NgZone,
  effect,
  inject,
  input,
  untracked,
  viewChild,
} from "@angular/core";
import ApexCharts, { ApexOptions } from "apexcharts";

export type { ApexOptions };

@Component({
  selector: "vex-chart",
  template: `<div #chart></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VexChartComponent {
  private readonly ngZone = inject(NgZone);

  readonly options = input<ApexOptions>({});
  readonly series = input<ApexOptions["series"]>([]);
  readonly autoUpdateSeries = input(true);

  chart?: ApexCharts;
  private readonly chartElement =
    viewChild.required<ElementRef<HTMLElement>>("chart");

  constructor() {
    inject(DestroyRef).onDestroy(() => this.chart?.destroy());

    /**
     * (Re-)create the chart whenever the options change
     */
    effect(() => {
      const options = this.options();
      untracked(() => this._createChart(options, this.series()));
    });

    /**
     * Update only the series when they change, or re-create the chart
     * if `autoUpdateSeries` is disabled
     */
    effect(() => {
      const series = this.series();
      untracked(() => {
        if (!this.chart) {
          return;
        }

        if (this.autoUpdateSeries()) {
          this.chart.updateSeries(series ?? [], true);
        } else {
          this._createChart(this.options(), series);
        }
      });
    });
  }

  render(): void {
    this.chart?.render();
  }

  private _createChart(options: ApexOptions, series: ApexOptions["series"]) {
    this.chart?.destroy();

    this.ngZone.runOutsideAngular(() => {
      this.chart = new ApexCharts(this.chartElement().nativeElement, {
        ...options,
        series: series ?? options.series,
      });

      this.render();
    });
  }
}

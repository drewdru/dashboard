import * as moment from 'moment';
import { Store } from "@ngrx/store";
import { Directive, ElementRef, Input, OnInit, SimpleChanges } from '@angular/core';
import { Chart, registerables, LinearScale, ChartData, ChartOptions, ChartType } from 'chart.js';
import { selectChartDateRange } from "../../store/chart";
import { Subscription } from 'rxjs';

@Directive({
  selector: '[chartJs]'
})
export class ChartDirective implements OnInit {
  @Input() chartType: ChartType | undefined;
  @Input() chartData: ChartData | undefined;
  @Input() chartOptions: ChartOptions | undefined;

  private chart: Chart | undefined;
  private chartDateRange: string[] | undefined;
  private chartDateRange$ = this.store.select(selectChartDateRange);
  private chartDateRangeSubscription: Subscription | undefined;

  constructor(
    private store: Store,
    private el: ElementRef,
  ) { }

  ngOnInit() {
    Chart.register(...registerables, LinearScale);
    this.createChart();
    this.subscribeToChartDateRange();
  }
  
  ngOnChanges(changes: any) {
    console.log(changes);
    this.createChart();
  }

  ngOnDestroy() {
    this.chartDateRangeSubscription?.unsubscribe();
  }

  private update(ctx: CanvasRenderingContext2D, data: ChartData) { 
    this.chart?.destroy();
    this.chart = new Chart(ctx, {
      type: this.chartType ?? 'bar',
      data: data,
      options: this.chartOptions,
    });
  }

  private createChart(filteredData: ChartData | undefined = undefined) {
    this.chart?.destroy();
    const ctx = this.el.nativeElement.getContext('2d');
    const data = filteredData ?? this.filterDataByDate(this.chartData ?? {
      datasets: []
    }, this.chartDateRange ?? ['Jan', 'Dec']);
    this.update(ctx, data);
  }

  private subscribeToChartDateRange() {
    this.chartDateRangeSubscription = this.chartDateRange$.subscribe(chartDateRange => {
      this.chartDateRange = chartDateRange;
      const filteredData = this.filterDataByDate(this.chartData ?? { datasets: [] }, chartDateRange);
      this.createChart(filteredData);
    });
  }

  private filterDataByDate(data: ChartData, chartDateRange: string[]): ChartData {
    if (!chartDateRange) {
      return data;
    }

    const [startDateStr, endDateStr] = chartDateRange;
    const startDate = moment(startDateStr, "MMM");
    const endDate = moment(endDateStr, "MMM");

    if (!startDate.isValid() || !endDate.isValid()) {
      return data;
    }
    
    const filteredLabels = (data.labels ?? [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December',
    ])?.filter((label, index) => {
      const date = moment(label as string, "MMMM");
      return (
        date.isValid() &&
        date.isBetween(startDate, endDate, null, '[]')
      );
    });

    const filteredDatasets = data.datasets.map(dataset => ({
      ...dataset,
      data: dataset.data.filter((value, index) => {
        if (filteredLabels?.length === dataset.data.length) {
          const date = moment(filteredLabels[index]!, "MMMM");
          if (date.isBetween(startDate, endDate, null, '[]')) {
            return true;
          }
          return false;
        }
        return true;
      })
    }));

    return {
      ...data,
      labels: filteredLabels,
      datasets: filteredDatasets
    };
  }
}

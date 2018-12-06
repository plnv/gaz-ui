import { Component, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Chart, ChartData } from '../../../models/models';
import { ChartOptions } from './highchart.options';

@Component({
  selector: 'app-highchart',
  templateUrl: './highchart.component.html',
  styleUrls: ['./highchart.component.scss']
})
export class HighchartComponent {

  highcharts = Highcharts;
  chartOptions: any = ChartOptions;

  @Input() set data(data: Chart) {
    if (data && data.value) {
      this.convert(data.value);
    }
  }

  convert(data: ChartData) {
    const categories = data.categories;
    const series = [
      {
        data: data.series[0].data,
        step: 'right',
        name: 'План',
        dashStyle: 'ShortDash'
      }, {
        data: data.series[1].data,
        step: 'right',
        name: 'Факт'
      }
    ];

    this.chartOptions = {
      ...this.chartOptions,
      xAxis: {
        ...this.chartOptions.xAxis,
        categories,
        tickInterval: 1,
        startOnTick: false,
        endOnTick: false,
        min: .5,
        max: categories.length - 1.5,
      },
      series
    };

    setTimeout(function () {
      window.dispatchEvent(new Event('resize'));
    }, 0);
  }

}

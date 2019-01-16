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
  chartOptions: any;

  @Input() set data(data: Chart) {
    if (data && data.value) {
      this.convert(data.value);
    }
  }

  convert(data: ChartData) {
    const categories = data.categories;
    const plotBands = data.now && [{
      color: {
        linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0 },
        stops: [
          [0, 'rgba(255, 255, 255, 0)'],
          [1, 'rgba(255, 255, 255, .05)']
        ],
      },
      from: data.now - 1,
      to: data.now,
      zIndex: 4
    }];
    const plotLines = data.now && [{
      value: data.now,
      color: 'white',
      width: 1,
      zIndex: 5
    }];
    const series = [
      {
        data: data.series[0] && data.series[0].data,
        step: 'right',
        name: 'План',
        dashStyle: 'ShortDash'
      }, {
        data: data.series[1] && data.series[1].data,
        step: 'right',
        name: 'Факт'
      },
      {
        data: data.series[2] && data.series[2].data,
        step: 'right',
        dashStyle: 'ShortDash',
        name: 'Прогноз без учета комп-щих воздействий'
      }
    ];
    this.chartOptions = {
      ...ChartOptions(),
      xAxis: {
        ...ChartOptions().xAxis,
        categories,
        tickInterval: 1,
        startOnTick: false,
        endOnTick: false,
        min: .5,
        max: categories.length - 1.5,
        plotLines,
        plotBands
      },
      series
    };

    setTimeout(function () {
      window.dispatchEvent(new CustomEvent('resize'));
    }, 0);
  }

}

export function ChartOptions() {
  return {
    colors: ['#ffffff', '#2378d8', '#00FFFF', '#b18ee6', '#92ead1', '#fd746d', '#ea8e75', '#629add', '#eadb9d', '#85dce0'],
    chart: {
      margin: [1, 10, 30, 10]
    },
    title: null,
    tooltip: {
      formatter: function () {
        let s = `<div style="font-weight: bold">${this.x}</div>`;

        const sortedPoints = this.points.sort((a, b) => {
          return Number(b.y) - Number(a.y);
        });

        sortedPoints.forEach(i => {
          s += `<div><i style="background:${i.color}"></i>${i.series.name}: <strong>${i.y}</strong></div>`;
        });

        return s;
      },
      shared: true,
      backgroundColor: null,
      borderWidth: 0,
      shadow: false,
      useHTML: true,
      style: {
        padding: 0
      }
    },
    xAxis: {
      // crosshair: true,
      // type: 'datetime',
      // labels: {
      //   format: '{value:%e.%m.%y %H:%M}'
      // },
      labels: {
        rotation: [0]
      },
      startOnTick: true,
      title: null,
      plotLines: null,
      plotBands: null,
      categories: []
    },
    yAxis: {
      min: 0,
      title: null
    },
    plotOptions: {
      // column: {
      //   grouping: false,
      // },
      series: {
        pointInterval: 1,
        // pointIntervalUnit: 'week',
        // pointStart: Date.UTC(2018, 12, 1),
        // pointInterval: 24 * 3600 * 1000, // one day
        lineWidth: 1,
        marker: {
          enabled: false
        },
        animation: {
          duration: 350
        }
      }
    },
    legend: {
      enabled: false
    },
    series: []
  }
}

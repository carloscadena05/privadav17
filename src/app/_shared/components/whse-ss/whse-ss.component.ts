import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { WHSE_DataService } from '../../data/whse-data.service';
import { WHSE_SSCount } from '../../models/WHSE_SSCount';


@Component({
  selector: 'whse-ss',
  templateUrl: 'whse-ss.component.html',
  standalone: false
})

export class WHSE_SS_Component implements OnInit {

  isLoading: boolean;
  whseSS: WHSE_SSCount[];
  Highcharts: typeof Highcharts = Highcharts;
  dummyData = [

  ];

  myCategories = this.dummyData.map(a => a.yearJoined);
  myData0 = this.dummyData.map(a => a.current);
  myData1 = this.dummyData.map(a => a.grad);
  myData2 = this.dummyData.map(a => a.sabbatical);
  myData3 = this.dummyData.map(a => a.dropped);
  myData4 = this.dummyData.map(a => a.pending);

  chartOptions: Highcharts.Options = {
    series: [
      {
        type: 'column',
        name: 'Current',

        color: '#22c55e'
      },
      {
        type: 'column',
        name: 'Grad',
        color: '#facc15'
      },
      {
        type: 'column',
        name: 'Sabbatical',
        color: '#4da6ff'
      },
      {
        type: 'column',
        name: 'Pending',
        color: '#64748b'
      },
      {
        type: 'column',
        name: 'Dropped',
        color: '#ef4444'

      },
    ],
    chart: {
      width: null,
      marginLeft: 100,
      marginRight: 100,
      marginBottom: 100,
      borderRadius: 16
    },
    tooltip: {
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 16,
        shadow: false,
        backgroundColor: '#f1f5f9'
    },
    title: {
      text: 'Student Statuses by YearJoined',
    },

    plotOptions: {
      series: {
        stacking: 'normal'
      },
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: false
        },
        pointWidth: 20 // Ancho fijo para las columnas
      }
    },
    yAxis: {
      reversedStacks: false,
      title: {
        text: 'Students per Status',
      },
      stackLabels: {
        enabled: true
      }
    },
    xAxis: {
      labels: {
        rotation: -45
      }
    }
  };

  constructor(public whseData: WHSE_DataService) {
  }
  public ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.isLoading = true;
    console.log('in fetchData for getWHSE_SSR');
    this.whseData.getWHSE_SS().subscribe(
      (data) => {
        this.whseSS = data;
      },
      (err) => console.error('Subscribe error: ' + err),
      () => {
        console.log('StudentStatus by YearJoined loaded ' + this.whseSS.length + ' rows');
        console.log(JSON.stringify(this.whseSS));
        this.setHighchartValues(this.whseSS);
        this.isLoading = false;
      }
    );
  }

  setHighchartValues(hcValues: any) {
    this.myCategories = hcValues.map(a => a.yearJoinedJA);
    this.myData0 = hcValues.map(a => a.current);
    this.myData1 = hcValues.map(a => a.grad);
    this.myData2 = hcValues.map(a => a.sabbatical);
    this.myData3 = hcValues.map(a => a.pending);
    this.myData4 = hcValues.map(a => a.dropped);

    this.chartOptions = {
      ...this.chartOptions,
      xAxis: {
        categories: this.myCategories,
        labels: {
          rotation: -45
        }
      },
      series: [
        {
          type: 'column',
          name: 'Current',
          color: '#22c55e',
          data: this.myData0
        },
        {
          type: 'column',
          name: 'Grad',
          color: '#facc15',
          data: this.myData1
        },
        {
          type: 'column',
          name: 'Sabbatical',
          color: '#4da6ff',
          data: this.myData2
        },
        {
          type: 'column',
          name: 'Pending',
          color: '#64748b',
          data: this.myData3
        },
        {
          type: 'column',
          name: 'Dropped',
          color: '#ef4444',
          data: this.myData4

        },
      ]
    };
    let chart = Highcharts.chart('container_ss', this.chartOptions);
    chart.xAxis[0].setCategories(this.myCategories);
    chart.series[0].setData(this.myData0);
    chart.series[1].setData(this.myData1);
    chart.series[2].setData(this.myData2);
    chart.series[3].setData(this.myData3);
    chart.series[4].setData(this.myData4);

  }
}

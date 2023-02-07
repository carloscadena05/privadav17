import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { WHSE_DataService } from '../../data/whse-data.service';
import { WHSE_SGCount } from '../../models/WHSE_SGCount';

@Component({
  selector: 'whse-sg',
  templateUrl: 'whse-sg.component.html'
})

export class WHSE_SG_Component implements OnInit {

  isLoading: boolean;
  whseSG: WHSE_SGCount[];
  Highcharts: typeof Highcharts = Highcharts;
  dummyData: any[] =[

    ];

  myCategories  = this.dummyData.map(a => a.yearJoined);
  myData0 = this.dummyData.map(a => a.male);
  myData1 = this.dummyData.map(a => a.female);


  chartOptions: Highcharts.Options = {
    series: [
      {
        type: 'column',
        name:'Male',
        color: '#80aaff'
      },
      {
        type: 'column',
        name:'Female',
        color: '#ff99cc'
      },
    ],
    chart: {
      height: 300
    },
    title: {
      text: 'Student Gender by YearJoined',
    },

    plotOptions: {
      series: {
        stacking: 'normal'
      },
      column: {
          stacking: 'normal',
          dataLabels: {
              enabled: false
          }
      }
    },
      yAxis: {
        reversedStacks: false,
        title: {
          text: 'Number of Students',
        },
        stackLabels: {
          enabled: true
        }
    },
    xAxis: {
      labels: {
        rotation: 90
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
    this.whseData.getWHSE_SG().subscribe(
      (data) => {
        this.whseSG = data;
      },
      (err) => console.error('Subscribe error: ' + err),
      () => {
        console.log('StudentStatus by YearJoined loaded ' + this.whseSG.length + ' rows');
        console.log(JSON.stringify(this.whseSG));
        this.setHighchartValues(this.whseSG);
        this.isLoading = false;
      }
    );
  }

  setHighchartValues(hcValues: any) {
    this.myCategories = hcValues.map(a => a.yearJoinedJA);
    this.myData0 = hcValues.map(a => a.male);
    this.myData1 = hcValues.map(a => a.female);

    let chart = Highcharts.chart('container_sg', this.chartOptions);
    chart.xAxis[0].setCategories(this.myCategories);
    chart.series[0].setData(this.myData0);
    chart.series[1].setData(this.myData1);

  }
}

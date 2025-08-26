import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

import { WHSE_DataService } from '../../data/whse-data.service';
import { WHSE_DailySSRCount } from '../../models/WHSE_DailySSRCount';


@Component({
  selector: 'whse-daily-ssr',
  templateUrl: 'whse-daily-ssr.component.html',
  standalone: false
})

export class WHSE_Daily_SSR_Component implements OnInit {

  isLoading: boolean;
  whseDailySSR: WHSE_DailySSRCount[];
  Highcharts: typeof Highcharts = Highcharts;
  dummyData = [] as any[];

  myCategories = this.dummyData.map(a => a.formattedDate);
  myData0 = this.dummyData.map(a => a.submitted);
  myData1 = this.dummyData.map(a => a.cumulative);


  chartOptions: Highcharts.Options = {
    chart: {
      width: null,
      marginLeft: 100,
      marginRight: 100,
      marginBottom: 100,
      borderRadius: 16,
      
    },
    tooltip: {
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 16,
        shadow: false,
        backgroundColor: '#f1f5f9'
    },
    title: {
      text: 'Daily SSR Reports Submitted for Q3 2024'
    },
    // tooltip: {
    //   formatter: function() {
    //     return '<b>' + this.series.name + '</b>: ' + this.y.toFixed(2);
    //   }
    // },
    series: [
      {
        type: 'column',
        name: 'Submitted per Day',
        color: '#1c94a4'
      },
      {
        type: 'line',
        name: 'Cumulative',
        color: '#f3d527'
      },
      // {
      //   type: 'line',
      //   name: 'TotalStudents',
      // }
    ],
    xAxis: {
      labels: {
        rotation: -45,
        formatter: function () {
          return this.value.toString().substring(5, 11);
        }
      }
    },
    yAxis: [
      {
        title: {
          text: 'Reports Submitted',
        },
        tickInterval: 10,
      },
    ],
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true
        }
      },
    },
  };



  constructor(public whseData: WHSE_DataService) {

  }
  public ngOnInit() {
    // pareto(Highcharts);
    this.fetchData();
  }

  fetchData() {
    this.isLoading = true;
    console.log('in fetchData for getWHSE_DailySSR');
    this.whseData.getWHSE_DailySSR().subscribe(
      (data) => {
        console.log('returned from getData');
        this.whseDailySSR = data;
      },
      (err) => console.error('Subscribe error: ' + err),
      () => {
        console.log('daily SSR submissions' + this.whseDailySSR.length + ' rows');
        console.log(JSON.stringify(this.whseDailySSR));
        this.setHighchartValues(this.whseDailySSR);
        this.isLoading = false;
      }
    );


  }

  setHighchartValues(hcValues: any) {
    this.myCategories = hcValues.map(a => a.formattedDate);

    this.myData0 = hcValues.map(a => a.submitted);
    this.myData1 = hcValues.map(a => a.cumulative);

    this.chartOptions = {
      ...this.chartOptions, // mantén las opciones existentes
      xAxis: {
        ...this.chartOptions.xAxis,
        categories: this.myCategories
      },
      series: [
        {
          type: 'column',
          name: 'Submitted per Day',
          color: '#1c94a4',
          data: this.myData0
        },
        {
          type: 'line',
          name: 'Cumulative',
          data: this.myData1,
          color: '#f3d527'
        }
      ]
    };

    console.log('setting chart values');
    console.log(JSON.stringify(this.myCategories));
    console.log(JSON.stringify(this.myData0));
    console.log(JSON.stringify(this.myData1));


    let chart = Highcharts.chart('container_daily_ssr', this.chartOptions);
    chart.xAxis[0].setCategories(this.myCategories);
    chart.series[0].setData(this.myData0);
    chart.series[1].setData(this.myData1);

  }


}

import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { WHSE_DataService } from '../../data/whse-data.service';
import { WHSE_SSRCount } from '../../models/WHSE_SSRCount';


@Component({
  selector: 'whse-ssr',
  templateUrl: 'whse-ssr.component.html',
  standalone: false
})

export class WHSE_SSR_Component implements OnInit {

  isLoading: boolean;
  whseSSR: WHSE_SSRCount[];
  Highcharts: typeof Highcharts = Highcharts;
  dummyData = [

  ];

  myCategories = this.dummyData.map(a => a.yearPeriod);
  myData = this.dummyData.map(a => a.ssrCount);

  chartOptions: Highcharts.Options = {
    series: [

      {
        type: 'column',
        name: 'Completed/Current',
        color: '#1c94a4',
        data: this.myData
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
      text: 'Student Self Reports by Quarter',
    },
    xAxis: {
      categories: this.myCategories, // Inicialmente vacío, se actualizará
      type: 'category'
    },
    yAxis: {
      title: {
        text: 'Reports Submitted',
      },
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: true
        }
      }
    },
  };

  constructor(public whseData: WHSE_DataService) {
  }
  public ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.isLoading = true;
    console.log('in fetchData for getWHSE_SSR');
    this.whseData.getWHSE_SSR().subscribe(
      (data) => {
        this.whseSSR = data;
      },
      (err) => console.error('Subscribe error: ' + err),
      () => {
        console.log('StudentsSelfReportsByMonth loaded ' + this.whseSSR.length + ' rows');
        console.log(JSON.stringify(this.whseSSR));
        this.setHighchartValues(this.whseSSR);
        this.isLoading = false;
      }
    );
  }

  setHighchartValues(hcValues: any) {
    this.myCategories = hcValues.map(a => a.yearPeriod);
    this.myData = hcValues.map(a => a.ssrCount);
    this.chartOptions = {
      ...this.chartOptions,
      xAxis: {
        categories: this.myCategories
      },
      series: [{
        type: 'column',
        name: 'Completed/Current',
        color: '#1c94a4',
        data: this.myData
      }]
    };
    let chart = Highcharts.chart('container_ssr', this.chartOptions);
    chart.xAxis[0].setCategories(this.myCategories);
    chart.series[0].setData(this.myData);
  }


}

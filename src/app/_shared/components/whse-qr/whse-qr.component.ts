import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { WHSE_DataService } from '../../data/whse-data.service';
import { WHSE_QRCount } from '../../models/WHSE_QR.Count';


@Component({
    selector: 'whse-qr',
    templateUrl: 'whse-qr.component.html',
    standalone: false
})

export class WHSE_QR_Component implements OnInit {

  isLoading: boolean;
  whseQR: WHSE_QRCount[];
  Highcharts: typeof Highcharts = Highcharts;
  dummyData =[];
  myCategories = this.dummyData.map(a => a.yearPeriod);
  myData0 = this.dummyData.map(a => a.waiting);
  myData1 = this.dummyData.map(a => a.needsReview);
  myData2 = this.dummyData.map(a => a.onHold);
  myData3 = this.dummyData.map(a => a.sent);
  myData4 = this.dummyData.map(a => a.other);

  chartOptions: Highcharts.Options = {
    series: [
      {
        type: 'column',
        name:'Waiting',
        color: '#4da6ff'
      },
      {
        type: 'column',
        name:'Needs Review',
        color: '#b30000'
      },
      {
        type: 'column',
        name:'OnHold',
        color: '#ffb31a'
      },
      {
        type: 'column',
        name:'Sent',
        color: '#00b300'

      },
      {
        type: 'column',
        name:'Other',
        color: '#cc9900'

      },
    ],
    chart: {
      height: 300
    },
    title: {
      text: 'Quarterly Reports History',
    },
    plotOptions: {
      column: {
          stacking: 'normal',
          // dataLabels: {
          //     enabled: false
          // }
      }
    },
    yAxis: {
      reversedStacks: false,
      tickInterval: 10,
      title: {
        text: 'Reports per Status',
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
    this.whseData.getWHSE_QR().subscribe(
      (data) => {
        this.whseQR = data;
      },
      (err) => console.error('Subscribe error: ' + err),
      () => {
        console.log('MentorReportsByMonth loaded ' + this.whseQR.length + ' rows');
        // console.log(JSON.stringify(this.whseQR));
        this.setHighchartValues(this.whseQR);
        this.isLoading = false;
      }
    );
  }
  setHighchartValues(hcValues: any) {

    this.myCategories = hcValues.map(a => a.yearPeriod);
    this.myData0 = hcValues.map(a => a.waiting);
    this.myData1 = hcValues.map(a => a.needsReview);
    this.myData2 = hcValues.map(a => a.onHold);
    this.myData3 = hcValues.map(a => a.sent);
    this.myData4 = hcValues.map(a => a.other);


    let chart = Highcharts.chart('container_qr', this.chartOptions);
    chart.xAxis[0].setCategories(this.myCategories);
    chart.series[0].setData(this.myData0);
    chart.series[1].setData(this.myData1);
    chart.series[2].setData(this.myData2);
    chart.series[3].setData(this.myData3);
    chart.series[4].setData(this.myData4);
  }


}

import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { WHSE_DataService } from '../../data/whse-data.service';
import { WHSE_MRCount } from '../../models/WHSE_MR.Count';


@Component({
    selector: 'whse-mr',
    templateUrl: 'whse-mr.component.html',
    standalone: false
})

export class WHSE_MR_Component implements OnInit {

  isLoading: boolean;
  whseMR: WHSE_MRCount[];
  Highcharts: typeof Highcharts = Highcharts;
  dummyData =[];
  myCategories = this.dummyData.map(a => a.yearMonth);
  myData0 = this.dummyData.map(a => a.allGood);
  myData1 = this.dummyData.map(a => a.celebrate);
  myData2 = this.dummyData.map(a => a.concerned);
  myData3 = this.dummyData.map(a => a.problems);

  chartOptions: Highcharts.Options = {
    series: [
      {
        type: 'column',
        name:'AllGood',
        color: '#00b300'
      },
      {
        type: 'column',
        name:'Problems',
        color: '#b30000'
      },
      {
        type: 'column',
        name:'Celebrate',
        color: '#ffb31a'
      },
      {
        type: 'column',
        name:'Concerned',
        color: '#4da6ff'

      },
    ],
    chart: {
      height: 300
    },
    title: {
      text: 'Mentor Reports per Emoji Status',
    },
    plotOptions: {
      column: {
          stacking: 'normal',
          dataLabels: {
              enabled: false
          }
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
    this.whseData.getWHSE_MR().subscribe(
      (data) => {
        this.whseMR = data;
      },
      (err) => console.error('Subscribe error: ' + err),
      () => {
        console.log('MentorReportsByMonth loaded ' + this.whseMR.length + ' rows');
        // console.log(JSON.stringify(this.whseMR));
        this.setHighchartValues(this.whseMR);
        this.isLoading = false;
      }
    );
  }
  setHighchartValues(hcValues: any) {

    this.myCategories = hcValues.map(a => a.yearMonth);
    this.myData0 = hcValues.map(a => a.allGood);
    this.myData1 = hcValues.map(a => a.problems);
    this.myData2 = hcValues.map(a => a.celebrate);
    this.myData3 = hcValues.map(a => a.concerned);


    let chart = Highcharts.chart('container_mr', this.chartOptions);
    chart.xAxis[0].setCategories(this.myCategories);
    chart.series[0].setData(this.myData0);
    chart.series[1].setData(this.myData1);
    chart.series[2].setData(this.myData2);
    chart.series[3].setData(this.myData3);
  }


}

import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

import { WHSE_DataService } from '../../data/whse-data.service';
import { WHSE_DailyMRCount } from '../../models/WHSE_DailyMRCount';

@Component({
    selector: 'whse-daily-mr',
    templateUrl: 'whse-daily-mr.component.html',
    standalone: false
})




export class WHSE_Daily_MR_Component implements OnInit {

  isLoading: boolean;
  whseDailyMR: WHSE_DailyMRCount[];
  Highcharts: typeof Highcharts = Highcharts;
  dummyData =[] as any[];;
  months: string[] = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  monthNum = this.getAdjustedMonth();

  titleText = 'Daily Mentor Reports Submitted -- ' + this.months[this.monthNum] + ' 2024'

  myCategories = this.dummyData.map(a => a.formattedDate);
  myData0 = this.dummyData.map(a => a.submitted);
  myData1 = this.dummyData.map(a => a.cumulative);


  chartOptions: Highcharts.Options = {
  chart: {
    renderTo: 'container_daily_mr',
    type: 'column',
    height: 300
  },
  title: {
      text: this.titleText
  },
  // tooltip: {
  //   formatter: function() {
  //     return '<b>' + this.series.name + '</b>: ' + this.y.toFixed(2);
  //   }
  // },
  series: [
    {
      type: 'column',
      name:'Submitted per Day',
      color: '#00b300'
    },
    {
      type: 'line',
      name: 'Cumulative',
    },
    // {
    //   type: 'line',
    //   name: 'TotalStudents',
    // }
  ],
xAxis: {
  labels: {
    rotation: 90,
    formatter: function () {
      return this.value.toString().substring(5,11);
    }
  },
  title: {
    text: 'Date'
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
    console.log('in fetchData for getWHSE_DailyMR');
    this.whseData.getWHSE_DailyMR().subscribe(
      (data) => {
        console.log('returned from getData');
        this.whseDailyMR = data;
      },
      (err) => console.error('Subscribe error: ' + err),
      () => {
        console.log('daily MR submissions' + this.whseDailyMR.length + ' rows');
        console.log(JSON.stringify(this.whseDailyMR));
        this.setHighchartValues(this.whseDailyMR);
        this.isLoading = false;
      }
    );


  }

  setHighchartValues(hcValues: any) {
    this.myCategories = hcValues.map(a => a.formattedDate);

    this.myData0 = hcValues.map(a => a.submitted);
    this.myData1 = hcValues.map(a => a.cumulative);


    console.log('setting chart values');
    console.log(JSON.stringify(this.myCategories));
    console.log(JSON.stringify(this.myData0));
    console.log(JSON.stringify(this.myData1));


    let chart = Highcharts.chart('container_daily_mr', this.chartOptions);
    chart.xAxis[0].setCategories(this.myCategories);
    chart.series[0].setData(this.myData0);
    chart.series[1].setData(this.myData1);

  }
  getAdjustedMonth(): number {
    let adjustedMonth = new Date().getMonth();
    let todayDate: number = new Date().getDate();
    if (todayDate <= 2)
    {
      adjustedMonth = (adjustedMonth == 0) ? adjustedMonth = 11 : --adjustedMonth;
      console.log('2>>>>' + adjustedMonth);
    }
    return adjustedMonth;
  }

}

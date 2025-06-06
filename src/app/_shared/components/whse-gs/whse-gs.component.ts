import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { WHSE_DataService } from '../../data/whse-data.service';
import { WHSE_GSCount } from '../../models/WHSE_GSCount';

@Component({
    selector: 'whse-gs',
    templateUrl: 'whse-gs.component.html',
    standalone: false
})

export class WHSE_GS_Component implements OnInit {

  isLoading: boolean;
  whseGS: WHSE_GSCount[];
  Highcharts: typeof Highcharts = Highcharts;
  dummyData: any[] =[];

  myCategories = this.dummyData.map(a => a.formattedPeriodStartDate);
  myData0 =this.dummyData.map(a => a.gradesSubmittedCount);
  myData1 =this.dummyData.map(a => a.gradesNotSubmittedCount);

  chartOptions: Highcharts.Options = {
    series: [
      {
        type: 'column',
        name:'gradesSubmittedCount',
        color: '#ffb31a'

      },
      {
        type: 'column',
        name:'gradesNotSubmittedCount',
        color: '#0066ff'
      },

    ],
    chart: {
      height: 300
    },
    title: {
      text: 'Grade Submissions by Grade Processing Period',
    },
    plotOptions: {
      column: {
          stacking: 'normal',
          dataLabels: {
              enabled: true
          }
      }
    },
    yAxis: {
      reversedStacks: false,
      title: {
        text: '# Submitted',
      },
    },
    xAxis: {
      labels: {
        rotation: 90
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
    console.log('in fetchData for getWHSE_GS');
    this.whseData.getWHSE_GS().subscribe(
      (data) => {
        this.whseGS = data;
      },
      (err) => console.error('Subscribe error: ' + err),
      () => {
        console.log('Grade Submissions loaded ' + this.whseGS.length + ' rows');
        console.log(JSON.stringify(this.whseGS));
        this.setHighchartValues(this.whseGS);
        this.isLoading = false;
      }
    );
  }

  setHighchartValues(hcValues: any) {
    this.myCategories = hcValues.map(a => a.formattedPeriodStartDate);
    this.myData0 = hcValues.map(a => a.gradesSubmittedCount);
    this.myData1 = hcValues.map(a => a.gradesNotSubmittedCount);

    let chart = Highcharts.chart('container_gs', this.chartOptions);
    chart.xAxis[0].setCategories(this.myCategories);
    chart.series[0].setData(this.myData0);
    chart.series[1].setData(this.myData1);

  }
}

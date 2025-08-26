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
  dummyData: any[] = [];

  myCategories = this.dummyData.map(a => a.formattedPeriodStartDate);
  myData0 = this.dummyData.map(a => a.gradesSubmittedCount);
  myData1 = this.dummyData.map(a => a.gradesNotSubmittedCount);

  chartOptions: Highcharts.Options = {
    series: [
      {
        type: 'column',
        name: 'gradesSubmittedCount',
        color: '#22c55e'

      },
      {
        type: 'column',
        name: 'gradesNotSubmittedCount',
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
      text: 'Grade Submissions by Grade Processing Period',
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
        pointWidth: 20
      },
    },
    yAxis: {
      reversedStacks: false,
      title: {
        text: '# Submitted',
      },
      stackLabels: {
        enabled: true
      }
    },
    xAxis: {
      labels: {
        rotation: -45
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
    // Actualización correcta del gráfico
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
          name: 'Submitted Grades',
          color: '#22c55e',
          data: this.myData0
        },
        {
          type: 'column',
          name: 'Not Submitted',
          color: '#ef4444',
          data: this.myData1
        }
      ]
    };
    let chart = Highcharts.chart('container_gs', this.chartOptions);
    chart.xAxis[0].setCategories(this.myCategories);
    chart.series[0].setData(this.myData0);
    chart.series[1].setData(this.myData1);

  }
}

import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { WHSE_DataService } from '../../data/whse-data.service';
import { WHSE_DCCount } from '../../models/WHSE_DCCount';


@Component({
    selector: 'whse-dc',
    templateUrl: 'whse-dc.component.html',
    standalone: false
})

export class WHSE_DC_Component implements OnInit {

  isLoading: boolean;
  whseDC: WHSE_DCCount[];
  Highcharts: typeof Highcharts = Highcharts;
  dummyData =[] as any[];

  myCategories = this.dummyData.map(a => a.snapshotDate);
  myData0 = this.dummyData.map(a => a.completeTotals);
  myData1 = this.dummyData.map(a => a.droppedTotals);
  // myData2 = this.dummyData.map(a => a.percentage);


  chartOptions: Highcharts.Options = {

    series: [
      {
        type: 'column',
        name:'Completed/Current',
        color: '#00b300'
      },
      {
        type: 'column',
        name:'Dropped',
        color: '#b30000'
      },
    ],
    chart: {
      height: 300
    },
    title: {
      text: 'Current Student Statuses',
    },
    xAxis: {

    },
    plotOptions: {
      column: {
          stacking: 'normal',
          dataLabels: {
              enabled: true
          },
          grouping: true
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
    console.log('in fetchData for getWHSE_DC');
    this.whseData.getWHSE_DC().subscribe(
      (data) => {
        this.whseDC = data;
      },
      (err) => console.error('Subscribe error: ' + err),
      () => {
        console.log('StudentStatuses loaded ' + this.whseDC.length + ' rows');
        console.log(JSON.stringify(this.whseDC));
        this.setHighchartValues(this.whseDC);
        this.isLoading = false;
      }
    );
  }

  setHighchartValues(hcValues: any) {
    this.myCategories = hcValues.map(a => a.snapshotDate);
    this.myData0 = hcValues.map(a => a.completeTotals);
    this.myData1 = hcValues.map(a => a.droppedTotals);
    // this.myData2 = hcValues.map(a => a.percentage);

    console.log('setting chart values');
    console.log(JSON.stringify(this.myCategories));
    console.log(JSON.stringify(this.myData0));
    console.log(JSON.stringify(this.myData1));
    // console.log(JSON.stringify(this.myData2));

    let chart = Highcharts.chart('container_dc', this.chartOptions);
    chart.xAxis[0].setCategories(this.myCategories);
    chart.series[0].setData(this.myData0);
    chart.series[1].setData(this.myData1);
    // chart.series[2].setData(this.myData2);
  }


}

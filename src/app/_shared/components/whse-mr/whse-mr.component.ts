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
  dummyData = [];
  myCategories = this.dummyData.map(a => a.yearMonth);
  myData0good = this.dummyData.map(a => a.allGood);
  myData1prob = this.dummyData.map(a => a.celebrate);
  myData2celeb = this.dummyData.map(a => a.concerned);
  myData3conc = this.dummyData.map(a => a.problems);

  chartOptions: Highcharts.Options = {
    series: [
      {
        type: 'column',
        name: 'Problems',
        color: '#ef4444'
      },
      {
        type: 'column',
        name: 'Concerned',
        color: '#f97316'
      },
      {
        type: 'column',
        name: 'AllGood',
        color: '#22c55e'
      },
      {
        type: 'column',
        name: 'Celebrate',
        color: '#facc15'
      },
    ],
    chart: {
      width: null,
      marginLeft: 100,
      marginRight: 100,
      marginBottom: 100,
      borderRadius: 16
    },
    title: {
      text: 'Mentor Reports per Emoji Status',
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: false
        },
      },
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
        rotation: -45,
        step: 1
      }
    },
    tooltip: {
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 16,
        shadow: false,
        backgroundColor: '#f1f5f9'
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
    this.myData0good = hcValues.map(a => a.allGood);
    this.myData1prob = hcValues.map(a => a.problems);
    this.myData2celeb = hcValues.map(a => a.celebrate);
    this.myData3conc = hcValues.map(a => a.concerned);


    let chart = Highcharts.chart('container_mr', this.chartOptions);
    chart.xAxis[0].setCategories(this.myCategories);
    chart.series[0].setData(this.myData1prob);
    chart.series[1].setData(this.myData3conc);
    chart.series[2].setData(this.myData0good);
    chart.series[3].setData(this.myData2celeb);
  }


}

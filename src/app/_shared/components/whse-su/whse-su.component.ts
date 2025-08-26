import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import pareto from 'highcharts/modules/pareto';

import { WHSE_DataService } from '../../data/whse-data.service';
import { WHSE_SUCount } from '../../models/WHSE_SUCount';


@Component({
  selector: 'whse-su',
  templateUrl: 'whse-su.component.html',
  standalone: false
})

export class WHSE_SU_Component implements OnInit {

  isLoading: boolean;
  whseSU: WHSE_SUCount[];
  Highcharts: typeof Highcharts = Highcharts;
  dummyData = [] as any[];

  myCategories = this.dummyData.map(a => a.universityAbbrev);
  myData0 = this.dummyData.map(a => a.numberStudents);


  chartOptions: Highcharts.Options = {
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
      text: 'Students per University (with >= 4 students)'
    },
    series: [
      //{
      //   type: 'pareto',
      //   name: 'Cumulative Percentage',
      //   color: '#000066',
      //   yAxis: 1,
      //   zIndex: 10,
      //   baseSeries: 1,
      //   tooltip: {
      //       valueDecimals: 0,
      //       valueSuffix: '%',
      //   }
      // },
      {
        name: 'Number of Students',
        type: 'column',
        zIndex: 1,
        color: '#1c94a4'
      }],
    xAxis: {
      labels: {
        rotation: -45,
        formatter: function () {
          return this.value.toString();
        }
      }
    },
    yAxis: [
      {
        title: {
          text: 'Number of Students',
        },
      },
      // {
      //   title: {
      //     text: 'Cumulative Percent',
      //   },
      //   minPadding: 0,
      //   maxPadding: 0,
      //   max: 100,
      //   min: 0,
      //   opposite: true,
      //   labels: {
      //     format: '{value}%',
      //   },
      // },
    ],
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true
        },
        pointWidth: 20 // Ancho fijo para las columnas
      },
    },
    // tooltip:{
    //   formatter: function(){
    //       if(this.series.index==0)
    //       {
    //           return '<span style="color:'+this.series.color+'">'+this.series.name+':</span><span>&nbsp;'+Math.floor(this.y)+'&percnt;  </span>';
    //       } else {
    //         {
    //           return '<span style="color:'+this.series.color+'">'+this.series.name+':</span><span>&nbsp;'+this.y+'</span>';
    //         }
    //       }
    //   }
  };



  constructor(public whseData: WHSE_DataService) {
  }
  public ngOnInit() {
    pareto(Highcharts);
    this.fetchData();
  }

  fetchData() {
    this.isLoading = true;
    console.log('in fetchData for getWHSE_SU');
    this.whseData.getWHSE_SU().subscribe(
      (data) => {
        this.whseSU = data;
      },
      (err) => console.error('Subscribe error: ' + err),
      () => {
        console.log('Students per University ' + this.whseSU.length + ' rows');
        console.log(JSON.stringify(this.whseSU));
        this.setHighchartValues(this.whseSU);
        this.isLoading = false;
      }
    );
  }

  setHighchartValues(hcValues: any) {
    this.myCategories = hcValues.map(a => a.universityAbbrev);
    // this.myData0 = hcValues.map(a => a.universityAbbrev);
    this.myData0 = hcValues.map(a => a.numberStudents);
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
          name: 'Number of Students',
          type: 'column',
          zIndex: 1,
          color: '#1c94a4',
          data: this.myData0
        }
      ]
    };
    console.log('setting chart values');
    console.log(JSON.stringify(this.myCategories));
    console.log(JSON.stringify(this.myData0));
    // console.log(JSON.stringify(this.myData1));

    let chart = Highcharts.chart('container_su', this.chartOptions);
    chart.xAxis[0].setCategories(this.myCategories);
    chart.series[0].setData(this.myData0);
    // chart.series[1].setData(this.myData1);
    //chart.series[1].setData(this.myData1);
  }


}

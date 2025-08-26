import { Component, Input, OnInit } from '@angular/core';
import { constants } from '../constants/constants';

@Component({
  template: `
    <div class="grid grid-cols-1 gap-4">
    <div class="flex rounded-lg items-center justify-start" [ngClass]="color(reportStatus, 'bg')">
      <img src="/assets/images/{{reportStatus}}.svg" class="rounded-full scale-90">
      <span [ngClass]="color(reportStatus, 'tx')" class="text-sm">Timely Report</span>
    </div>
  </div>
    <!-- <div class="grid grid-cols-1 gap-x-4 justify-center text-center">
      <h4 class="text-primary font-medium">
        Student Self Report
      </h4>
      <span class="font-medium text-secondary text-sm">Timely Self Report</span>
      <img src="/assets/images/{{reportStatus}}.svg" class="rounded-full scale-90">

    </div> -->
    <!-- <div>
  <label>SSR Status</label>
  <table><tr>
  <td>Timely Self Report&nbsp;</td>
  </tr>
  <tr>
  <td style="text-align:center;white-space: nowrap">
    <img src="/assets/images/{{reportStatus}}.jpg" height="22">
  </td>
</tr></table></div> -->`,
  selector: 'app-student-ssr-status',
  standalone: false
})
export class StudentSSRStatusComponent implements OnInit {
  @Input() reportStatus: string;

  constructor() {

  }

  ngOnInit() {
    console.log('ngOnInit');
  }


  color(icon: string, type: 'bg' | 'tx' | 'hx') {

    if (constants.emojis.includes(icon)) {
      switch (icon) {
        case '/assets/images/needsAttention.svg':
          icon = 'red'
          break;
        case '/assets/images/thumbsUp.svg':
          icon = 'green'
          break;
        case '/assets/images/celebrate.svg':
          icon = 'yellow'
          break;
        case '/assets/images/concerned.svg':
          icon = 'orange'
          break;
        case '/assets/images/NA.jpg':
          icon = 'NA'
          break;
      }
    }

    const colorMap = {
      green: { bg: 'bg-green-100', tx: 'text-green-600', hx: '#16a34a' },
      NA: { bg: 'bg-slate-100', tx: 'text-slate-600', hx: '#475569' },
      red: { bg: 'bg-red-100', tx: 'text-red-600', hx: '#dc2626' },
      yellow: { bg: 'bg-yellow-100', tx: 'text-yellow-600', hx: '#ca8a04' },
      orange: { bg: 'bg-orange-100', tx: 'text-orange-600', hx: '#ea580c' }
    };

    return colorMap[icon][type];
  }
}

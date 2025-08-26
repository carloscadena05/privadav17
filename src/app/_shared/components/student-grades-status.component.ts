import { Component, Input, OnInit } from '@angular/core';
import { constants } from '../constants/constants';

@Component({
  template: `
  <div class="grid grid-cols-2 gap-4">
    <div class="flex rounded-lg items-center justify-start" [ngClass]="color(gpaStatus, 'bg')">
            <img src="/assets/images/{{gpaStatus}}.svg" class="rounded-full scale-90">
      <span [ngClass]="color(gpaStatus, 'tx')" class="text-sm">GPA</span>
    </div>
    <div class="flex rounded-lg items-center justify-start" [ngClass]="color(gradeRptStatus, 'bg')">
      <img src="/assets/images/{{gradeRptStatus}}.svg" class="rounded-full scale-90">
      <span [ngClass]="color(gradeRptStatus, 'tx')" class="text-sm">On Time</span>
    </div>
  </div>
    <!-- <div class="grid grid-cols-2 gap-x-4 justify-center text-center">
      <h4 class="col-span-2 text-primary font-medium">
        Grades
      </h4>
      <span class="font-medium text-secondary text-sm">GPA</span>
      <span class="font-medium text-secondary text-sm">On Time</span>
      <img src="/assets/images/{{gpaStatus}}.svg" class="rounded-full scale-90">
      <img src="/assets/images/{{gradeRptStatus}}.svg" class="rounded-full scale-90">

    </div>      <div>
  <label>Grades Status</label>
  <table><tr>
  <td>GPA&nbsp;&nbsp;</td><td>On Time</td>
  </tr><tr>
  <td style="text-align:center;white-space: nowrap">
    <img src="/assets/images/{{gpaStatus}}.svg" height="22">
  </td>
  <td style="text-align:center;white-space: nowrap">
    <img src="/assets/images/{{gradeRptStatus}}.svg" height="22">
  </td>
</tr></table></div> -->`,
  selector: 'app-student-grades-status',
  standalone: false
})
export class StudentGradesStatusComponent implements OnInit {
  @Input() gpaStatus: string;
  @Input() gradeRptStatus: string;

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

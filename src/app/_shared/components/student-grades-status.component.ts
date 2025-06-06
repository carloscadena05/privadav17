import { Component, Input, OnInit } from '@angular/core';

@Component({
    template: `<div>
  <label>Grades Status</label>
  <table><tr>
  <td>GPA&nbsp;&nbsp;</td><td>On Time</td>
  </tr><tr>
  <td style="text-align:center;white-space: nowrap">
    <img src="/assets/images/{{gpaStatus}}.jpg" height="22">
  </td>
  <td style="text-align:center;white-space: nowrap">
    <img src="/assets/images/{{gradeRptStatus}}.jpg" height="22">
  </td>
</tr></table></div>`,
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



}

import { Component, Input, OnInit } from '@angular/core';

@Component({
    template: `<div>
  <label>SSR Status</label>
  <table><tr>
  <td>Timely Self Report&nbsp;</td>
  </tr>
  <tr>
  <td style="text-align:center;white-space: nowrap">
    <img src="/assets/images/{{reportStatus}}.jpg" height="22">
  </td>
</tr></table></div>`,
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



}

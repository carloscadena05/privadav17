import { Component, Input, OnInit } from '@angular/core';

@Component({
    template: `<div>
  <label>Mentor Reports Status</label>
  <table><tr>
  <td>Timely Mentor Report&nbsp;</td><td>Latest Emoji</td>
  </tr><tr>
  <td style="text-align:center;white-space: nowrap">
    <img src="/assets/images/{{reportStatus}}.jpg" height="22">
  </td>
  <td style="text-align:center;white-space: nowrap">
  <img src="{{emojiPathname}}" width="24" />
</td>
</tr></table></div>`,
    selector: 'app-student-mr-status',
    standalone: false
})
export class StudentMRStatusComponent implements OnInit {
  @Input() reportStatus: string;
  @Input() emojiPathname: string;

  constructor() {

  }

  ngOnInit() {
    console.log('ngOnInit');
  }



}

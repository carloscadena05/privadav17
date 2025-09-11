import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { constants } from '../../constants/constants';
import { MentorReport2RPT } from '../../models/mentor-report2';

@Component({
    selector: 'app-mentor-reports2-list',
    templateUrl: './mentor-reports2-list.component.html',
    standalone: false
})
export class MentorReports2ListComponent {
  @Input() mentorReports2: MentorReport2RPT[];
  @Input() latestReportIsCurrentMonth: boolean;

  emojis: Array<string>;
  studentId: number;

  is_spanish: boolean = navigator.language.startsWith('es')

  constructor(private router: Router) {
    console.log('###MentorReportsList constructor');
    this.emojis = constants.emojis;
  }

  monthlyReportEdit(mentorReportId: number) {
    console.log('in monthly-reports2: monthlyReportEdit');
    if (this.studentId !== null) {
      const target = '/mentors/monthly-reports-edit/' + mentorReportId;
      console.log('ready to navigate');
     this.router.navigateByUrl(target);
    } else {
      console.log('mentorReportID is Null, skipping');
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { MentorReport2DataService } from 'src/app/_shared/data/mentor-report2-data.service';
import { StudentState } from 'src/app/_store/student/student.state';
import { constants } from '../../_shared/constants/constants';
import { MentorReport2RPT } from '../../_shared/models/mentor-report2';
import { SessionService } from '../../_shared/services/session.service';
/******

 *

 * First thing to do is determine if the latest report is for the current month
  * use boolean latestReportIsCurrentMonth to store this value
  * this.latestReportIsCurrentMonth = (x.lastContactMonth == constants.currentContactMonth
                                        && x.lastContactYear  == constants.currentContactYear);
 *
   Then in Parent component only show Add buttons if latest report row is NOT current month
    (reviewed status doesn't matter)

 also pass the value to child, who will pay attention to reviewed status for that month
 and for each row, (in html template) if it is the top row and this.latestReportIsCurrentMonth
 using this condtion
 *    ngIf="i === 0 && latestReportIsCurrentMonth && xx.reviewedStatusId !== 2148


          For testing set reviewedStatus in ssms editor or Admins/MentorRpts/Review
          set MR YYYYMM vaues in ssms editor
          ALL POSSIBLE CONDITIONS
          ADD BUTTONS (parent):
          1.) current month = latest report month: never show add buttons (we already have a report for this month)
          2.) current month <> latest report month: always show for any reviewed status (we are missing current month report)
          EDIT BUTTONS (child list):
          3.) current month = latest report month: show only for status 2148 (we have a report but it is not CopiedToQR)
          4.) current month <> latest report month: never show edit buttons (we don't have current month report)

**/

@Component({
    selector: 'app-mentor-reports',
    templateUrl: './monthly-reports2.component.html',
    standalone: false
})
export class MonthlyReports2Component implements OnInit {
  isLoading: boolean;
  errorMessage: string;

  studentId: number;
  studentGUId: string;
  mentorId: number;
  mentorGUId: string;
  mentorReportId: number;
  mentorReports2: Array<MentorReport2RPT>;
  emojis: Array<string>;
  studentName: string;
  latestReportIsCurrentMonth: boolean;
  private subscription: Subscription;

   currentGUId$ = this.store.select<string>(StudentState.getSelectedStudentGUId);
   currentName$ = this.store.select<string>(StudentState.getSelectedStudentName);

  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    public mentorReport2Data: MentorReport2DataService,
    public session: SessionService,
    private store: Store
  ) {
    console.log('monthlyReports constructor');
    this.emojis = constants.emojis;
  }

  ngOnInit() {
    console.log('monthlyReports ngOnInit');
    this.mentorId = this.session.getUserId();
    console.log('mentorId ' + this.mentorId);
    this.mentorGUId = this.session.getUserGUId();
    console.log('mentorGUId ' + this.mentorGUId);

    this.latestReportIsCurrentMonth = false; // conditionally set to true after fetch
    this.subscribeForStudentGUIds2();
    this.subscribeForStudentNames();
  }

  subscribeForStudentGUIds2() {
    this.subscription = this.currentGUId$.subscribe((message) => {
      if (this.studentGUId !== message) {
        this.studentGUId = message;
        console.log('************NGXS: header new StudentGUId received' + this.studentGUId);
        if (this.studentGUId && this.studentGUId !== '0000') {
          this.fetchData();
        }
      }
    });
  }

  subscribeForStudentNames() {
    this.subscription = this.currentName$.subscribe((message) => {
      console.log('subscribeForStudentName received with message [' + message + ']');
      this.studentName = message;
      console.log('************NGXS: mrAdd new StudentName received' + this.studentName);
    });
  }


  fetchData() {
    console.log('mr fetchData');
    this.isLoading = true;
    this.isLoading = true;
    this.latestReportIsCurrentMonth = false;
    this.mentorReport2Data.getMentorReport2RPTsViaGUID(this.studentGUId, this.mentorGUId).subscribe(
      (data) => {
        this.mentorReports2 = data;
      },
      (err) => console.error('Subscribe error: ' + err),
      () => {
        console.log('done: ');
        this.isLoading = false;
        let i = 0;
        console.log('mentorReports2.length = ' + this.mentorReports2.length);
        for (const x of this.mentorReports2) {
          console.log('reviewedStatusId: ' + x.reviewedStatusId);
          console.log('i = ' + i);
          console.log('x.lastContactMonth =  '+ x.lastContactMonth);
          console.log('x.lastContactYear =  '+ x.lastContactYear);
          console.log('constants.currentContactMonth =  '+ constants.currentContactMonth);
          console.log('constants.currentontactYear =  '+ constants.currentContactYear);

          this.latestReportIsCurrentMonth = (x.lastContactMonth == constants.currentContactMonth
                                        && x.lastContactYear  == constants.currentContactYear);
          console.log(' this.latestReportIsCurrentMonthvalue is  ' +  this.latestReportIsCurrentMonth);
          break; // only want current (first in reverse order)
        }
      }
    );
  }

  monthlyReportENAdd() {
    if (this.latestReportIsCurrentMonth) {
      alert(
        'There is already a report filed for this month. Please use the edit button to edit it. / Ya hay un informe presentado para este mes. Por favor, utilice el botón Editar para editarlo. '
      );
    } else {
      console.log('actual nonProxy mentorGUId ' + this.mentorGUId);
      if (this.studentGUId !== null) {
        const link = [
          '/mentors/monthly-reports-EN-add',
          {
            mentorId: this.mentorId,
            mentorGUId: this.mentorGUId,
            studentGUId: this.studentGUId
          }
        ];
        console.log('navigating to ' + JSON.stringify(link));
        this.router.navigate(link);
      }
    }
  }

  monthlyReportESAdd() {
    if (this.latestReportIsCurrentMonth) {
      alert(
        'There is already a report filed for this month. Please use the edit button to edit it. / Ya hay un informe presentado para este mes. Por favor, utilice el botón Editar para editarlo. '
      );
    } else {
          console.log('actual mentorGUId ' + this.mentorGUId);
      if (this.studentGUId !== null) {
        const link = [
          '/mentors/monthly-reports-ES-add',
          {
            mentorId: this.mentorId,
            mentorGUId: this.mentorGUId,
            studentGUId: this.studentGUId
          }
        ];
        console.log('navigating to ' + JSON.stringify(link));
        this.router.navigate(link);
      }
    }
  }

  monthlyReportEdit(mentorReportId: number) {
    console.log('in monthly-reports: monthlyReportEdit, ready to navigate');
    if (this.studentId !== null) {
      const target = '/mentors/monthly-reports-edit/' + mentorReportId;
      this.router.navigateByUrl(target);
    }
  }

}

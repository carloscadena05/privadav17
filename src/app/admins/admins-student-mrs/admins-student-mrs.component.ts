import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { MentorReport2DataService } from 'src/app/_shared/data/mentor-report2-data.service';
import { StudentState } from 'src/app/_store/student/student.state';
import { MentorReport2RPT } from '../../_shared/models/mentor-report2';
import { SessionService } from '../../_shared/services/session.service';
@Component({
    selector: 'app-admins-student-mrs',
    templateUrl: './admins-student-mrs.component.html',
    standalone: false
})
export class AdminsStudentMRsComponent implements OnInit {
  isLoading: boolean;
  errorMessage: string;

  studentId: number;
  studentGUId: string;
  // mentorId: number;
  mentorGUId: string;
  mentorReportId: number;
  mentorReports2: Array<MentorReport2RPT>;
  studentName: string;

  private subscription: Subscription;

   currentStudentName$ = this.store.select<string>(StudentState.getSelectedStudentName);
   currentStudentMentorGUId$ = this.store.select<string>(StudentState.getSelectedStudentMentorGUId);
   currentStudentGUId$ = this.store.select<string>(StudentState.getSelectedStudentGUId);

  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    public mentorReportData: MentorReport2DataService,
    public session: SessionService,
    public location: Location,
    private store: Store
  ) {}

  ngOnInit() {
    console.log('admins MRs ngOnInit');

    this.subscribeForStudentGUId(); // now calls
    this.subscribeForStudentName();
    // now nested below instead -- is there a better way? this.subscribeForStudentMentorGUId();
  }

  subscribeForStudentGUId() {
    this.subscription = this.currentStudentGUId$.subscribe((message) => {
      this.studentGUId = message;
      console.log('************NGXS: admins-student-mrs new StudentGUId received' + this.studentGUId);
      this.subscribeForStudentMentorGUId();
    });

  }

  subscribeForStudentMentorGUId() {
    this.subscription = this.currentStudentMentorGUId$.subscribe((message) => {
      this.mentorGUId = message;
      console.log('************NGXS: admins-student-mrs new StudentMentorGUId received' + this.mentorGUId);
      if (this.studentGUId && this.studentGUId !== '0000') {
        this.fetchFilteredData();
      }
    });
  }

  subscribeForStudentName() {
    this.subscription = this.currentStudentName$.subscribe((message) => {
      this.studentName = message;
      console.log('************NGXS: admins-student-mrs new StudentName received' + this.studentName);
    });
  }

  fetchFilteredData() {
    console.log('fetching data for mentorGUId ' + null+ ' and studentGUId  ' + this.studentGUId);
    this.isLoading = true;
    this.mentorReportData.getMentorReport2RPTsViaGUID(this.studentGUId, null).subscribe(
      (data) => {
        this.mentorReports2 = data;
      },
      (err) => console.error('Subscribe error: ' + err),
      () => {
        console.log('done: ');
        this.isLoading = false;
      }
    );
  }

  createProxyReport() {
    console.log('subscribed Proxy mentorGUId ' + this.mentorGUId);
    // console.log('studentDTO: mentorId ' + this.mentorId);
    const link = ['/mentors/monthly-reports-EN-add',
      {
        mentorId: 666, // not used
        mentorGUId: this.mentorGUId,
        studentGUId: this.studentGUId,
        byProxy: 1
      }
    ];
    console.log('navigating to ' + JSON.stringify(link));
    this.router.navigate(link);
  }
}

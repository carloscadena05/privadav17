import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { MentorReport2DataService } from 'src/app/_shared/data/mentor-report2-data.service';
import { StudentState } from 'src/app/_store/student/student.state';
import { SessionService } from '../../_shared/services/session.service';
@Component({
    selector: 'app-admins-student-qrs',
    templateUrl: './admins-student-qrs.component.html',
    standalone: false
})
export class AdminsStudentQRsComponent implements OnInit {
  isLoading: boolean;
  errorMessage: string;

  studentId: number;
  studentGUId: string;
  studentName: string;

  private subscription: Subscription;

   currentStudentName$ = this.store.select<string>(StudentState.getSelectedStudentName);
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
    console.log('admins QRs ngOnInit');
    this.subscribeForStudentNames();
  }

  subscribeForStudentNames() {
    this.studentName = 'unset';
    this.subscription = this.currentStudentName$.subscribe((message) => {
      this.studentName = message;
      console.log('************NGXS: admins-student-qrs new StudentName received' + this.studentName);
    });
  }

  gotoQR() {
    if (this.studentGUId !== '0000') {
      const link = [ 'quarterly/edit' ];
      console.log('navigating to ' + link);
      this.router.navigate(link);
    }
  }
}

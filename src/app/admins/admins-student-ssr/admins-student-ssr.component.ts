import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { StudentDataService } from 'src/app/_shared/data/student-data.service';
import { SponsorGroup } from 'src/app/_shared/models/sponsor-group';
import { SessionService } from '../../_shared/services/session.service';
import { StudentState } from '../../_store/student/student.state';
@Component({
    selector: 'app-admins-student-ssr',
    templateUrl: './admins-student-ssr.component.html',
    standalone: false
})
export class AdminsStudentSSRComponent implements OnInit {
  isLoading: boolean;
  errorMessage: string;

  studentId: number;
  studentGUId: string;
  studentName: string;
  sponsorGroup: SponsorGroup;

  private subscription: Subscription;

   currentStudentName$ = this.store.select<string>(StudentState.getSelectedStudentName);
   currentStudentGUId$ = this.store.select<string>(StudentState.getSelectedStudentGUId);
  sponsorGroupId: number;

  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    public studentData: StudentDataService,
    public session: SessionService,
    public location: Location,
    private store: Store
  ) {}

  ngOnInit() {
    console.log('admins SSR ngOnInit');
    this.subscribeForStudentNames();
    this.subscribeForStudentGUId();

  }

  fetchSponsorGroup() {
    this.studentData.getSponsorGroupForStudent(this.studentGUId).subscribe(
      (data) => {
        this.sponsorGroup = data;
        console.log('getSponsorGroupForStudent');
        console.log(this.sponsorGroup);
      },
      (err) => console.error('Subscribe error: ' + err),
      () => {
        console.log('sponsors-for-student-grid loaded ');
        if (this.sponsorGroup) {
          this.sponsorGroupId = this.sponsorGroup.sponsorGroupId;
        } else {
          this.errorMessage = 'No Assigned Sponsors.';
          // this.onNoAssignedStudents.emit();
          this.isLoading = false;
        }
      }
    );
  }




  subscribeForStudentNames() {
    this.studentName = 'unset';
    this.subscription = this.currentStudentName$.subscribe((message) => {
      this.studentName = message;
      console.log('************NGXS: admins-student-qrs new StudentName received' + this.studentName);
    });
  }

  subscribeForStudentGUId() {
    this.studentGUId = 'unset';
    this.subscription = this.currentStudentGUId$.subscribe((message) => {
      this.studentGUId= message;
      console.log('************NGXS: admins-student-qrs new StudentGUID received' + this.studentGUId);
      this.fetchSponsorGroup();
    });
  }

  createProxySSR() {
    console.log('subscribed Proxy studentGUId ' + this.studentGUId);

    let sponsorGroupId =  1168; // dummy value until code is eliminated
    const link = ['/students/self-reports-add',
      {
        sponsorGroupId: sponsorGroupId,
        studentGUId: this.studentGUId
      }
    ];
    console.log('navigating to ' + JSON.stringify(link));
    this.router.navigate(link);
  }

}

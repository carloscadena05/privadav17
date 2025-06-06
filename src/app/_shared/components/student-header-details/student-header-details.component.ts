import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { constants } from 'src/app/_shared/constants/constants';
import { SessionService } from 'src/app/_shared/services/session.service';
import { SetPhotoPathname } from 'src/app/_store/student/student.action';
import { StudentState } from 'src/app/_store/student/student.state';
import { StudentDataService } from '../../data/student-data.service';
import { StudentFlexiDTO } from '../../models/studentFlexiDTO';

@Component({
    selector: 'app-student-header-details',
    templateUrl: './student-header-details.component.html',
    standalone: false
})
export class StudentHeaderDetailsComponent implements OnInit {
  data: Object;
  loadingState = 0;
  submitted: boolean;
  bReadOnly = true;

  errorMessage: string;
  successMessage: string;
  isAdmin: boolean;
  student: StudentFlexiDTO;
  studentGUId: string;
  private subscription: Subscription;

   currentGUId$ = this.store.select<string>(StudentState.getSelectedStudentGUId);

  constructor(private store: Store,
    public session: SessionService,
    public studentData: StudentDataService,
    public location: Location) {
    console.log('hi from StudentHeaderDetails constructor');

    this.errorMessage = '';
    this.successMessage = '';
    this.submitted = false;
  }

  ngOnInit() {
    this.loadingState = 0;
    this.isAdmin = this.session.isAdmin();
    this.subscribeForStudentGUIds2();
  }

  subscribeForStudentGUIds2() {
    this.subscription = this.currentGUId$.subscribe((message) => {
      this.studentGUId = message;
      console.log('************NGXS: header details new StudentGUId received' + this.studentGUId);
      this.fetchData();
    });
  }

  fetchData() {
    if (this.studentGUId && this.studentGUId !== undefined && this.studentGUId !== '0000') {
      this.loadingState = 1;
      this.studentData.getStudentFlexiDTOViaGUID(this.studentGUId).subscribe(
        (data) => {
          this.student = data;
          console.log('header flexi: ' + this.student.educationalLevel);
          console.log('this.student.timelySSRStatus: ' + this.student.timelySSRStatus);
        },
        (err) => {
          this.errorMessage = err;
        },
        () => {
          this.loadingState = 2;
          this.store.dispatch(new SetPhotoPathname(this.student.photoUrl));
        }
      );
    }
  }
  getSSRTimelinessByColor(color: string): string {
    return 'Student ' + constants.timelinessMsgs.get(color);
  }
  getGradesTimelinessByColor(color: string): string {
    return 'Grades ' + constants.gradesTimelinessMsgs.get(color);
  }
  getGPAStatus(): string {
    return 'GPA: ' + this.student.gpaStatus;
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { UIState } from 'src/app/_store/ui/ui.state';
import { MentorDataService } from '../../data/mentor-data.service';
import { StudentDTO } from '../../models/studentDTO';
import { SessionService } from '../../services/session.service';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'students-for-mentor-list',
    templateUrl: './students-for-mentor-list.component.html',
    standalone: false
})
export class StudentsForMentorListComponent implements OnInit {
  students: Array<StudentDTO>;
  emojis: Array<string> = [];
  studentId: number;
  errorMessage = '';
  haveData: boolean;
  mentorGUId: string;
  mentorId: number;
  studentGUId: string;
  displayTestNames: boolean;

   testNameVisibility$ = this.store.select<boolean>(UIState.getTestNamesVisibility);

  constructor(
    public session: SessionService,
    private mentorData: MentorDataService,
    private router: Router,
    private currRoute: ActivatedRoute,
    private store: Store
  ) {
    console.log('in MentoredStudentComponent constructor');
  }

  public ngOnInit() {
    const bActiveOnly = false;
    this.haveData = false;
    this.mentorGUId = this.currRoute.snapshot.params['guid'];
    this.testNameVisibility$.subscribe((flag) => {
      this.displayTestNames = flag;
    });
    this.mentorData.getStudentsForMentorByGUId(this.mentorGUId, bActiveOnly).subscribe(
      (data) => {
        this.students = this.students = data.filter((item) => {
          if (this.displayTestNames) {
            return item;
          } else if (!this.displayTestNames && item.studentName.substring(0,5) !== '_Test') {
            return item;
          }
        });
        console.log(this.students);
        
      },
      (err) => console.error('Subscribe error: ' + err),
      () => {
        console.log('studentsForMentorList has All students: ' + this.students.length);
        if (this.students.length > 0) {
          // console.log(this.students[0].studentName);
          // console.log(this.students[0].studentGUId);
          this.haveData = true;
        } else {
          //
        }
      }
    );
  }
  gotoStudent(GUId: number) {
    const link = 'admins/students/student-container;guid=' + GUId;

    console.log('navigating to ' + link);
    this.router.navigateByUrl(link);
  }
  mentorReportsReview() {
    // const guid = this.currRoute.snapshot.params['guid'];
    this.router.navigate([
      '/admins/students/student/mentorReports/',
      { mentorId: this.mentorId, mentorGUId: this.mentorGUId, studentGUId: this.studentGUId }
    ]);
  }
}

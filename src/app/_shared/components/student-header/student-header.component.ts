import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StudentState } from 'src/app/_store/student/student.state';

@Component({
  selector: 'app-student-header',
  templateUrl: './student-header.component.html'
})
export class StudentHeaderComponent implements OnInit {
  private subscription: Subscription;
  public studentGUId: string;

   currentGUId$ = this.store.select<string>(StudentState.getSelectedStudentGUId);

  constructor(
    public router: Router // private selectedStudent: SelectedStudent
  ) {
    console.log('hi from student-header constructor');
  }

  ngOnInit() {
    this.subscribeForStudentGUIds2();
  }

  subscribeForStudentGUIds2() {
    this.subscription = this.currentGUId$.subscribe((message) => {
      this.studentGUId = message;
      console.log('************NGXS: header new StudentGUId received' + this.studentGUId);
    });
  }
}

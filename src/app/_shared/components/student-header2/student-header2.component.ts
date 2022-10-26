import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { StudentState } from 'src/app/_store/student/student.state';

@Component({
  selector: 'app-student-header2',
  templateUrl: './student-header2.component.html'
})
export class StudentHeader2Component implements OnInit {
  private subscription: Subscription;
  public studentGUId: string;

   currentGUId$ = this.store.select<string>(StudentState.getSelectedStudentGUId);

  constructor(
    public router: Router,
    private store: Store
  ) {
    console.log('hi from student-header constructor');
  }

  ngOnInit() {
    this.subscribeForStudentGUIds2();
  }

  subscribeForStudentGUIds2() {
    this.subscription = this.currentGUId$.subscribe((message) => {
      this.studentGUId = message;
      console.log('************NGXS: header2 new StudentGUId received' + this.studentGUId);
    });
  }
}

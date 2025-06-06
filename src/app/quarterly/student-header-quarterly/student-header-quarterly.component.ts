import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { StudentState } from 'src/app/_store/student/student.state';

@Component({
    selector: 'app-student-header-quarterly',
    templateUrl: './student-header-quarterly.component.html',
    standalone: false
})
export class StudentHeaderQuarterlyComponent implements OnInit {
  private subscription: Subscription;
  public studentGUId: string;

   currentGUId$ = this.store.select<string>(StudentState.getSelectedStudentGUId);

  constructor(private store: Store) {}

  ngOnInit() {
    this.subscribeForStudentGUIds2();
  }

  subscribeForStudentGUIds2() {
    // this.subscription = this.currentGUId$.subscribe((message) => {
    //   this.studentGUId = message;
    //   console.log('************NGXS: student-header new StudentGUId received' + this.studentGUId);
    // });
  }
}

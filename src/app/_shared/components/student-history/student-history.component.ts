import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { StudentDataService } from 'src/app/_shared/data/student-data.service';
import { Student } from 'src/app/_shared/models/student';
import { StudentState } from 'src/app/_store/student/student.state';

@Component({
    selector: 'app-student-history',
    templateUrl: './student-history.component.html',
    standalone: false
})
export class StudentHistoryComponent implements OnInit {
  myForm: UntypedFormGroup;
  private subscription: Subscription;
  public studentGUId: string;
  public isLoading = false;
  student: Student;
  submitted: boolean;
  errorMessage: string;
  successMessage: string;
  isSubmitted: boolean;

   currentGUId$ = this.store.select<string>(StudentState.getSelectedStudentGUId);

  constructor(
    public formBuilder: UntypedFormBuilder,
    public studentData: StudentDataService,
    private store: Store
  ) {
    console.log('hi from student-history constructor');

    this.myForm = formBuilder.group({

      studentHistory_Es: [{ value: '' }],
      studentHistory_En: [{ value: '' }]
    });


  }

  ngOnInit() {
    this.subscribeForStudentGUIds2();
    this.fetchStudentData();
  }

  subscribeForStudentGUIds2() {
    this.subscription = this.currentGUId$.subscribe((message) => {
      this.studentGUId = message;
      console.log('************NGXS: StudentHistory new StudentGUId received' + this.studentGUId);
    });
  }

  fetchStudentData() {
    console.log('fetching...');
    this.isLoading = true;
    this.studentData.getStudentViaGUID(this.studentGUId).subscribe(
      (data) => {
        this.student = data;
        console.log(this.student);
      },
      (err) => console.error('Subscribe error: ' + err),
      () => {

        console.log('student data loaded, StudentHistory_Es is: ');
        console.log(JSON.stringify(this.student.studentHistory_Es));
        this.setFormValues(this.student);

        this.isLoading = false;
      }
    );

    this.myForm.valueChanges.subscribe(() => {
      this.errorMessage = '';
      this.successMessage = '';
      this.submitted = false;
    });

  }

  setFormValues(student: Student) {
    console.log('setFormValues');
    this.myForm.setValue({
      studentHistory_Es: student.studentHistory_Es,
      studentHistory_En: student.studentHistory_En
    });
  }

  retrieveFormValues(): void {
    console.log('retrieveFormValues on enter has form values:');
    console.log( JSON.stringify(this.myForm.value));
    // use spread operator to merge changes:
    this.student = { ...this.student, ...this.myForm.value };
    console.log('student after retrieve FormValues merge');
    console.log(this.student);
  }


  onSubmit() {
    console.log('Hi from StudentHistory Submit');
    this.isLoading = true;
    this.retrieveFormValues();
    console.log('save');
    console.log(this.student);
    this.studentData.updateStudent(this.student).subscribe(
      () => {
        // console.log('subscribe result in updateStudent');
        // need timeout to avoid "Expression has changed error"
        window.setTimeout(() => {
          this.successMessage = 'Changes were saved successfully.';
        }, 0);
        // this.successMessage = 'Changes were saved successfully.';
        this.submitted = true;
        this.isLoading = false;
        window.scrollTo(0, 0);
        window.setTimeout(() => {
          // console.log('clearing success message');
          this.successMessage = '';
        }, 3000);
      },
      (error) => {
        this.errorMessage = error;
        this.isLoading = false;
      }
    );
    // prevent default action of reload
    return false;
  }



}

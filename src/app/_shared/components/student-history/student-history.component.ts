import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { StudentDataService } from 'src/app/_shared/data/student-data.service';
import { Student } from 'src/app/_shared/models/student';
import { StudentState } from 'src/app/_store/student/student.state';
import { ProviderService } from '../../services/provider.service';

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

  changed_en: boolean = false;
  changed_es: boolean = false;

  currentGUId$ = this.store.select<string>(StudentState.getSelectedStudentGUId);

  constructor(
    public formBuilder: UntypedFormBuilder,
    public studentData: StudentDataService,
    private store: Store,
    private provider: ProviderService
  ) {
    console.log('hi from student-history constructor');

    this.myForm = formBuilder.group({

      studentHistory_Es: [{ value: '' }],
      studentHistory_En: [{ value: '' }]
    });

    this.myForm.controls['studentHistory_Es'].valueChanges.subscribe(() => this.changed_es = true)
    this.myForm.controls['studentHistory_En'].valueChanges.subscribe(() => this.changed_en = true)
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
    }, {emitEvent: false});
  }

  retrieveFormValues(): void {
    console.log('retrieveFormValues on enter has form values:');
    console.log(JSON.stringify(this.myForm.value));
    // use spread operator to merge changes:
    this.student = { ...this.student, ...this.myForm.value };
    console.log('student after retrieve FormValues merge');
    console.log(this.student);
  }


  onSubmit() {
    console.log('Hi from StudentHistory Submit');
    // this.isLoading = true;
    this.retrieveFormValues();
    console.log('save');
    console.log(this.student);
    this.translate();
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


  async translate() {
    try {
      console.log(this.myForm.value, 'this.changed_es,', this.changed_es, 'this.changed_en);', this.changed_en);

      if (this.changed_es == true) {
        const translation_en = await this.provider.production<string>('GET', '/api/translate', {
          params: {
            sl: 'es',
            dl: 'en',
            text: this.myForm.value.studentHistory_Es
          }
        });
        console.log(translation_en);
        this.myForm.controls['studentHistory_En'].patchValue(translation_en['destination-text'], {emitEvent: false});
      }
      else if (this.changed_en == true) {
        const translation_es = await this.provider.production<string>('GET', '/api/translate', {
          params: {
            sl: 'en',
            dl: 'es',
            text: this.myForm.value.studentHistory_En
          }
        });
        console.log(translation_es);
        this.myForm.controls['studentHistory_Es'].patchValue(translation_es['destination-text'], {emitEvent: false});
      }
    } catch (error) {
      console.error('Error en traducción:', error);
    }
  }

}

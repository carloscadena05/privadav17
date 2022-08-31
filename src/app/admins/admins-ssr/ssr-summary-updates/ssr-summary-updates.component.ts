import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { StudentSelfReportDataService } from 'src/app/_shared/data/student-self-report-data.service';
import { SELECTITEM } from 'src/app/_shared/interfaces/SELECTITEM';
import { StudentSelfReport } from 'src/app/_shared/models/student-self-report';
import { SessionService } from 'src/app/_shared/services/session.service';
import { StudentState } from 'src/app/_store/student/student.state';

@Component({
  templateUrl: './ssr-summary-updates.component.html'
})
export class StudentSelfReportsSummaryUpdatesComponent implements OnInit {
  myForm: FormGroup;
  selfReport: StudentSelfReport;
  isLoading: boolean;
  submitted: boolean;
  errorMessage: string;
  successMessage: string;

  narrative_EnglishCtl: AbstractControl;
  narrative_SpanishCtl: AbstractControl;
  reviewedStatus: AbstractControl;
  highlightStatus: AbstractControl;

  studentName: string;
  private subscription: Subscription;
  followUpStatuses: SELECTITEM[];
  selectedYear: string;
  selectedMonth: string;
  selectedReviewedStatus: string;
  selectedFollowUpStatus: string;
  savedReviewedStatusId: number;
  savedHighlightStatusId: number;
  @Select(StudentState.getSelectedStudentName) currentName$: Observable<string>;

  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    public selfReportData: StudentSelfReportDataService,
    private _fb: FormBuilder,
    public session: SessionService
  ) {
    this.myForm = _fb.group({
      narrative_English: ['', { validators: [Validators.required], updateOn: 'blur' }],
      narrative_Spanish: ['']
    });

    this.narrative_EnglishCtl = this.myForm.controls['narrative_English'];
    this.narrative_SpanishCtl = this.myForm.controls['narrative_Spanish'];

    this.errorMessage = '';
    this.successMessage = '';
    this.submitted = false;
  }

  ngOnInit() {
    const studentSelfReportId = this.currRoute.snapshot.params['studentSelfReportId'];
    console.log('selfReportsUpdate ngOnInit with studentSelfReportId: ' + studentSelfReportId);

    this.isLoading = true;

    this.selfReportData.getStudentSelfReport(studentSelfReportId).subscribe(
      (data) => {
        this.selfReport = data;
      },
      (err) => console.error('Subscribe error: ' + err),
      () => {
        console.log('done with data SStudentSelfReport>>');
        console.log(this.selfReport);
        console.log('<<');
        this.narrative_EnglishCtl.setValue(this.selfReport.narrative_English);
        this.narrative_SpanishCtl.setValue(this.selfReport.narrative_Spanish);
        this.isLoading = false;
      }
    );

    this.myForm.valueChanges.subscribe(() => {
      this.errorMessage = '';
      this.successMessage = '';
      this.submitted = false;
      // console.log('form change event');
    });
    // AABBCCEE
    this.subscribeForStudentNames();
  }

  subscribeForStudentNames() {
    this.subscription = this.currentName$.subscribe((message) => {
      this.studentName = message;
      console.log('************NGXS: ssr updates new StudentName received' + this.studentName);
    });
  }
  onSubmit() {
    console.log('Hi from mentor ReportReview Submit');
    // console.log(this.mentorReport);

    if (this.myForm.invalid) {
      this.errorMessage = '';

      window.scrollTo(0, 0);
      return false;
    }

    this.selfReport.narrative_English = this.narrative_EnglishCtl.value;
    this.selfReport.narrative_Spanish = this.narrative_SpanishCtl.value;

    this.selfReportData.postStudentSelfReport(this.selfReport).subscribe(
      (student) => {
        console.log((this.successMessage = <any>student));
        this.submitted = true;
        this.isLoading = false;
        this.navigateBackInContext();
      },
      (error) => {
        this.errorMessage = error;
        this.isLoading = false;
      }
    );
    return false;
  }
  onCancel() {
    this.navigateBackInContext();
  }

  onDelete() {
    console.log('delete with userID = ' + this.session.getUserId());
    // eslint-disable-next-line eqeqeq
    if (this.session.getUserId() == 1216 || this.session.getUserId() == 2094 || this.session.getUserId() == 2947 || this.session.getUserId() == 2433 ) {
      const response = window.confirm(
        'Caution this action will permanently delete this mentor report! Proceed? ' +
          this.selfReport.studentSelfReportId
      );
      if (response === true) {
        this.selfReportData.deleteStudentSelfReport(this.selfReport.studentSelfReportId).subscribe(
          () => {
            alert('Successfully Deleted');
            this.navigateBackInContext();
          },
          (error) => {
            this.errorMessage = error;
            this.isLoading = false;
          }
        );
      }
    } else {
      alert(
        'This function is only available for Nora, Toño and Chris. Please ask one of them if you need to delete a report.'
      );
    }
    return false;
  }

  navigateBackInContext() {
    const target = '/becas/self-reports/tracking';
    console.log('after Submit or Cancel navigating to ' + target);
    const reportDate = new Date(this.selfReport.reportDateTime);

    let reportYear = reportDate.getFullYear();
    console.log('orig reportYear ' + reportYear);
    let reportMonth = reportDate.getMonth() + 1; // JS Date months are zero based
    console.log('orig reportMonth ' + reportMonth);
    if (reportDate.getDate() <= 2) {
      reportMonth--;
      if (reportMonth === 0) {
        reportMonth = 12;
        reportYear--;
      }
    }

    console.log('adj reportMonth ' + reportMonth);
    const navigationExtras: NavigationExtras = {
      queryParams: {
        id: 'id' + this.selfReport.studentSelfReportId
      }
    };
    console.log('after Submit or Cancele navigating to ' + target);
    console.log('with queryParams ' + navigationExtras.queryParams);
    this.router.navigate([target], navigationExtras);
  }

  validateEmojis(control: FormControl): { [error: string]: any } {
    // console.log('emoji validator ' + control.value);
    const rtnVal: any = control.value === 666 ? { validateEmojis: { valid: false } } : null;
    console.log(rtnVal);
    return rtnVal;
  }
  public hasChanges() {
    // if have changes then ask for confirmation
    // ask if form is dirty and has not just been submitted
    console.log('hasChanges has submitted ' + this.submitted);
    console.log('hasChanges has form dirty ' + this.myForm.dirty);
    console.log('hasChanges net is ' + this.myForm.dirty || this.submitted);
    return this.myForm.dirty && !this.submitted;
  }
}
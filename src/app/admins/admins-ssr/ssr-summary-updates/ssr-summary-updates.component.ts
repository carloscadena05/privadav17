import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Cancel01FreeIcons, Delete01FreeIcons, FloppyDiskFreeIcons } from '@hugeicons/core-free-icons';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { constants } from 'src/app/_shared/constants/constants';
import { StudentSelfReportDataService } from 'src/app/_shared/data/student-self-report-data.service';
import { SELECTITEM } from 'src/app/_shared/interfaces/SELECTITEM';
import { StudentSelfReport } from 'src/app/_shared/models/student-self-report';
import { SessionService } from 'src/app/_shared/services/session.service';
import { StudentState } from 'src/app/_store/student/student.state';

@Component({
  templateUrl: './ssr-summary-updates.component.html',
  standalone: false
})
export class StudentSelfReportsSummaryUpdatesComponent implements OnInit {
  myForm: UntypedFormGroup;
  selfReport: StudentSelfReport;
  isLoading: boolean;
  submitted: boolean;
  errorMessage: string;
  successMessage: string;

  narrative_EnglishCtl: AbstractControl;
  narrative_SpanishCtl: AbstractControl;
  reviewedStatus: AbstractControl;

  studentName: string;

  reviewedStatuses: SELECTITEM[];
  followUpStatuses: SELECTITEM[];
  selectedYear: string;
  selectedMonth: string;
  selectedReviewedStatus: string;
  selectedFollowUpStatus: string;
  savedReviewedStatusId: number;
  private subscription: Subscription;

  currentName$ = this.store.select<string>(StudentState.getSelectedStudentName);

  FloppyDiskFreeIcons = FloppyDiskFreeIcons;
  Cancel01FreeIcons = Cancel01FreeIcons;
  Delete01FreeIcons = Delete01FreeIcons

  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    public selfReportData: StudentSelfReportDataService,
    private _fb: UntypedFormBuilder,
    public session: SessionService,
    private store: Store
  ) {
    console.log('StudentSelfReportsSummaryUpdates constructor')

    this.reviewedStatuses = constants.reviewedStatuses;
    this.myForm = _fb.group({
      reviewedStatusSelector: [''],
      narrative_English: ['', { validators: [Validators.required], updateOn: 'blur' }],
      narrative_Spanish: ['']
    });

    this.reviewedStatus = this.myForm.controls['reviewedStatusSelector'];
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
        this.reviewedStatus.setValue(this.selfReport.reviewedStatusId);
        this.narrative_EnglishCtl.setValue(this.selfReport.narrative_English);
        this.narrative_SpanishCtl.setValue(this.selfReport.narrative_Spanish);
        this.isLoading = false;
        console.log(this.reviewedStatuses, this.myForm.value.reviewedStatusSelector);
        this.myForm.patchValue({reviewedStatusSelector: String(this.myForm.value.reviewedStatusSelector)})
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
    console.log('Hi from ssr ReportReview Submit');
    console.log(this.selfReport);

    if (this.myForm.invalid) {
      this.errorMessage = '';

      window.scrollTo(0, 0);
      return false;
    }
    this.selfReport.reviewedStatusId = this.reviewedStatus.value;
    this.selfReport.narrative_English = this.narrative_EnglishCtl.value;
    this.selfReport.narrative_Spanish = this.narrative_SpanishCtl.value;

    this.selfReportData.putStudentSelfReport(this.selfReport).subscribe(
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
    if (this.session.getUserId() == 1216 || this.session.getUserId() == 3377 || this.session.getUserId() == 2947 || this.session.getUserId() == 2433) {
      const response = window.confirm(
        'Caution this action will permanently delete this student report! Proceed? ' +
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
        'This function is only available for Lisa, Toño and Chris. Please ask one of them if you need to delete a report.'
      );
    }
    return false;
  }

  navigateBackInContext() {
    const target = '/admins/student-reports/summary-tracking';
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

  public hasChanges() {
    // if have changes then ask for confirmation
    // ask if form is dirty and has not just been submitted
    console.log('hasChanges has submitted ' + this.submitted);
    console.log('hasChanges has form dirty ' + this.myForm.dirty);
    console.log('hasChanges net is ' + this.myForm.dirty || this.submitted);
    return this.myForm.dirty && !this.submitted;
  }
}
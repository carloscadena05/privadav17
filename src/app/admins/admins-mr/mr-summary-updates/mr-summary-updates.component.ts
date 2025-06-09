import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { constants } from 'src/app/_shared/constants/constants';
import { MentorReport2DataService } from 'src/app/_shared/data/mentor-report2-data.service';
import { SELECTITEM } from 'src/app/_shared/interfaces/SELECTITEM';
import { MentorReport2RPT } from 'src/app/_shared/models/mentor-report2';
import { SessionService } from 'src/app/_shared/services/session.service';
import { StudentState } from 'src/app/_store/student/student.state';

@Component({
    templateUrl: './mr-summary-updates.component.html',
    styleUrls: ['../../../../assets/css/forms.scss'],
    standalone: false
})
export class MentorReportSummaryUpdatesComponent implements OnInit {
  myForm: UntypedFormGroup;
  mentorReport2: MentorReport2RPT;
  isLoading: boolean;
  submitted: boolean;
  errorMessage: string;
  successMessage: string;

  lastYearCtl: UntypedFormControl;
  lastMonthCtl: UntypedFormControl;
  emojiCtl: AbstractControl;
  narrative_EnglishCtl: AbstractControl;
  narrative_SpanishCtl: AbstractControl;
  lastYear: AbstractControl;
  lastMonth: AbstractControl;
  followUp: AbstractControl;
  success: AbstractControl;
  challenge: AbstractControl;
  summary: AbstractControl;
  reviewedStatus: AbstractControl;
  highlightStatus: AbstractControl;

  readonly contactYears: SELECTITEM[] = constants.contactYears;
  readonly contactMonths: SELECTITEM[] = constants.months;

  reviewedStatuses: SELECTITEM[];
  highlightStatuses: SELECTITEM[];
  followUpStatuses: SELECTITEM[];
  selectedYear: string;
  selectedMonth: string;
  selectedReviewedStatus: string;
  selectedFollowUpStatus: string;
  savedReviewedStatusId: number;
  savedHighlightStatusId: number;
  studentName: string;
  private subscription: Subscription;

   currentName$ = this.store.select<string>(StudentState.getSelectedStudentName);

  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    public mentorReportData: MentorReport2DataService,
    private _fb: UntypedFormBuilder,
    public session: SessionService,
    private store: Store
  ) {
    this.reviewedStatuses = constants.reviewedStatuses;
    this.highlightStatuses = constants.highlightStatuses;
    console.log('mr-summary-updates constructor');
    this.myForm = _fb.group({
      lastContactYearSelector: { value: '' },
      lastContactMonthSelector: { value: '' },

      inputSummary: [''], // ,Validators.compose([Validators.required, Validators.maxLength(2000)])],
      reviewedStatusSelector: [''],
      highlightStatusSelector: [''],
      inputEmoji: [666, { validators: [Validators.required, this.validateEmojis], updateOn: 'change' }],
      narrative_English: ['', { validators: [Validators.required], updateOn: 'blur' }],
      narrative_Spanish: ['']
    });
    console.log('mr-summary-updates constructor 2');
    this.summary = this.myForm.controls['inputSummary'];

    this.lastYearCtl = this.myForm.controls.lastContactYearSelector as UntypedFormControl;
    this.lastMonthCtl = this.myForm.controls.lastContactMonthSelector as UntypedFormControl;

    this.reviewedStatus = this.myForm.controls['reviewedStatusSelector'];
    this.highlightStatus = this.myForm.controls['highlightStatusSelector'];
    this.emojiCtl = this.myForm.controls['inputEmoji'];
    this.narrative_EnglishCtl = this.myForm.controls['narrative_English'];
    this.narrative_SpanishCtl = this.myForm.controls['narrative_Spanish'];
    this.mentorReport2 = new MentorReport2RPT(); // MentorReportResource();

    this.errorMessage = '';
    this.successMessage = '';
    this.submitted = false;
  }

  ngOnInit() {
    const mentorReportId = this.currRoute.snapshot.params['mentorReportId'];
    console.log('ngOnInit with MentorReportId: ' + mentorReportId);

    this.savedReviewedStatusId = this.currRoute.snapshot.params['reviewedStatus'];
    if (this.savedReviewedStatusId === undefined) {
      this.savedReviewedStatusId = 0;
    }

    this.savedHighlightStatusId = this.currRoute.snapshot.params['highlight'];
    if (this.savedHighlightStatusId === undefined) {
      this.savedHighlightStatusId = 0;
    }

    this.isLoading = true;
    this.mentorReportData.getMentorReport2(mentorReportId).subscribe(
      (data) => {
        this.mentorReport2 = data;
      },
      (err) => console.error('Subscribe error: ' + err),
      () => {
        console.log('done with dat MentorReport>>');
        console.log(this.mentorReport2);
        console.log('<<');
        this.lastMonthCtl.setValue(this.mentorReport2.lastContactMonth);
        this.lastYearCtl.setValue(this.mentorReport2.lastContactYear);
        this.reviewedStatus.setValue(this.mentorReport2.reviewedStatusId);
        this.emojiCtl.setValue(this.mentorReport2.emoji);
        this.narrative_EnglishCtl.setValue(this.mentorReport2.narrative_English);
        this.narrative_SpanishCtl.setValue(this.mentorReport2.narrative_Spanish);
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
      console.log('************NGXS: mr summary updates new StudentName received' + this.studentName);
    });
  }

  onSubmit() {
    console.log('Hi from mentor ReportReview Submit');
    // console.log(this.mentorReport);

    if (this.myForm.invalid) {
      this.errorMessage = '';

      if (!this.lastYear.valid || !this.lastMonth.valid) {
        this.errorMessage = this.errorMessage + 'Year and month must be selected from drop-downs. ';
      }

      if (!this.emojiCtl.valid) {
        this.errorMessage = this.errorMessage + 'An emoji must be selected. Se debe seleccionar un Emoji';
      }

      if (!this.followUp.valid || !this.success.valid || !this.challenge.valid) {
        this.errorMessage = this.errorMessage + 'All 3 text boxes must be filled in . ';
      }

      window.scrollTo(0, 0);
      return false;
    }

    this.mentorReport2.lastContactMonth = this.lastMonthCtl.value;
    this.mentorReport2.lastContactYear = this.lastYearCtl.value;
    this.mentorReport2.reviewedStatusId = this.reviewedStatus.value;
    this.mentorReport2.emoji = this.emojiCtl.value;
    this.mentorReport2.narrative_English = this.narrative_EnglishCtl.value;
    this.mentorReport2.narrative_Spanish = this.narrative_SpanishCtl.value;

    this.mentorReportData.updateMentorReport2(this.mentorReport2).subscribe(
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
    if (this.session.getUserId() == 1216 || this.session.getUserId() == 3377 || this.session.getUserId() == 2947 || this.session.getUserId() == 2433 ) {
      const response = window.confirm(
        'Caution this action will permanently delete this mentor report! Proceed? ' + this.mentorReport2.mentorReportId
      );
      if (response === true) {
        this.mentorReportData.deleteMentorReport2(this.mentorReport2.mentorReportId).subscribe(
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
    const target = '/admins/mentor-reports/summary-tracking';
    console.log('after Submit or Cancel navigating to ' + target);
    const reportDate = new Date(this.mentorReport2.reportDateTime);

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
        id: 'id' + this.mentorReport2.mentorReportId,
        year: reportYear,
        month: reportMonth,
        reviewedStatus: this.savedReviewedStatusId,
        highlight: this.savedHighlightStatusId
      }
    };
    console.log('after Submit or Cancele navigating to ' + target);
    console.log('with queryParams ' + navigationExtras.queryParams);
    this.router.navigate([target], navigationExtras);
  }

  validateEmojis(control: UntypedFormControl): { [error: string]: any } {
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

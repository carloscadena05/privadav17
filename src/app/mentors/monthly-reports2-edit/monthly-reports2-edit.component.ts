import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { MentorReport2DataService } from 'src/app/_shared/data/mentor-report2-data.service';
import { StudentState } from 'src/app/_store/student/student.state';
import { constants } from '../../_shared/constants/constants';
import { SELECTITEM } from '../../_shared/interfaces/SELECTITEM';
import { MentorReport2RPT } from '../../_shared/models/mentor-report2';
import { SessionService } from '../../_shared/services/session.service';

interface IValidationType {
  [error: string]: boolean | null;
}

@Component({
    templateUrl: '../monthly-reports2-edit/monthly-reports2-edit.component.html',
    standalone: false
})
export class MonthlyReports2EditComponent implements OnInit {
  myForm: UntypedFormGroup;
  mentorReport2: MentorReport2RPT = new MentorReport2RPT();
  isLoading: boolean;
  isSubmitted: boolean;

  lastYearCtl: AbstractControl;
  lastMonthCtl: AbstractControl;
  emojiCtl: AbstractControl;
  communicationCtl: UntypedFormControl;

  narrative_EnglishCtl: AbstractControl;
  narrative_SpanishCtl: AbstractControl;
  reportIdCtl: AbstractControl;

  errorMessage: string;
  successMessage: string;
  mentorReportId: number;
  studentName: string;
  monthValidationMessage = '';
  emojiValidationMessage = '';
  communicationValidationMessage = '';
  narrativeValidationMessage = '';
  subscription: Subscription;
  readonly contactYears: SELECTITEM[] = constants.contactYears;
  readonly contactMonths: SELECTITEM[] = constants.months;

   currentName$ = this.store.select<string>(StudentState.getSelectedStudentName);

  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    public mentorReportData: MentorReport2DataService,
    private _fb: UntypedFormBuilder,
    private session: SessionService,
    private store: Store
  ) {
    console.log('Hi from MonthlyReports2EditComponent');

    this.myForm = _fb.group({
      lastContactYearSelector: { value: '' + constants.currentContactYear, disabled: true },
      lastContactMonthSelector: { value: '' + constants.currentContactMonth, disabled: true },
      // use bogus integer value so change detection works:
      inputEmoji: [666, { validators: [Validators.required, this.validateEmojis] }],
      communicationEmoji: [666, { validators: [Validators.required, this.validateEmojis] }],

      narrative_English: ['', Validators.required],
      narrative_Spanish: [''],
      mentorReportId: [this.reportIdCtl]
    });

    // this.myForm.setValidators(this.validateNarrativeFields());

    this.lastYearCtl = this.myForm.controls['lastContactYearSelector'];
    this.lastMonthCtl = this.myForm.controls['lastContactMonthSelector'];
    this.emojiCtl = this.myForm.controls['inputEmoji'];
    this.communicationCtl = this.myForm.controls.communicationEmoji as UntypedFormControl;
    this.narrative_EnglishCtl = this.myForm.controls['narrative_English'];
    this.narrative_SpanishCtl = this.myForm.controls['narrative_Spanish'];
    this.reportIdCtl = this.myForm.controls['mentorReportId'];
    this.mentorReport2.reviewedStatusId = 2087; // needs review

    this.errorMessage = '';
    this.successMessage = '';
    this.isSubmitted = false;
  }

  ngOnInit() {
    console.log('monthlyReportsEdit ngOnInit');
    this.subscribeForStudentNames();
    // SQL Server will adjust the time to UTC by adding TimezoneOffset
    // we want to store local time so we adjust for that.
    const now = new Date();
    this.mentorReport2.reportDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    console.log('reportDateTime = ' + this.mentorReport2.reportDateTime);

    this.mentorReportId = this.currRoute.snapshot.params['mentorReportId'];
    console.log('calling sqlRenpsource with mentorReportId: ' + this.mentorReportId);
    this.isLoading = true;
    this.mentorReportData.getMentorReport2(this.mentorReportId).subscribe(
      (data) => {
        this.mentorReport2 = data;
      },
      (err) => console.error('Subscribe error: ' + err),
      () => {
        this.isLoading = false;
        console.log(
          '### after retreiving, set form controls to retreived mentorReport2-- reportId to ' + this.mentorReportId
        );
        this.reportIdCtl.setValue(this.mentorReportId);
        this.lastYearCtl.setValue(this.mentorReport2.lastContactYear);
        this.lastMonthCtl.setValue(this.mentorReport2.lastContactMonth);
        this.emojiCtl.setValue(this.mentorReport2.emoji);
        this.communicationCtl.setValue(this.mentorReport2.communication);

        this.narrative_EnglishCtl.setValue(this.mentorReport2.narrative_English);
        this.narrative_SpanishCtl.setValue(this.mentorReport2.narrative_Spanish);
      }
    );

    console.log('after init form values');
    this.myForm.valueChanges.subscribe(() => {
      this.errorMessage = '';
      this.successMessage = '';
      this.isSubmitted = false;
      // console.log('form change event');
      this.checkFormControlsAreValid(false);
    });

  }

  subscribeForStudentNames() {
    this.subscription = this.currentName$.subscribe((message) => {
      this.studentName = message;
      console.log('************NGXS: mr edit new StudentName received' + this.studentName);
    });
  }
  checkFormControlsAreValid(bSubmitting: boolean): boolean {
    // console.log('checking for valid form controls');
    let allCorrect = true;
    this.errorMessage = '';
    this.monthValidationMessage = '';
    this.emojiValidationMessage = '';
    this.narrativeValidationMessage = '';
    if (this.lastMonthCtl.invalid && (this.lastMonthCtl.dirty || bSubmitting)) {
      this.monthValidationMessage = 'Please select the correct month. Por favor selecciona el mes corecto';
      allCorrect = false;
    }
    if (this.emojiCtl.invalid && (this.emojiCtl.dirty || bSubmitting)) {
      this.emojiValidationMessage = 'An emoji must be selected. Se debe seleccionar un Emoji';
      allCorrect = false;
    }
    if (this.communicationCtl.invalid && (this.communicationCtl.dirty || bSubmitting)) {
      this.communicationValidationMessage = 'An emoji must be selected. Se debe seleccionar un Emoji';
      allCorrect = false;
    }
    if (this.narrative_EnglishCtl.invalid && (this.narrative_EnglishCtl.dirty || bSubmitting)) {
      this.narrativeValidationMessage = 'Description must be filled in. Descripcione debe rellenarse';
      allCorrect = false;
    }
    window.scrollTo(0, 0);
    return allCorrect;
  }
  onSubmit() {
    console.log('Hi from mentor Report2 Submit');

    if (!this.checkFormControlsAreValid(true)) {
      return;
    }

    console.log('###before submitting update model with form control values');
    this.mentorReport2.lastContactYear = this.lastYearCtl.value;
    this.mentorReport2.lastContactMonth = this.lastMonthCtl.value;
    this.mentorReport2.emoji = this.emojiCtl.value;
    this.mentorReport2.communication = this.communicationCtl.value;
    this.mentorReport2.narrative_English = this.narrative_EnglishCtl.value;
    this.mentorReport2.narrative_Spanish = this.narrative_SpanishCtl.value;
    this.mentorReport2.reviewedStatusId = 2087; // could have been ReadyForQR, so reset to NeedsReview

    this.mentorReportData.updateMentorReport2(this.mentorReport2).subscribe(
      (student) => {
        console.log((this.successMessage = <any>student));

        this.isLoading = false;
        // don't need to provide params, StudentGuid service will do the job
        const target = '/mentors';
        console.log('after call to editMentorReport; navigating to ' + target);
        this.router.navigateByUrl(target);
      },
      (error) => {
        this.errorMessage = error;
        this.isLoading = false;
      }
    );
    this.isSubmitted = true;
    return false;
  }

  onCancel() {
    // don't need to provide params, StudentGuid service will do the job
    const target = '/mentors';
    console.log('navigating to ' + target);
    this.router.navigateByUrl(target);
  }

  validateMonth(control: UntypedFormControl): IValidationType {
    // console.log('validateMonth has input ' + control.value);
    // tslint:disable-next-line: triple-equals
    if ('' + control.value === '0') {
      // can be either string or number
      console.log('validateMonth failed');
      return { validateMonth: true };
    } else {
      return null;
    }
  }

  validateEmojis(control: UntypedFormControl): IValidationType {
    // console.log('emoji validator ' + control.value);
    if (control.value === 666) {
      return { validateEmojis: true };
    } else {
      return null;
    }
  }

  public hasChanges() {
    // if have changes then ask for confirmation
    // ask if form is dirty and has not just been isSubmitted
    console.log('hasChanges has submitted ' + this.isSubmitted);
    console.log('hasChanges has form dirty ' + this.myForm.dirty);
    return this.myForm.dirty && !this.isSubmitted;
  }
}

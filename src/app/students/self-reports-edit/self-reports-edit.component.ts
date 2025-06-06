import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { StudentSelfReportDataService } from 'src/app/_shared/data/student-self-report-data.service';
import { StudentSelfReport } from 'src/app/_shared/models/student-self-report';
import { SetSelectedQRPeriod } from 'src/app/_store/ui/ui.action';
import { UIState } from 'src/app/_store/ui/ui.state';
import { constants } from '../../_shared/constants/constants';
import { SELECTITEM } from '../../_shared/interfaces/SELECTITEM';

@Component({
    templateUrl: './self-reports-edit.component.html',
    styleUrls: ['./self-reports-edit.component.css', '../../../assets/css/forms.css', '../students.component.css'],
    standalone: false
})
export class SelfReportsEditComponent implements OnInit {
  myForm: UntypedFormGroup;
  submitted: boolean;
  isLoading: boolean;
  errorMessage: string;
  successMessage: string;
  studentId: number;
  sponsorGroupName: string;
  sponsorGroupId: number;
  selfReport: StudentSelfReport;
  selfReportId: number;
  periodYears: SELECTITEM[];
  periodMonths: SELECTITEM[];
  readonly qrPeriods: SELECTITEM[] = constants.qrPeriods;
  readonly reviewedStatuses: SELECTITEM[] = constants.reviewedQRStatuses;
  selectedQRPeriod = '';
  subscription: Subscription;
  selectedQRPeriod$ = this.store.select<string>(UIState.getSelectedQRPeriod);
  errorAlert: boolean;
  successAlert: boolean;

  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    public ssrData: StudentSelfReportDataService,
    private _fb: UntypedFormBuilder,
    private store: Store
  ) {
    this.myForm = _fb.group({
      narrative_English: ['', { updateOn: 'blur' }],
      narrative_Spanish: ['', { validators: [Validators.required], updateOn: 'blur' }],
      selfReportId: ''
    });
  }

  ngOnInit() {
    this.selfReportId = this.currRoute.snapshot.params['selfReportId'];
    //console.log('ssr edit has selfReportId ' + this.selfReportId);

    this.isLoading = true;
    this.ssrData.getStudentSelfReport(this.selfReportId).subscribe(
      (data) => {
        this.selfReport = data;
        // //console.log(data.narrative_Spanish)
      },
      (err) => console.error('Subscribe error: ' + err),
      () => {
        this.isLoading = false;
        //console.log('### after retreiving, set form controls to retreived selfReport-- reportId to ' + this.selfReportId);
        this.myForm.controls['selfReportId'].setValue(this.selfReportId);
        this.myForm.controls['narrative_English'].setValue(this.selfReport.narrative_English);
        this.myForm.controls['narrative_Spanish'].setValue(this.selfReport.narrative_Spanish);
      }
    );
    this.subscribeForselectedQRPeriod();
  }

  subscribeForselectedQRPeriod() {
    this.subscription = this.selectedQRPeriod$.subscribe((message) => {
      this.selectedQRPeriod = message;
      //console.log('************NGXS: SSR Tracking new selectedQRPeriod received' + this.selectedQRPeriod);
    });
  }

  onSubmit() {
    //console.log('Hi fromself reports Submit');
    // //console.log(this.mentorReport);

    if (this.myForm.invalid) {
      this.errorMessage = '';

      // if (!this.myForm.controls.narrative_English.valid) {
      //   this.errorMessage = this.errorMessage + 'Description must be filled in. Descripcione debe rellenarse';
      // }
      window.scrollTo(0, 0);
      return false;
    }

    //console.log('###before submitting update model with form control values');

    this.selfReport.narrative_English = this.myForm.controls.narrative_English.value;
    this.selfReport.narrative_Spanish = this.myForm.controls.narrative_Spanish.value;
    ////console.log('reporte editado: ', this.selfReport)

    this.ssrData.putStudentSelfReport(this.selfReport).subscribe(
      (student) => {
        ////console.log((this.successMessage = <any>student));
        this.submitted = true;
        this.successAlert = true;

        this.isLoading = false;
        const target = '/students';
        //console.log('after call to editMentorReport; navigating to ' + target);

        window.setTimeout(() => {
          this.router.navigateByUrl(target);
        }, 3000);
      },
      (error = 'error') => {
        this.errorMessage = error;
        this.isLoading = false;
        this.errorAlert = true;
        this.submitted = false;
      }
    );
    return false;
  }

  onCancel() {
    const target = '/students';
    ////console.log('navigating to ' + target);
    this.router.navigateByUrl(target);
  }
  public hasChanges() {
    // if have changes then ask for confirmation
    // ask if form is dirty and has not just been submitted
    //console.log('hasChanges has submitted ' + this.submitted);
    //console.log('hasChanges has form dirty ' + this.myForm.dirty);
    //console.log('hasChanges net is ' + this.myForm.dirty || this.submitted);
    return this.myForm.dirty && !this.submitted;
  }

  setSelectedQRPeriod(yearPeriod: string) {
    this.store.dispatch(new SetSelectedQRPeriod(yearPeriod));
  }

  closeAlert(value: boolean) {
    this.errorAlert = value;
    this.successAlert = value;
  }
}

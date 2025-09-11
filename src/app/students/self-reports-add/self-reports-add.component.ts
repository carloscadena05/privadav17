import { Location } from '@angular/common';
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
    selector: 'app-self-reports-add',
    templateUrl: './self-reports-add.component.html',
    styleUrls: ['./self-reports-add.component.scss', '../../../assets/css/forms.scss', '../students.component.scss'],
    standalone: false
})
export class SelfReportsAddComponent implements OnInit {
  myForm: UntypedFormGroup;

  isLoading: boolean;
  submitted: boolean;
  errorMessage: string;
  successMessage: string;

  selfReport: StudentSelfReport;

  periodYears: SELECTITEM[];
  periodMonths: SELECTITEM[];
  qrPeriods: SELECTITEM[];
  readonly reviewedStatuses: SELECTITEM[] = constants.reviewedQRStatuses;
  selectedQRPeriod = '';
  subscription: Subscription;

  //  selectedQRPeriod$ = this.store.select<string>(UIState.getSelectedQRPeriod);
  selectedQRPeriod$ = this.store.select<string>(UIState.getSelectedQRPeriod);
  errorAlert: boolean;
  successAlert: boolean;

  constructor(
    public location: Location,
    public currRoute: ActivatedRoute,
    private router: Router,
    public ssrData: StudentSelfReportDataService,
    private _fb: UntypedFormBuilder,
    private store: Store
  ) {
    //console.log('Hi from SelfReportsAddComponent');
    this.subscribeForselectedQRPeriod();
    this.qrPeriods = constants.qrPeriods;
    console.log('qrPeriods: ' + this.qrPeriods);
    this.myForm = _fb.group({
      narrative_English: ['', { updateOn: 'blur' }],
      narrative_Spanish: ['', Validators.compose([Validators.required, Validators.maxLength(4500)])]
    });
    // this.myForm.controls.currentQRPeriod.disable();
    this.selfReport = new StudentSelfReport();
    this.selfReport.sponsorGroupId = 0;
    this.selfReport.reviewedStatusId = 2087;
    // SQL Server will adjust the time to UTC by adding TimezoneOffset
    // we want to store local time so we adjust for that.
    const now = new Date();
    this.selfReport.reportDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    //console.log(this.selfReport.reportDateTime);

    this.errorMessage = '';
    this.successMessage = '';
    this.submitted = false;

    //console.log('el reporte es', this.selfReport);

  }

  ngOnInit() {
    //console.log('selfReportsAdd ngOnInit');

    this.selfReport.sponsorGroupId = this.currRoute.snapshot.params['sponsorGroupId'];
    this.selfReport.studentGUId = this.currRoute.snapshot.params['studentGUId'];
    console.log('this.selectedQRPeriod ' + this.selectedQRPeriod);
    this.selfReport.reportYear = +this.selectedQRPeriod.substr(0, 4);
    this.selfReport.reportPeriod = +this.selectedQRPeriod.substr(5,1);
    console.log('year: ' + this.selfReport.reportYear + ' period: ' + this.selfReport.reportPeriod);
    this.selfReport.narrative_Spanish = '';
    // this.periodo = this.selfReport.reportPeriod;

    this.myForm.valueChanges.subscribe(() => {
      this.errorMessage = '';
      this.successMessage = '';
      this.submitted = false;
      // //console.log('form change event');
    });

  }

  subscribeForselectedQRPeriod() {
    //console.log('subscribing for selectedQRPeriod$');
    this.subscription = this.selectedQRPeriod$.subscribe((message) => {
      this.selectedQRPeriod = message;
      //console.log('************NGXS: SSR Add new selectedQRPeriod received ' + this.selectedQRPeriod);
    });
  }

  onSubmit() {
    console.log('Hi from self report Submit');

    if (this.submitted) {
      return false; // prevent dups
    }

    if (this.myForm.invalid) {
      // let i = 0;
      this.errorMessage = '';
      console.log('3')
      return false;
    }
    this.submitted = true; // need to set guard immediately to prevent dups

    this.selfReport.narrative_Spanish = this.myForm.controls.narrative_Spanish.value;

    this.ssrData.postStudentSelfReport(this.selfReport).subscribe(

      (student) => {
        ////console.log((this.successMessage = <any>student));
        // this.submitted = true;
        this.successAlert = true;

        this.isLoading = false;
        const target = '/students';
        //console.log('after call to postStudentSelfReports; navigating to ' + target);
        // because can be proxy from Admin we need to use location.back() not a fixed target
        // this.router.navigateByUrl(target);
        window.setTimeout(() => {
          this.location.back();
        }, 3000);
      },
      (error) => {
        //console.log(error)
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
    //console.log('navigating to ' + target);
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

  closeAlert(value: boolean){
    this.errorAlert = value;
    this.successAlert = value;
  }

}

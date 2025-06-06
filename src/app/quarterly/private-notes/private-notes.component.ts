import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { MiscDataService } from 'src/app/_shared/data/misc-data.service';
import { StudentState } from 'src/app/_store/student/student.state';
import { UIState } from 'src/app/_store/ui/ui.state';
import { QuarterlyDataService } from '../../_shared/data/quarterly-data.service';
import { QuarterlyReport } from '../../_shared/models/quarterly-report';
import { SessionService } from '../../_shared/services/session.service';

@Component({
    selector: 'app-private-notes',
    templateUrl: './private-notes.component.html',
    standalone: false
})
export class PrivateNotesComponent implements OnInit {
  isLoading: boolean;
  isSubmitted: boolean;
  errorMessage: string;
  successMessage: string;
  privateNotes: QuarterlyReport;
  quarterlyReportId: number;
  myForm: UntypedFormGroup;
  narrativeCtl: AbstractControl;
  reportIdCtl: AbstractControl;
  studentGUId: string;
  qrComponentsEditable: boolean;
  selectedQRPeriod = '';
  private subscription: Subscription;

   currentGUId$ = this.store.select<string>(StudentState.getSelectedStudentGUId);
   selectedQRPeriod$ = this.store.select<string>(UIState.getSelectedQRPeriod);
   qrComponentsEditable$ = this.store.select<boolean>(UIState.getQRComponentsEditable);

  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    public miscData: MiscDataService,
    private _fb: UntypedFormBuilder,
    public session: SessionService,
    public quarterlyData: QuarterlyDataService,
    private store: Store
  ) {
    this.myForm = _fb.group({
      narrative: [''],
      quarterlyReportId: [this.reportIdCtl]
    });

    this.narrativeCtl = this.myForm.controls['narrative'];
    this.reportIdCtl = this.myForm.controls['quarterlyReportId'];
  }
  ngOnInit() {
    this.qrComponentsEditable$.subscribe((flag) => {
      this.qrComponentsEditable = flag;

      if (this.qrComponentsEditable) {
        this.myForm.enable();
      } else {
        this.myForm.disable();
      }
    });

    // console.log('(((((((((((((((((PN ngOnInit)))))))))))))');
    this.subscribeForStudentGUIds2();
    this.subscribeForselectedQRPeriod();
  }

  subscribeForStudentGUIds2() {
    this.subscription = this.currentGUId$.subscribe((message) => {
      this.studentGUId = message;
      console.log('************NGXS: PN new StudentGUId received' + this.studentGUId);
      if (this.studentGUId && this.studentGUId !== '0000') {
        this.fetchFilteredData();
      }
    });
  }

  subscribeForselectedQRPeriod() {
    this.subscription = this.selectedQRPeriod$.subscribe((message) => {
      this.selectedQRPeriod = message;
      console.log('************NGXS: PN new selectedQRPeriod received' + this.selectedQRPeriod);
      this.fetchFilteredData();
    });
  }

  fetchFilteredData() {
    if (
      this.studentGUId &&
      this.studentGUId !== undefined &&
      this.studentGUId !== '0000' &&
      this.selectedQRPeriod !== ''
    ) {
      this.isLoading = true;
      this.quarterlyData
        .getPartialQuarterlyReportByPeriod('PN', this.studentGUId, this.selectedQRPeriod, '0')
        .subscribe(
          (data) => {
            this.privateNotes = data;
          },
          (err) => console.error('Subscribe error: ' + err),
          () => {
            this.isLoading = false;
            if (this.privateNotes && this.privateNotes.pN_Narrative && this.privateNotes.pN_Narrative.length > 0) {
              console.log('### after retreiving, set form controls to retreived selfReport');
              this.narrativeCtl.setValue(this.privateNotes.pN_Narrative);
            } else {
              console.log('no results returned');
              this.narrativeCtl.setValue('');
            }
          }
        );
    }
  }

  onSubmit() {
    if (this.myForm.invalid) {
      this.errorMessage = '';

      if (!this.narrativeCtl.valid) {
        this.errorMessage = this.errorMessage + 'Description must be filled in. Descripcione debe rellenarse';
      }
      window.scrollTo(0, 0);
      return false;
    }

    this.privateNotes.pN_Narrative = this.narrativeCtl.value;

    this.quarterlyData.updatePartialQuarterlyReport(this.privateNotes, 'PN').subscribe(
      () => {
        this.successMessage = 'Saved successfully / Guardar con exito';
        window.setTimeout(() => {
          this.successMessage = '';
          // const target = '/quarterly';
          // this.router.navigateByUrl(target);
        }, 1500);
        this.isSubmitted = true;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = error.message;
        this.isLoading = false;
      }
    );
    return false;
  }

  onCancel() {
    const target = '/quarterly';
    console.log('navigating to ' + target);
    this.router.navigateByUrl(target);
  }
}

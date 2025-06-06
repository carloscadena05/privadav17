import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { QRMini } from 'src/app/_shared/models/quarterly-reportRPT';
import { StudentState } from 'src/app/_store/student/student.state';
import { SetQRComponentsEditable, SetSelectedQRPeriod } from 'src/app/_store/ui/ui.action';
import { UIState } from 'src/app/_store/ui/ui.state';
import { constants } from '../../_shared/constants/constants';
import { QuarterlyDataService } from '../../_shared/data/quarterly-data.service';
import { SELECTITEM } from '../../_shared/interfaces/SELECTITEM';

@Component({
    selector: 'app-quarterly-container',
    templateUrl: './quarterly-container.component.html',
    standalone: false
})
export class QuarterlyContainerComponent implements OnInit {
  isLoading = false;
  errorMessage: string;
  successMessage: string;
  selectedQRPeriod = '';
  studentGUId: string;
  studentGUIdReceived: boolean;
  readonly qrPeriods: SELECTITEM[] = constants.qrPeriods;
  readonly reviewedStatuses: SELECTITEM[] = constants.reviewedQRStatuses;
  quarterlyReportGUId: string;
  selectedReviewedStatusID: string;
  qrMini = new QRMini();
  private subscription: Subscription;

   currentGUId$ = this.store.select<string>(StudentState.getSelectedStudentGUId);
   selectedQRPeriod$ = this.store.select<string>(UIState.getSelectedQRPeriod);

  constructor(private route: ActivatedRoute,
    public quarterlyData: QuarterlyDataService,
    public store: Store) {}

  ngOnInit() {
    console.log('QR containerInit');
    this.setQRComponentsEditible(true);
    this.subscribeForStudentGUIds2();
    this.subscribeForselectedQRPeriod();
  }

  subscribeForStudentGUIds2() {
    this.subscription = this.currentGUId$.subscribe((message) => {
      this.studentGUId = message;
      console.log('************NGXS: quarterlyContainer new StudentGUId received' + this.studentGUId);
      if (this.studentGUId && this.studentGUId !== '0000') {
        this.studentGUIdReceived = true;
        this.fetchFilteredData();
      }
    });
  }

  subscribeForselectedQRPeriod() {
    this.subscription = this.selectedQRPeriod$.subscribe((message) => {
      this.selectedQRPeriod = message;
      console.log('************NGXS: quarterlyContainer new selectedQRPeriod received' + this.selectedQRPeriod);
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
      this.quarterlyData.getQRMiniForStudentPeriod(this.studentGUId, this.selectedQRPeriod).subscribe(
        (data) => {
          this.qrMini = data;
          this.selectedReviewedStatusID = '' + this.qrMini.reviewedStatusId;
          console.log('+++++++++++++++++++++selectedReviewedStatusID ' + this.qrMini.reviewedStatusId);
          this.quarterlyReportGUId = this.qrMini.quarterlyReportGUId;
        },
        (err) => console.error('Subscribe error: ' + err),
        () => {
          this.isLoading = false;
        }
      );
    }
  }

  setStatusForQR(statusId: number) {
    console.log('selected reviewedStatusId: ' + statusId);

    this.quarterlyData.setQRReviewedStatus(this.quarterlyReportGUId, statusId).subscribe(
      () => {
        this.successMessage = 'Updated';
        window.setTimeout(() => {
          this.successMessage = '';
        }, 500);
      },
      (error) => {
        this.errorMessage = error;
        this.isLoading = false;
      }
    );
  }

  setSelectedQRPeriod(yearPeriod: string) {
    this.store.dispatch(new SetSelectedQRPeriod(yearPeriod));
    this.fetchFilteredData();
  }

  setQRComponentsEditible(qrComponentsEditable: boolean) {
    this.store.dispatch(new SetQRComponentsEditable(qrComponentsEditable));
  }
}

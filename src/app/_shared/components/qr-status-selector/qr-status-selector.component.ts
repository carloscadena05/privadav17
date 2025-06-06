import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { QuarterlyDataService } from 'src/app/_shared/data/quarterly-data.service';
import { QRMini } from 'src/app/_shared/models/quarterly-reportRPT';
import { StudentState } from 'src/app/_store/student/student.state';
import { UIState } from 'src/app/_store/ui/ui.state';
import { constants } from '../../constants/constants';
import { SELECTITEM } from '../../interfaces/SELECTITEM';
import { SessionService } from '../../services/session.service';

@Component({
    selector: 'app-qr-status-selector',
    templateUrl: './qr-status-selector.component.html',
    styleUrls: ['./qr-status-selector.component.css'],
    standalone: false
})
export class QrStatusSelectorComponent implements OnInit {
  isLoading = false;
  errorMessage: string;
  successMessage: string;
  qrMini: QRMini;
  readonly reviewedStatuses: SELECTITEM[] = constants.reviewedQRStatuses;
  studentGUId: string; // 'model' for this component
  private subscription: Subscription;
  selectedQRPeriod: '' | string;

   currentGUId$ = this.store.select<string>(StudentState.getSelectedStudentGUId);
   selectedQRPeriod$ = this.store.select<string>(UIState.getSelectedQRPeriod);

  constructor(
    public quarterlyData: QuarterlyDataService,
    // public selectedStudent: SelectedStudent,
    public session: SessionService,
    private store: Store
  ) {}

  ngOnInit() {
    this.qrMini = new QRMini();
    this.subscribeForStudentGUIds2();
    this.subscribeForselectedQRPeriod();
  }

  subscribeForStudentGUIds2() {
    this.subscription = this.currentGUId$.subscribe((message) => {
      this.studentGUId = message;
      console.log('************NGXS: statusSelector new StudentGUId received' + this.studentGUId);
      if (this.studentGUId && this.studentGUId !== '0000') {
        this.fetchData();
      }
    });
  }
  subscribeForselectedQRPeriod() {
    this.subscription = this.selectedQRPeriod$.subscribe((message) => {
      this.selectedQRPeriod = message;
      console.log('************NGXS: statusSelector new selectedQRPeriod received' + this.selectedQRPeriod);
      this.fetchData();
    });
  }

  fetchData() {
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
        },
        (err) => console.error('Subscribe error: ' + err),
        () => {
          this.isLoading = false;
          if (this.qrMini) {
            console.log('### after retreiving, grid to data ' + this.qrMini.quarterlyReportGUId);
          } else {
            console.log('no results returned');
          }
        }
      );
    }
  }

  setStatusForQR(statusId: number) {
    console.log('selected reviewedStatusId: ' + statusId);
    console.log('current RQGUID:' + this.qrMini.quarterlyReportGUId);

    this.quarterlyData.setQRReviewedStatus(this.qrMini.quarterlyReportGUId, statusId).subscribe(
      () => {
        this.successMessage = 'Updated';
        window.setTimeout(() => {
          // console.log('clearing success message');
          this.successMessage = '';
        }, 500);
      },
      (error) => {
        this.errorMessage = error;
        this.isLoading = false;
      }
    );
  }
}

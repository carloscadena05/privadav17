import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { QuarterlyReportRPT } from 'src/app/_shared/models/quarterly-reportRPT';
import { StudentState } from 'src/app/_store/student/student.state';
import { SetQRComponentsEditable, SetselectedQRPeriod } from 'src/app/_store/ui/ui.action';
import { UIState } from 'src/app/_store/ui/ui.state';
import { constants } from '../../_shared/constants/constants';
import { QuarterlyDataService } from '../../_shared/data/quarterly-data.service';
import { SELECTITEM } from '../../_shared/interfaces/SELECTITEM';

@Component({
  selector: 'app-quarterly-container',
  templateUrl: './quarterly-container.component.html'
})
export class QuarterlyContainerComponent implements OnInit {
  isLoading = false;
  errorMessage: string;
  successMessage: string;
  selectedQRPeriod = '';
  studentGUId: string;
  studentGUIdReceived: boolean;
  readonly activeQRPeriods: SELECTITEM[] = constants.activeQRperiods;
  readonly reviewedStatuses: SELECTITEM[] = constants.reviewedQRStatuses;
  quarterlyReportGUId: string;
  selectedReviewedStatusID: string;
  qrMini = new QuarterlyReportRPT();
  private subscription: Subscription;

  @Select(StudentState.getSelectedStudentGUId) currentGUId$: Observable<string>;
  @Select(UIState.getselectedQRPeriod) selectedQRPeriod$: Observable<string>;

  constructor(private route: ActivatedRoute, public quarterlyData: QuarterlyDataService, public store: Store) {}

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
      console.log('************NGXS: SR new selectedQRPeriod received' + this.selectedQRPeriod);
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

  setselectedQRPeriod(yearPeriod: string) {
    this.store.dispatch(new SetselectedQRPeriod(yearPeriod));
    this.fetchFilteredData();
  }

  setQRComponentsEditible(qrComponentsEditable: boolean) {
    this.store.dispatch(new SetQRComponentsEditable(qrComponentsEditable));
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { constants } from 'src/app/_shared/constants/constants';
import { StudentSelfReportDataService } from 'src/app/_shared/data/student-self-report-data.service';
import { SELECTITEM } from 'src/app/_shared/interfaces/SELECTITEM';
import { StudentMiniDTO } from 'src/app/_shared/models/studentMiniDTO';
import { StudentState } from 'src/app/_store/student/student.state';
import { SetSelectedQRPeriod } from 'src/app/_store/ui/ui.action';
import { UIState } from 'src/app/_store/ui/ui.state';

@Component({
    selector: 'app-ssr-missing',
    templateUrl: 'ssr-missing.component.html',
    styleUrls: ['ssr-missing.component.scss'],
    standalone: false
})
export class SSRMissingComponent implements OnInit {
  isLoading = false;
  errorMessage: string;
  successMessage: string;
  selectedQRPeriod = '';
  readonly qrPeriods: SELECTITEM[] = constants.qrPeriods;
  readonly reviewedStatuses: SELECTITEM[] = constants.reviewedQRStatuses;
  subscription: Subscription;
  studentMinis: StudentMiniDTO[];

   currentGUId$ = this.store.select<string>(StudentState.getSelectedStudentGUId);
   selectedQRPeriod$ = this.store.select<string>(UIState.getSelectedQRPeriod);

  constructor(
    public router: Router,
    public ssrData: StudentSelfReportDataService,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit() {
    this.subscribeForselectedQRPeriod();
  }

  subscribeForselectedQRPeriod() {
    this.subscription = this.selectedQRPeriod$.subscribe((message) => {
      this.selectedQRPeriod = message;
      console.log('************NGXS: SSR Tracking new selectedQRPeriod received' + this.selectedQRPeriod);
      this.fetchFilteredData();
    });
  }

  fetchFilteredData() {
    this.isLoading = true;
    console.log('in fetchData for missingStudentReportsByPeriod');
    this.ssrData.getMissingStudentSelfReportsByPeriod(this.selectedQRPeriod).subscribe(
      (data) => {
        console.log('missing studentReportByPeriod has');
        this.studentMinis = data;
        console.log(this.studentMinis);
      },
      (err) => console.error('Subscribe error: ' + err),
      () => {
        console.log('data loaded now set timeout for scroll');
        setTimeout(() => {
          this.scrollIntoView();
        }, 0);
        this.isLoading = false;
      }
    );
  }

  scrollIntoView() {
    console.log('in scrollIntoView');
    if (this.route.snapshot.queryParams['id']) {
      console.log(this.route.snapshot.queryParams['id']);
      const idSelector = '#' + this.route.snapshot.queryParams['id'];
      console.log('id param = ' + this.route.snapshot.queryParams['id']);
      const element = document.querySelector(idSelector);
      if (element) {
        console.log('querySelector returns element ' + element);
        element.scrollIntoView(true);
      }
    }
  }

  gotoStudent(guid: string, studentName: string) {
    console.log(studentName);
    const link = ['admins/students/student-container', { guid: guid }];

    console.log('navigating to ' + link);
    this.router.navigate(link);
  }

  setSelectedQRPeriod(yearPeriod: string) {
    this.store.dispatch(new SetSelectedQRPeriod(yearPeriod));
    // this.fetchFilteredData();
  }
}

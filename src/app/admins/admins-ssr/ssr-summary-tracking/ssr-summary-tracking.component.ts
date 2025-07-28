import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { constants } from 'src/app/_shared/constants/constants';
import { SetSelectedStudentIdentifiers } from 'src/app/_store/student/student.action';
import { SetSelectedQRPeriod } from 'src/app/_store/ui/ui.action';
import { StudentSelfReportDataService } from '../../../_shared/data/student-self-report-data.service';
import { SELECTITEM } from '../../../_shared/interfaces/SELECTITEM';
import { StudentSelfReport } from '../../../_shared/models/student-self-report';
import { UIState } from '../../../_store/ui/ui.state';
import { Alert02FreeIcons, DocumentValidationFreeIcons, Rocket01FreeIcons } from '@hugeicons/core-free-icons';

@Component({
    selector: 'app-ssr-summary-tracking',
    templateUrl: 'ssr-summary-tracking.component.html',
    styleUrls: ['ssr-summary-tracking.component.scss'],
    standalone: false
})
export class StudentSelfReportsTrackingComponent implements OnInit
{
  // implements OnInit {
  studentReportsByPeriod: StudentSelfReport[];
  isLoading: boolean;
  public errorMessage: string;
  successMessage: string;
  submitted: string;
  mentorReportStatuses: SELECTITEM[];
  years: SELECTITEM[];
  ssrReviewedStatuses: SELECTITEM[];
  selectedQRPeriod: string;
  selectedSSRReviewedStatus: string;
  readonly qrPeriods: SELECTITEM[] = constants.qrPeriods;
  readonly reviewedStatuses: SELECTITEM[] = constants.reviewedQRStatuses;
  displayOriginalFields = true;
  x: any;
  studentName: string;
  displayTestNames: boolean;
  subscription: Subscription;

   selectedQRPeriod$ = this.store.select<string>(UIState.getSelectedQRPeriod);
   testNameVisibility$ = this.store.select<boolean>(UIState.getTestNamesVisibility);

   DocumentValidationFreeIcons = DocumentValidationFreeIcons;
   Rocket01FreeIcons = Rocket01FreeIcons;
   Alert02FreeIcons = Alert02FreeIcons;

  constructor(
    public router: Router,
    private store: Store,
    public ssrData: StudentSelfReportDataService,
    private route: ActivatedRoute
  ) {
    console.log('ssr-summary-tracking constructor');
    this.years = constants.contactYears;

    this.ssrReviewedStatuses = constants.reviewedStatuses;

    this.selectedQRPeriod = '0'; // + today.getMonth() + 1;// '5';

    this.selectedSSRReviewedStatus = '0'; // this.mrReviewedStatuses[0].value;

  }

  ngOnInit(): void {
    this.testNameVisibility$.subscribe((flag) => {
      this.displayTestNames = flag;
    });
    this.subscribeForselectedQRPeriod();
  }

  subscribeForselectedQRPeriod() {
    this.subscription = this.selectedQRPeriod$.subscribe((message) => {
      this.selectedQRPeriod = message;
      console.log('************NGXS: SSR Tracking new selectedQRPeriod received' + this.selectedQRPeriod);
      if (this.selectedQRPeriod!== undefined && this.selectedQRPeriod> '0') {
        this.fetchFilteredData();
      }
    });
  }

  fetchFilteredData() {
    this.isLoading = true;
    console.log('in fetchData for StudentSelfReportsByPeriod with selectedQRPeriod ' + this.selectedQRPeriod);
    this.ssrData
      .getStudentSelfReportsByPeriod(
        this.selectedQRPeriod,
        this.selectedSSRReviewedStatus,
        null
      )
      .subscribe(
        (data) => {
          console.log(data);
          
          this.studentReportsByPeriod = data.filter((item) => {
            if (this.displayTestNames) {
              return item;
            } else if (!this.displayTestNames && item.studentName.substring(0,5) !== '_Test') {
              return item;
            }
          });
          console.log('StudentSelfReportByPeriod has');
          console.log(this.studentReportsByPeriod[0]);
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

  setSelectedYearPeriod(yearPeriod: string) {
    this.selectedQRPeriod = yearPeriod;
    this.fetchFilteredData();
  }

  gotoStudent(studentGUId: string, studentName: string) {
    console.log('setting studentName to ' + studentName);
    this.store.dispatch(new SetSelectedStudentIdentifiers({ studentGUId, studentName }));
    const link = ['admins/students/student-container', { guid: studentGUId }];

    console.log('navigating to ' + link);
    this.router.navigate(link);
  }

  updateSSRTracking(id: number, studentGUId: string, studentName: string) {
    this.store.dispatch(new SetSelectedStudentIdentifiers({ studentGUId, studentName }));

    console.log(studentName);
    console.log(id);
    const link: [string, { studentSelfReportId: number }] = [
      '/admins/student-reports/summary-updates',
      {
        studentSelfReportId: id
      }
    ];

    console.log('navigating to ' + link);
    this.router.navigate(link);
  }

  translationNeeded(lang1: number, lang2: number): string {
    console.log(lang1, lang2);
    return lang1 === lang2 ? '' : 'Translation Needed';
  }

  setSelectedQRPeriod(yearPeriod: string) {
    console.log('selectionchange', yearPeriod);
    
    this.store.dispatch(new SetSelectedQRPeriod(yearPeriod));
    this.fetchFilteredData();
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { constants } from 'src/app/_shared/constants/constants';
import { MentorReport2DataService } from 'src/app/_shared/data/mentor-report2-data.service';
import { SELECTITEM } from 'src/app/_shared/interfaces/SELECTITEM';
import { MentorReport2RPT } from 'src/app/_shared/models/mentor-report2';
import { SetSelectedStudentIdentifiers } from 'src/app/_store/student/student.action';
import { UIState } from 'src/app/_store/ui/ui.state';

@Component({
    selector: 'app-mr-summary-tracking',
    templateUrl: 'mr-summary-tracking.component.html',
    styleUrls: ['mr-summary-tracking.component.css'],
    standalone: false
})
export class MentorReportsSummaryTrackingComponent implements OnInit
{
  // implements OnInit {
  mentorReportByMonth: MentorReport2RPT[];
  isLoading: boolean;
  emojis: Array<string>;
  public errorMessage: string;
  successMessage: string;
  submitted: string;
  mentorReportStatuses: SELECTITEM[];
  years: SELECTITEM[];
  months: SELECTITEM[];
  mrReviewedStatuses: SELECTITEM[];
  communicationStatuses: SELECTITEM[];
  highlightStatuses: SELECTITEM[];
  selectedYear: string;
  selectedMonth: string;
  selectedMRReviewedStatus: string;
  selectedCommunicationStatus: string;
  selectedHighlightStatus: string;
  displayOriginalFields = true;
  x: any;
  studentName: string;
  displayTestNames: boolean;

   testNameVisibility$ = this.store.select<boolean>(UIState.getTestNamesVisibility);

  constructor(
    public router: Router,

    public store: Store,
    public mentorReport2Data: MentorReport2DataService,
    private route: ActivatedRoute
  ) {
    console.log('mr-summary-tracking constructor');
    this.years = constants.contactYears;
    this.months = constants.months;

    this.mrReviewedStatuses = constants.reviewedStatuses;
    this.communicationStatuses = constants.communicationStatuses;
    this.highlightStatuses = constants.highlightStatuses;

    this.selectedYear = '' + constants.currentContactYear; // '' + today.getFullYear(); //
    this.selectedMonth = '0'; // + today.getMonth() + 1;// '5';

    this.selectedMRReviewedStatus = '0';
    this.selectedCommunicationStatus = '0';
    this.selectedHighlightStatus = this.highlightStatuses[0].value;

    this.emojis = constants.emojis;
    console.log('before process route params');
    this.processRouteParams();


  }

  ngOnInit(): void {
    this.testNameVisibility$.subscribe((flag) => {
      this.displayTestNames = flag;
    });
  }

  processRouteParams() {
    console.log('summaryTracking setting filters form queryParams');

    const year = this.route.snapshot.queryParams['year'];
    console.log('year param = ' + year);
    if (year !== undefined) {
      this.selectedYear = year;
    }

    let month = this.route.snapshot.queryParams['month'];
    console.log('month param = ' + month);
    if (month !== undefined) {
      this.selectedMonth = month;
    } else {
      // const x: Date;
      const x: Date = new Date();
      console.log(x);
      const y = this.addDays(x, -2);
      console.log(y);
      month = '' + (y.getMonth() + 1);
      this.selectedMonth = month;
    }

    const reviewedStatus = this.route.snapshot.queryParams['reviewedStatus'];
    console.log('reviewed param = ' + reviewedStatus);
    if (reviewedStatus !== undefined) {
      this.selectedMRReviewedStatus = reviewedStatus;
    } else {
      this.selectedMRReviewedStatus = '0';
    }

    const communicationStatus = this.route.snapshot.queryParams['communicationStatus'];
    console.log('reviewed param = ' + communicationStatus);
    if (communicationStatus !== undefined) {
      this.selectedCommunicationStatus = communicationStatus;
    } else {
      this.selectedCommunicationStatus = '0';
    }

    const highlight = this.route.snapshot.queryParams['highlight'];
    console.log('highlight param = ' + highlight);
    if (highlight !== undefined) {
      this.selectedHighlightStatus = highlight;
    } else {
      this.selectedHighlightStatus = '0';
    }

    if (month !== undefined && month > 0) {
      this.fetchFilteredData();
    }
  }

  fetchFilteredData() {
    this.isLoading = true;
    console.log('in fetchData for MentorReportsByMonth');
    this.mentorReport2Data
      .getMentorReportsByMonth(this.selectedYear, this.selectedMonth, this.selectedMRReviewedStatus)
      .subscribe(
        (data) => {
          this.mentorReportByMonth = data.filter((item) => {
            if (this.displayTestNames) {
              return item;
            } else if (!this.displayTestNames && item.studentName.substring(0,5) !== '_Test') {
              return item;
            }
          });
          console.log('mentorReportByMonth has');
          console.log(this.mentorReportByMonth[0]);
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

  setSelectedMRReviewedStatus(status: string) {
    this.selectedMRReviewedStatus = status;
    this.fetchFilteredData();
  }

  setSelectedCommunicationStatus(status: string) {
    this.selectedCommunicationStatus = status;
    this.fetchFilteredData();
  }

  setSelectedHighlightStatus(status: string) {
    this.selectedHighlightStatus = status;
    this.fetchFilteredData();
  }

  setSelectedYear(year: string) {
    this.selectedYear = year;
    this.fetchFilteredData();
  }
  setSelectedMonth(month: string) {
    this.selectedMonth = month;
    this.fetchFilteredData();
  }

  gotoStudent(studentGUId: string, studentName: string) {
    console.log('setting studentName to ' + studentName);
    this.store.dispatch(new SetSelectedStudentIdentifiers({ studentGUId, studentName }));
    const link = ['admins/students/student-container', { guid: studentGUId }];

    console.log('navigating to ' + link);
    this.router.navigate(link);
  }
  gotoMentor(guid: string) {
    const link = ['admins/members/member', { guid: guid }];

    console.log('navigating to ' + link);
    this.router.navigate(link);
  }

  updateSummaryTracking(id: number, studentGUId: string, studentName: string) {
    // AABBCCDD
    this.store.dispatch(new SetSelectedStudentIdentifiers({ studentGUId, studentName }));

    console.log('updateSummaryTracking for ' + studentName);
    const link: [string, { mentorReportId: number; reviewedStatus: string; highlight: string }] = [
      '/admins/mentor-reports/summary-updates',
      {
        mentorReportId: id,
        reviewedStatus: this.selectedMRReviewedStatus,
        highlight: this.selectedHighlightStatus
      }
    ];

    console.log('navigating to ' + link);
    this.router.navigate(link);
  }

  translationNeeded(lang1: number, lang2: number): string {
    console.log(lang1, lang2);
    return lang1 === lang2 ? '' : 'Translation Needed';
  }

  getHighlightColor(highlightStatusId: number): string {
    if (highlightStatusId === 2106) {
      // console.log('returning ' + 'green-row');
      return 'green-row';
    } else if (highlightStatusId === 2105) {
      return 'red-row';
    } else {
      return '';
    }
  }
  addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}

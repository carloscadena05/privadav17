import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { BecaDataService } from 'src/app/_shared/data/beca-data.service';
import { PROCESSINGPERIOD } from 'src/app/_shared/interfaces/PROCESSINGPERIOD';
import { GradesGivenEntryDTO } from 'src/app/_shared/models/grades-given-entryDTO';
import { UrlService } from 'src/app/_shared/services/url.service';
import { SetSelectedStudentIdentifiers } from 'src/app/_store/student/student.action';
import { SetSelectedGradesPeriodId } from 'src/app/_store/ui/ui.action';
import { UIState } from 'src/app/_store/ui/ui.state';
import { constants } from '../../_shared/constants/constants';
import { SELECTITEM } from '../../_shared/interfaces/SELECTITEM';
import { SORTCRITERIA } from '../../_shared/interfaces/SORTCRITERIA';
import { StudentDTO } from '../../_shared/models/studentDTO';
import { ColumnSortService } from '../../_shared/services/column-sort.service';
import { SessionService } from '../../_shared/services/session.service';

@Component({
    templateUrl: './grades-list.component.html',
    styleUrls: ['./grades-list.component.scss'],
    standalone: false
})
export class GradesListComponent implements OnInit {
  studentDTO: StudentDTO;
  gradesGivenEntryDTOs: GradesGivenEntryDTO[];
  isLoading: boolean;
  errorMessage: string;
  successMessage: string;
  readonly paymentStatuses: SELECTITEM[] = constants.becaPaymentStatuses;
  years: SELECTITEM[];
  months: SELECTITEM[];
  gradesProcessingPeriods: PROCESSINGPERIOD[];
  selectedYear: string;
  selectedMonth: string;
  displayTestNames: boolean;
  staticUrlPrefix: string;
  periodStart: string;
  private subscription: Subscription;

   testNameVisibility$ = this.store.select<boolean>(UIState.getTestNamesVisibility);
   selectedGradesPeriodId$ = this.store.select<string>(UIState.getSelectedGradesPeriodId);
   selectedGradesPeriodId = '';
   entryStartDate: string;
   entryEndDate: string;

  constructor(
    public becaData: BecaDataService,
    public router: Router,
    private store: Store,
    private session: SessionService,
    private columnSorter: ColumnSortService,
    private url: UrlService
  ) {
    this.staticUrlPrefix = url.getStaticFilePrefix();

    this.years = constants.contactYears;
    this.months = constants.months;
    this.gradesProcessingPeriods = constants.gradesProcessingPeriods;
    this.isLoading = false;
  }

  ngOnInit() {
    this.testNameVisibility$.subscribe((flag) => {
      this.displayTestNames = flag;
    });
    this.subscribeForselectedGradesPeriodId();
  }

  subscribeForselectedGradesPeriodId() {
    this.subscription = this.selectedGradesPeriodId$.subscribe((message) => {
      this.selectedGradesPeriodId = message;
      console.log('************NGXS: GradesList new selectedGradesPeriodId received' + this.selectedGradesPeriodId);
      this.fetchFilteredData();
    });
  }

  fetchFilteredData() {
    this.isLoading = true;
    console.log('fetchFilteredData with displayTestNames: ' + this.displayTestNames);
    this.becaData.getGradesListForPeriod(+this.selectedGradesPeriodId).subscribe(
      (data) => {
        this.gradesGivenEntryDTOs = data.filter((item) => {
          if (this.displayTestNames) {
            return item;
          } else if (!this.displayTestNames && item.studentName.substring(0,5) !== '_Test') {
            return item;
          }
        });
      },
      (err) => {
        this.errorMessage = err;
      },
      () => {
        console.log(this.gradesGivenEntryDTOs[0]);
        console.log('before updateDateIndicators');
        this.updateDateIndicators();
        console.log('data loaded now set timeout for scroll');
        setTimeout(() => {
          this.scrollIntoView();
        }, 0);
        this.isLoading = false;
      }
    );
  }

  scrollIntoView() {
    const element = document.body;
    if (element) {
      element.scrollIntoView(true);
    }
  }

  setSelectedGradesPeriodId(gradesPeriodId: string) {

    this.store.dispatch(new SetSelectedGradesPeriodId(gradesPeriodId));
    this.selectedGradesPeriodId = gradesPeriodId;
  }


  updateDateIndicators(): void {
    console.log('selectedGradesPeriodId is ' + this.selectedGradesPeriodId);
    // console.log('gradesEntryDTOs is ' + JSON.stringify(this.gradesEntryDTOs));
    const selectedGradeEntry = this.gradesGivenEntryDTOs.find(
      period => period.academicTermId === +this.selectedGradesPeriodId
    );
    console.log('selectedGradeEntry is ' + JSON.stringify(selectedGradeEntry));

    if (selectedGradeEntry) {
      this.entryStartDate = selectedGradeEntry.gradesEntryStartDate.split('T')[0];
      this.entryEndDate = selectedGradeEntry.gradesEntryEndDate.split('T')[0];
    } else {
      this.entryStartDate = '';
      this.entryEndDate = '';
    }
  }

  editGradeEntryDetails(studentGUId: string, studentName: string) {
    this.store.dispatch(new SetSelectedStudentIdentifiers({ studentGUId, studentName }));
    const link = ['becas/grades-edit']; // , { guid: guid }];

    console.log('navigating to ' + link);
    this.router.navigate(link);
  }

  gotoStudent(studentGUId: string, studentName: string) {
    this.store.dispatch(new SetSelectedStudentIdentifiers({ studentGUId, studentName }));
    const link = ['admins/students/student-container', { guid: studentGUId }];
    console.log('navigating to ' + link);
    this.router.navigate(link);
  }

  isViewLinkHidden(imageSubmittedDate: any) {
    return (imageSubmittedDate === '1900-01-01T00:00:00');
  }

  public onSortColumn(sortCriteria: SORTCRITERIA) {
    console.log('parent received sortColumnCLick event with ' + sortCriteria.sortColumn);
    return this.gradesGivenEntryDTOs.sort((a, b) => this.columnSorter.compareValues(a, b, sortCriteria));
  }

  onSorted($event) {
    console.log('sorted event received');
    console.log($event);
  }
}

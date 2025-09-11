import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
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
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

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

  displayedColumns = ["index", "Profile", "studentName", "gradesTurnedInDate", "imageSubmittedDate", "open", "confirmedDate", "gradesTurnedInStatus", "gradePointAvgStatus"]
  dataSource: MatTableDataSource<GradesGivenEntryDTO>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('documentation') myDialogTemplate!: TemplateRef<any>;

  paginated_items: any[] = [];

  page_size = 1;
  current_page = 0;
  total_items = 0;


  constructor(
    public becaData: BecaDataService,
    public router: Router,
    private store: Store,
    private session: SessionService,
    private columnSorter: ColumnSortService,
    private url: UrlService,
    private dialog: MatDialog
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
          } else if (!this.displayTestNames && item.studentName.substring(0, 5) !== '_Test') {
            return item;
          }
        });

        this.dataSource = new MatTableDataSource(this.gradesGivenEntryDTOs);


        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 300);
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
    return (imageSubmittedDate == '1900-01-01T00:00:00') || !imageSubmittedDate || imageSubmittedDate == '' || imageSubmittedDate == null;
  }

  public onSortColumn(sortCriteria: SORTCRITERIA) {
    console.log('parent received sortColumnCLick event with ' + sortCriteria.sortColumn);
    return this.gradesGivenEntryDTOs.sort((a, b) => this.columnSorter.compareValues(a, b, sortCriteria));
  }

  onSorted($event) {
    console.log('sorted event received');
    console.log($event);
  }

  value_select(a: any, b: any): boolean {
    return a == b;
  }

  rows_with_evidence() {
    return this.dataSource.data.filter((value: GradesGivenEntryDTO) => !(this.isViewLinkHidden(value.imageSubmittedDate) && this.isViewLinkHidden(value.gradesTurnedInDate)) && value.confirmedDate)
  }

  open_documentation_dialog(data: GradesGivenEntryDTO): void {
    this.dialog.open(this.myDialogTemplate, {
      height: '75%',
      width: '75%'
    });
    this.current_page = this.rows_with_evidence().findIndex((row: GradesGivenEntryDTO) => row.studentGradeId == data.studentGradeId)
    this.updatePaginated_items();

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onPageChange(event: PageEvent) {
    this.current_page = event.pageIndex;
    this.page_size = event.pageSize;
    this.updatePaginated_items();
  }

  updatePaginated_items() {
    const startIndex = this.current_page * this.page_size;
    const endIndex = startIndex + this.page_size;
    this.paginated_items = this.rows_with_evidence().slice(startIndex, endIndex);
  }

  confirm_and_next(ev: any) {
    this.current_page++;
    this.updatePaginated_items()
    let confirmed_evidence = this.rows_with_evidence().find((evidence: any) => evidence.studentGradeId == ev.studentGradeId) as any;
    confirmed_evidence.confirmedById = this.session.getUserId();
    confirmed_evidence.confirmedDate = new Date()
    console.log(confirmed_evidence);
    
    this.becaData.updateStudentGrades(confirmed_evidence).subscribe(
      (gradeRowData) => {
        console.log('subscribe result in updateGradeRowData');
        console.log(JSON.stringify(gradeRowData));
        // need timeout to avoid "Expression has changed error"
        window.setTimeout(() => {
          this.successMessage = 'Changes were saved successfully.';
        }, 0);

        this.isLoading = false;
        window.scrollTo(0, 0);
        window.setTimeout(() => {
          // console.log('clearing success message');
          this.successMessage = '';
        }, 3000);
      },
      () => {
        this.errorMessage = 'Confirmed By must be selected. Also Turned-in Date be filled in';
        this.isLoading = false;
      }
    );
  }

  color(r: string | number, maxScale: number = 10): string {
    if (typeof r === "string") {
      r = parseFloat(r);
    }

    // Convertir a base 100
    r = (r / maxScale) * 100;
    r = Math.max(0, Math.min(100, r));

    const i = {
      r: 235,
      g: 64,
      b: 52
    };

    if (r === 0) {
      return `rgb(${i.r}, ${i.g}, ${i.b})`;
    } else if (r < 66) {
      return `rgb(${i.r}, ${(255 - i.g) * (r / 100) + i.g}, ${i.b})`;
    } else {
      return `rgb(${i.r - i.r * (r / 100)}, ${(255 - i.g) * (r / 100) + i.g - 50}, ${i.b})`;
    }
  }
}

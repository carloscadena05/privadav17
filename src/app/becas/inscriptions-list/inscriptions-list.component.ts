import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { PROCESSINGPERIOD } from 'src/app/_shared/interfaces/PROCESSINGPERIOD';
import { constants } from '../../_shared/constants/constants';
import { InscriptionDataService } from '../../_shared/data/inscription-data.service';
import { SELECTITEM } from '../../_shared/interfaces/SELECTITEM';
import { SORTCRITERIA } from '../../_shared/interfaces/SORTCRITERIA';
import { InscriptionEntryDTO } from '../../_shared/models/inscription-entryDTO';
import { StudentDTO } from '../../_shared/models/studentDTO';
import { ColumnSortService } from '../../_shared/services/column-sort.service';
import { SessionService } from '../../_shared/services/session.service';
import { UrlService } from '../../_shared/services/url.service';
import { SetSelectedStudentIdentifiers } from '../../_store/student/student.action';
import { SetSelectedInscriptionsPeriodId } from '../../_store/ui/ui.action';
import { UIState } from '../../_store/ui/ui.state';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { User02FreeIcons, User03FreeIcons } from '@hugeicons/core-free-icons';
import { Inscription } from 'src/app/_shared/models/inscription';

@Component({
  templateUrl: './inscriptions-list.component.html',
  styleUrls: ['./inscriptions-list.component.scss'],
  standalone: false
})
export class InscriptionsListComponent implements OnInit {
  studentDTO: StudentDTO;
  inscriptionEntryDTOs: InscriptionEntryDTO[];
  isLoading: boolean;
  errorMessage: string;
  successMessage: string;
  sortCriteria: SORTCRITERIA;
  years: SELECTITEM[];
  months: SELECTITEM[];
  inscriptionsProcessingPeriods: PROCESSINGPERIOD[];
  selectedYear: string;
  selectedMonth: string;
  displayTestNames: boolean;

  staticUrlPrefix: string;
  periodStart: string;
  private subscription: Subscription;

  testNameVisibility$ = this.store.select<boolean>(UIState.getTestNamesVisibility);
  selectedInscriptionsPeriodId$ = this.store.select<string>(UIState.getSelectedInscriptionsPeriodId);
  selectedInscriptionsPeriodId = '';
  entryStartDate: string;
  entryEndDate: string;

  displayedColumns: string[] = ["index",/*  "select", */ "Profile", "studentName", "registrationForm", "paymentReceipt", "open", "confirmedDate"];
  dataSource: MatTableDataSource<InscriptionEntryDTO>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('documentation') myDialogTemplate!: TemplateRef<any>;

  paginated_items: any[] = [];

  page_size = 1;
  current_page = 0;
  total_items = 0;

  User02FreeIcons = User03FreeIcons;
  constructor(
    public inscriptionData: InscriptionDataService,
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
    this.inscriptionsProcessingPeriods = constants.inscriptionsProcessingPeriods;
    // console.log('~~~~~~~inscriptionsProcessingPeriods is ' + JSON.stringify(this.inscriptionsProcessingPeriods));
    this.isLoading = false;
    console.log(this.session);

  }

  ngOnInit() {
    this.testNameVisibility$.subscribe((flag) => {
      this.displayTestNames = flag;
    });
    this.subscribeForselectedInscriptionsPeriodId();
  }

  subscribeForselectedInscriptionsPeriodId() {
    this.subscription = this.selectedInscriptionsPeriodId$.subscribe((message) => {
      this.selectedInscriptionsPeriodId = message;
      console.log('************NGXS: InscriptionsList new selectedInscriptionsPeriodId received ' + this.selectedInscriptionsPeriodId);
      this.fetchFilteredData();
    });
  }

  fetchFilteredData() {
    this.isLoading = true;
    console.log('displayTestNames: ' + this.displayTestNames);
    console.log('fetchFilredData selectedInscriptionsPeriodId is ' + this.selectedInscriptionsPeriodId);
    this.inscriptionData.getInscriptionsListForPeriod(+this.selectedInscriptionsPeriodId).subscribe(
      (data) => {
        this.inscriptionEntryDTOs = data.filter((item) => {
          if (this.displayTestNames) {
            return item;
          } else if (!this.displayTestNames && item.studentName.substring(0, 5) !== '_Test') {
            return item;
          }

        });
        this.dataSource = new MatTableDataSource(this.inscriptionEntryDTOs);
        console.log(this.inscriptionEntryDTOs, this.dataSource.data);

        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 200);
      },
      (err) => {
        this.errorMessage = err;
      },
      () => {
        console.log(this.inscriptionEntryDTOs[0]);
        console.log('before updateDateIndicators');
        this.updateDateIndicators();
        console.log('inscription data loaded now set timeout for scroll');
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

  setSelectedInscriptionsPeriodId(inscriptionsPeriodId: string) {
    this.store.dispatch(new SetSelectedInscriptionsPeriodId(inscriptionsPeriodId));
    this.selectedInscriptionsPeriodId = inscriptionsPeriodId;
    // must be after fetch    this.updateDateIndicators();
  }

  updateDateIndicators(): void {
    console.log('selectedInscriptionsPeriodId is ' + this.selectedInscriptionsPeriodId);
    // console.log('inscriptionEntryDTOs is ' + JSON.stringify(this.inscriptionEntryDTOs));
    const selectedInscriptionEntry = this.inscriptionEntryDTOs.find(
      period => period.academicTermId === +this.selectedInscriptionsPeriodId
    );
    console.log('selectedInscriptionEntry= is ' + JSON.stringify(selectedInscriptionEntry));
    // console.log('selectedInscription.EntryStartDate is ' + JSON.stringify(selectedInscription.inscriptionsEntryStartDate));

    if (selectedInscriptionEntry) {
      this.entryStartDate = selectedInscriptionEntry.inscriptionsEntryStartDate.split('T')[0];
      this.entryEndDate = selectedInscriptionEntry.inscriptionsEntryEndDate.split('T')[0];
    } else {
      this.entryStartDate = '';
      this.entryEndDate = '';
    }
  }


  confirmInscription(studentGUId: string, studentName: string) {
    this.store.dispatch(new SetSelectedStudentIdentifiers({ studentGUId, studentName }));
    const link = ['becas/inscriptions-edit']; // , { guid: guid }];

    console.log('navigating to ' + link);
    this.router.navigate(link);
  }

  gotoStudent(studentGUId: string, studentName: string) {

    // this.store.dispatch(new SetPhotoPathname(photoUrl));
    // this.store.dispatch(new SetSelectedStudentGUId(guid));
    // this.store.dispatch(new SetSelectedStudentName(studentName));
    // this.store.dispatch(new SetSelectedStudentMentorGUId(mentorGUId));
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
    return this.inscriptionEntryDTOs.sort((a, b) => this.columnSorter.compareValues(a, b, sortCriteria));
  }

  onSorted($event) {
    console.log('sorted event received');
    console.log($event);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  selection = new SelectionModel<InscriptionEntryDTO>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource?.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.rows_with_evidence());
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: InscriptionEntryDTO): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.inscriptionId}`;
  }

  value_select(a: any, b: any): boolean {
    return a == b;
  }

  open_documentation_dialog(data: InscriptionEntryDTO): void {
    this.dialog.open(this.myDialogTemplate, {
      height: '75%',
      width: '75%'
    });
    this.current_page = this.rows_with_evidence().findIndex((row: InscriptionEntryDTO) => row.studentGUId == data.studentGUId)
    this.updatePaginated_items();

  }

  confirm_select(data: InscriptionEntryDTO) {
    this.selection.select(...this.dataSource.data.filter((value: InscriptionEntryDTO) => data.studentGUId == value.studentGUId))
  }

  rows_with_evidence() {
    return this.dataSource.data.filter((value: InscriptionEntryDTO) => (!this.isViewLinkHidden(value.registrationFormSubmittedDate) || !this.isViewLinkHidden(value.paymentReceiptSubmittedDate)) && value.confirmedDate)
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

  confirm_and_next(studentGUId: string) {
    this.current_page++;
    this.updatePaginated_items()
    let confirmed_evidence = this.rows_with_evidence().find((evidence: any) => evidence.studentGUId == studentGUId) as any;
    confirmed_evidence.confirmedById = this.session.getUserId();
    confirmed_evidence.confirmedDate = new Date()

    this.inscriptionData.updateInscriptions(confirmed_evidence).subscribe(
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
          this.successMessage = '';
        }, 3000);
      },
      () => {
        this.errorMessage = 'Confirmed By must be selected. Also Turned-in Date be filled in';
        this.isLoading = false;
      }
    );
  }
}
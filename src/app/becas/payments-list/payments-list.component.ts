import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { ColumnSortService } from 'src/app/_shared/services/column-sort.service';
import { SetSelectedStudentIdentifiers } from 'src/app/_store/student/student.action';
import { SetSelectedPCSMonthNum, SetSelectedPCSYear } from 'src/app/_store/ui/ui.action';
// import { SetSelectedStudentGUId } from 'src/app/_store/student/student.action';
import { UIState } from 'src/app/_store/ui/ui.state';
import { constants } from '../../_shared/constants/constants';
import { BecaDataService } from '../../_shared/data/beca-data.service';
import { SELECTITEM } from '../../_shared/interfaces/SELECTITEM';
import { SORTCRITERIA } from '../../_shared/interfaces/SORTCRITERIA';
import { BecaPaymentDTO } from '../../_shared/models/beca-paymentDTO';
import { SessionService } from '../../_shared/services/session.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';



@Component({
  selector: 'app-home',
  templateUrl: './payments-list.component.html',
  standalone: false
})
export class PaymentsListComponent implements OnInit {
  isLoading = false;
  errorMessage: string;
  successMessage: string;

  years: SELECTITEM[];
  months: SELECTITEM[];


  readonly becaPaymentStatuses: SELECTITEM[] = constants.becaPaymentStatuses;

  selectedReviewedStatus: string;
  selectedHighlightStatus: string;

  becaPmt: BecaPaymentDTO;
  becaPmts: BecaPaymentDTO[];

  displayTestNames: boolean;
  private subscription: Subscription;
  // #####
  testNameVisibility$ = this.store.select<boolean>(UIState.getTestNamesVisibility);

  selectedPCSYear = '';
  selectedPCSMonthNum = (new Date().getMonth() + 1).toString();
  selectedPCSYear$ = this.store.select<string>(UIState.getSelectedPCSYear);
  selectedPCSMonthNum$ = this.store.select<string>(UIState.getSelectedPCSMonthNum);
  currentMonthNum = new Date().getMonth() + 1;
  isEditableMonth: boolean = false;

  displayedColumns: string[] = ["index", "Profile", "studentName", "pcsCode", "mentorReportStatus", "studentReportStatus", "inscriptionReportStatus", "gradeReportStatus", "paymentStatus", "requestedBeca", "approvedBy", "comment"];
  dataSource: MatTableDataSource<BecaPaymentDTO>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    public becaData: BecaDataService,
    public columnSorter: ColumnSortService,
    public store: Store,
    public session: SessionService
  ) {
    console.log('beca payments-list constructor');
    this.years = constants.paymentYears;
    this.months = constants.months;
    // this.becaPaymentStatuses = constants.becaPaymentStatuses;

    this.selectedPCSYear = '' + constants.currentPaymentYear; // '' + today.getFullYear(); //
    this.selectedPCSMonthNum = (new Date().getMonth() + 1).toString();

    this.selectedReviewedStatus = '0';
    this.isLoading = false;
  }

  ngOnInit() {
    this.testNameVisibility$.subscribe((flag) => {
      this.displayTestNames = flag;
    });
    this.subscribeForSelectedPCSYear(true);
    this.subscribeForSelectedPCSMonthNum(true);
  }
  generateRandomNumber(): number {
    return Math.floor(100 + Math.random() * 900);
  }

  // subscribeForSelectedYearMonth() {
  //   this.subscription = this.selectedPCSYear$.subscribe((message) => {
  //     this.selectedPCSYear = message;
  //     console.log('************NGXS: BECA new selectedPCSYear received ' + this.selectedPCSYear);
  //     this.subscription = this.selectedPCSMonthNum$.subscribe((message) => {
  //       this.selectedPCSMonthNum = message;
  //       console.log('************NGXS: BECA new selectedPCSMonthNum received'  + this.selectedPCSMonthNum);
  //       this.currentMonthNum = new Date().getMonth() + 1;
  //       this.isEditableMonth = this.currentMonthNum <= parseInt(this.selectedPCSMonthNum);

  //       this.fetchFilteredData();
  //   })
  //   });
  // }

  scrollIntoView() {
    const element = document.body;
    if (element) {
      element.scrollIntoView(true);
    }
  }

  setSelectedReviewedStatus(status: string) {
    this.selectedReviewedStatus = status;
    this.fetchFilteredData();
  }

  async subscribeForSelectedPCSYear(is_new: boolean) {
    this.subscription = await this.selectedPCSYear$.subscribe(async (message) => {
      this.selectedPCSYear = await message;
      if (is_new)
        await this.setSelectedPCSMonthNum((new Date().getMonth() + 1).toString());
      else
        this.selectedPCSMonthNum = await '0'; // for startup or when selecting a new year, reset month to 0
      console.log('************NGXS: new selectedPCSYear received ' + this.selectedPCSYear);
      await this.fetchFilteredData();
    });
  }
  async subscribeForSelectedPCSMonthNum(is_new: boolean) {

    this.subscription = await this.selectedPCSMonthNum$.subscribe(async (message) => {
      if (is_new)
        await this.setSelectedPCSMonthNum((new Date().getMonth() + 1).toString());
      else
        this.selectedPCSMonthNum = await message;
      console.log('************NGXS: BECA new selectedPCSMonthNum received ' + this.selectedPCSMonthNum);
      this.isEditableMonth = await this.currentMonthNum < parseInt(this.selectedPCSMonthNum);
      await this.fetchFilteredData();
    });
  }


  setSelectedPCSYear(year: string) {
    this.store.dispatch(new SetSelectedPCSYear(year));
    this.selectedPCSYear = year;
    // for startup or when selecting a new year, reset month to 0
    this.setSelectedPCSMonthNum('0');
  }
  setSelectedPCSMonthNum(month: string) {
    console.log('SIIIIIIII', month);

    this.store.dispatch(new SetSelectedPCSMonthNum(month));
    this.selectedPCSMonthNum = month;
  }

  editPaymentDetails(studentGUId: string, studentName: string) {
    this.store.dispatch(new SetSelectedStudentIdentifiers({ studentGUId, studentName }));
    const link = ['becas/payments-edit'];
    console.log('navigating to ' + link);
    this.router.navigate(link);
  }

  gotoStudent(studentGUId: string, studentName: string) {
    this.store.dispatch(new SetSelectedStudentIdentifiers({ studentGUId, studentName }));
    const link = ['admins/students/student-container', { guid: studentGUId }];
    console.log('navigating to ' + link);
    this.router.navigate(link);
  }

  public onSortColumn(sortCriteria: SORTCRITERIA) {
    console.log('parent received sortColumnCLick event with ' + sortCriteria.sortColumn);
    return this.becaPmts.sort((a, b) => this.columnSorter.compareValues(a, b, sortCriteria));
  }

  onSorted($event) {
    console.log('sorted event received');
    console.log($event);
  }

  fetchFilteredData() {
    this.isLoading = true;
    console.log('becas payments-list data fetch ');
    this.becaData.getBecaPaymentsByMonth(this.selectedPCSYear, this.selectedPCSMonthNum, '0').subscribe(
      (data) => {
        // console.log(JSON.stringify(data));
        this.becaPmts = data.filter((item) => {
          if (this.displayTestNames) {
            return item;
          } else if (!this.displayTestNames && item.studentName.substring(0, 5) !== '_Test') {
            return item;
          }
        });
        this.dataSource = new MatTableDataSource(this.becaPmts);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 100);
      },
      (err) => {
        console.error('Subscribe error: ' + err);
        this.isLoading = false;
      },
      () => {

        console.log(this.becaPmts.length);
        this.isLoading = false;
        if (this.becaPmts && this.becaPmts.length > 0) {
          console.log('### after retreiving, grid becaPaymentId: ' + this.becaPmts[0].becaPaymentId);
          // console.log(JSON.stringify(this.becaPmts));
        } else {
          console.log('no results returned');
        }
      }
    );
  }
  setReviewedStatusID(rptEntryIdx: number, statusId: number) {
    console.log('selected reviewedStatusId: ' + statusId);

    this.becaData.setReviewedStatusId(this.becaPmts[rptEntryIdx].becaPaymentId, statusId).subscribe(
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



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  value_select(a: any, b: any): boolean {
    return a == b;
  }

}

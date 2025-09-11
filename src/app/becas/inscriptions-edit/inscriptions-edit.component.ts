import { Location } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { InscriptionDataService } from '../../_shared/data/inscription-data.service';
import { MiscDataService } from '../../_shared/data/misc-data.service';
import { SELECTITEM } from '../../_shared/interfaces/SELECTITEM';
import { Inscription } from '../../_shared/models/inscription';
import { InscriptionEntryDTO } from '../../_shared/models/inscription-entryDTO';
import { TruncateDatePipe } from '../../_shared/pipes/truncate-date-pipe';
import { StudentState } from '../../_store/student/student.state';
// import { SORTCRITERIA } from '../../_shared/interfaces/SORTCRITERIA';
import { StudentDTO } from '../../_shared/models/studentDTO';
import { ColumnSortService } from '../../_shared/services/column-sort.service';
import { SessionService } from '../../_shared/services/session.service';
import { UrlService } from '../../_shared/services/url.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

@Component({
  templateUrl: './inscriptions-edit.component.html',
  styleUrls: ['./inscriptions-edit.component.scss'],
  standalone: false
})
export class InscriptionsEditComponent implements OnInit {
  myForm: UntypedFormGroup;
  studentDTO: StudentDTO;
  inscriptions: Inscription[];
  entry: InscriptionEntryDTO;
  isLoading: boolean;
  errorMessage: string;
  successMessage: string;
  years: SELECTITEM[];
  months: SELECTITEM[];
  studentGUId: string;
  private subscription: Subscription;
  studentName: string;
  staticUrlPrefix: string;

  admins$: Observable<SELECTITEM[]> = this.miscData.getAdmins$().pipe(
    catchError((err) => {
      this.errorMessage = err;
      console.log('CAUGHT ERROR IN Component ' + err);
      return EMPTY;
    })
  );

  currentGUId$ = this.store.select<string>(StudentState.getSelectedStudentGUId);
  currentName$ = this.store.select<string>(StudentState.getSelectedStudentName);

  displayedColumns = ["academicTermId", "inscriptionsEntryEndDate", "registrationFormSubmittedDate", "paymentReceiptSubmittedDate", "open", "confirmedById", "confirmedDate"]
  page_size = 1;
  current_page = 0;
  total_items = 0;
  paginated_items: any[] = [];
  @ViewChild('documentation') myDialogTemplate!: TemplateRef<any>;


  constructor(
    public inscriptionData: InscriptionDataService,
    public router: Router,
    private miscData: MiscDataService,
    private session: SessionService,
    private columnSorter: ColumnSortService,
    private _fb: UntypedFormBuilder,
    public location: Location,
    public url: UrlService,
    private store: Store,
    private dialog: MatDialog
  ) {
    console.log('Hi from gradesEdit Ctrl controller function');

    this.staticUrlPrefix = url.getStaticFilePrefix();

    this.isLoading = false;

    this.myForm = this._fb.group({
      studentGUId: ['0000'],
      inscriptionFormRows: this._fb.array([])
    });
  }

  inscriptionFormRows(): UntypedFormArray {
    return <UntypedFormArray>this.myForm.get('inscriptionFormRows');
  }

  createEmptyInscriptionFormRow(): UntypedFormGroup {
    console.log('CreateEmptyInscriptionFormRow create empty row to be populated');
    return this._fb.group({
      academicTermId: { value: '', disabled: true },
      inscriptionsEntryEndDate: { value: '', disabled: true },

      confirmedDate: { value: '', disabled: true },
      confirmedById: [{ value: '' }, Validators.required],
    });
  }

  updateInscriptionFormRow(inscriptionFormRow: UntypedFormGroup, inscriptionDataRow: Inscription): void {
    console.log('updateInscriptionFormRow update existing row with actual data');
    console.log(JSON.stringify(inscriptionDataRow));
    inscriptionFormRow.patchValue({
      academicTermId: inscriptionDataRow.academicTermId,
      inscriptionsEntryEndDate: new TruncateDatePipe().transform('' + inscriptionDataRow.inscriptionsEntryEndDate),
      confirmedById: inscriptionDataRow.confirmedById,
      confirmedDate: new TruncateDatePipe().transform('' + inscriptionDataRow.confirmedDate)
    });
    inscriptionFormRow.markAsPristine();
  }

  addGradeEntryRow(gradeEntryDataRow: Inscription) {
    const inscriptionFormRow: UntypedFormGroup = this.createEmptyInscriptionFormRow();

    this.updateInscriptionFormRow(inscriptionFormRow, gradeEntryDataRow);
    console.log('addGradeEntry: push new populated row intoFormArray');
    this.inscriptionFormRows().push(inscriptionFormRow);
    console.log(this.myForm.value);

  }

  ngOnInit() {
    console.log('gradesEdit ngOnInit');
    this.subscribeForStudentGUIds2();
    // AABBCCEE
    this.subscribeForStudentNames();
  }

  subscribeForStudentNames() {
    this.subscription = this.currentName$.subscribe((message) => {
      this.studentName = message;
      console.log('************NGXS: Inscription edit new StudentName received' + this.studentName);
    });
  }

  subscribeForStudentGUIds2() {
    this.subscription = this.currentGUId$.subscribe((message) => {
      this.studentGUId = message;
      console.log('************NGXS: Inscription edit new StudentGUId received' + this.studentGUId);
      if (this.studentGUId && this.studentGUId !== '0000') {
        this.fetchFilteredData();
      }
    });
  }

  fetchFilteredData() {
    if (this.studentGUId && this.studentGUId !== undefined && this.studentGUId !== '0000') {
      this.isLoading = true;
      this.inscriptionData.getInscriptionsForStudent(this.studentGUId).subscribe(
        (data) => {
          this.inscriptions = data;
          console.log(this.inscriptions);

        },
        (err) => {
          this.errorMessage = err;
        },
        () => {
          this.inscriptions.forEach((gradeEntryDataRow) => {
            this.addGradeEntryRow(gradeEntryDataRow);
          });

          console.log('data loaded now set timeout for scroll');
          setTimeout(() => {
            this.scrollIntoView();
          }, 0);
          this.isLoading = false;
        }
      );
    }
  }

  scrollIntoView() {
    const element = document.body;
    if (element) {
      element.scrollIntoView(true);
    }
  }

  gotoStudent(guid: string, studentName: string) {
    console.log('setting studentName to ' + studentName);
    // XXYYZZ this.session.setStudentInContextName(studentName);
    const link = ['admins/students/student-container', { guid: guid }];

    console.log('navigating to ' + link);
    this.router.navigate(link);
  }
  isViewLinkHidden(imageSubmittedDate: any) {
    return (imageSubmittedDate == '1900-01-01T00:00:00') || !imageSubmittedDate || imageSubmittedDate == '' || imageSubmittedDate == null;
  }
  saveAllChangedEntries() {
    console.log('inscriptionData length is ' + this.inscriptions.length);
    for (let i = 0; i < this.inscriptions.length; ++i) {
      console.log('saveEntry ' + i);
      this.saveEntry(i);
    }
    this.myForm.markAsPristine();
  }

  resetAllChangedEntries() {
    console.log('inscriptionData length is ' + this.inscriptions.length);
    for (let i = 0; i < this.inscriptions.length; ++i) {
      console.log('saveEntry ' + i);
      this.resetEntry(i);
    }
    this.myForm.markAsPristine();
  }

  retrieveFormValuesForRow(i: number): void {
    console.log('retrieveFormValues for row' + JSON.stringify(this.inscriptionFormRows().value[i]));
    this.inscriptions[i] = { ...this.inscriptions[i], ...this.inscriptionFormRows().value[i] };
  }

  isRowDirty(i: number): boolean {
    // console.log('checking dirty state of i ' + i + ' -- ' + this.gradeEntryFormRows().controls[i].dirty);
    return this.inscriptionFormRows().controls[i].dirty;
  }

  saveEntry(i: number): boolean {
    console.log('saveEntry for ' + i);
    this.isLoading = true;
    this.errorMessage = '';
    console.log('row dirty value is ' + this.inscriptionFormRows().controls[i].dirty);
    if (this.inscriptionFormRows().controls[i].dirty) {
      this.inscriptionFormRows().controls[i].get('confirmedDate')?.enable();
      this.retrieveFormValuesForRow(i);
      this.inscriptionData.updateInscriptions(this.inscriptions[i]).subscribe(
        (gradeRowData) => {
          console.log('subscribe result in updateGradeRowData');
          console.log(JSON.stringify(gradeRowData));
          // need timeout to avoid "Expression has changed error"
          window.setTimeout(() => {
            this.successMessage = 'Changes were saved successfully.';
          }, 0);
          const currRowFormGroup = this.inscriptionFormRows().controls[i] as UntypedFormGroup;
          // this fails for some reason, and isn't needed because the update won't change any of these values
          // this.updateGradeEntryRow(currRowFormGroup, gradeRowData);
          currRowFormGroup.markAsPristine();
          this.inscriptionFormRows().controls[i].get('confirmedDate')?.disable();
          // this.successMessage = 'Changes were saved successfully.';
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
    // prevent default action of reload
    return false;
  }

  resetEntry(i: number): boolean {
    console.log('resetEntry for ' + i);

    if (this.inscriptionFormRows().controls[i].dirty) {
      this.retrieveFormValuesForRow(i);
      this.inscriptionFormRows().controls[i].reset();
      this.inscriptionFormRows().controls[i].markAsPristine();
    }
    // prevent default action of reload
    return false;
  }

  setReceivedDate(i: number, currDateValue: string): void {
    console.log('setReceivedDate with curr = ' + currDateValue);
    // https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
    let d: Date;
    // if empty set it to two days ago; if currently has a value, increment by one day
    if (currDateValue > '') {
      d = new Date(currDateValue + ' 00:00:01');
      d.setDate(d.getDate() - 1);
    } else {
      d = new Date();
    }
    const strDate = [d.getFullYear(), ('0' + (d.getMonth() + 1)).slice(-2), ('0' + d.getDate()).slice(-2)].join('-');

    const gradeEntryRow: UntypedFormGroup = this.inscriptionFormRows().controls[i] as UntypedFormGroup;
    gradeEntryRow.patchValue({
      gradesTurnedInDate: strDate
    });
    gradeEntryRow.markAsDirty();
  }

  setConfirmedBy(i: number, adminId?: any): void {
    console.log('setConfirmedBy with adminId = ' + adminId);
    const gradeEntryRow: UntypedFormGroup = this.inscriptionFormRows().controls[i] as UntypedFormGroup;
    if (adminId === null || adminId === 'null') {

      gradeEntryRow.patchValue({
        confirmedById: null,
        confirmedDate: null
      });
    } else {
      const d = new Date();
      const strDate = [d.getFullYear(), ('0' + (d.getMonth() + 1)).slice(-2), ('0' + d.getDate()).slice(-2)].join('-');
      console.log(strDate);
      gradeEntryRow.patchValue({
        confirmedById: adminId,
        confirmedDate: strDate
      });

    }


    gradeEntryRow.markAsDirty();
  }

  imageLoaded(dateLoaded: any) {
    console.log('dateLoaded [' + dateLoaded + ']');
    return dateLoaded !== 'null';
  }


  toFixedValue(num: number | null) {
    if (num === null || num === undefined) {
      return '';
    } else {
      return num.toFixed(1);
    }
  }

  public hasChanges() {
    // if have changes then routing guard will ask for confirmation
    // ask if form is dirty and has not just been submitted
    console.log('hasChanges has form dirty ' + this.myForm.dirty);
    return this.myForm.dirty;
  }

  value_select(a: any, b: any): boolean {
    return a == b;
  }


  open_documentation_dialog(data: Inscription): void {
    this.dialog.open(this.myDialogTemplate, {
      height: '75%',
      width: '75%'
    });
    this.current_page = this.rows_with_evidence().findIndex((row: Inscription) => row.inscriptionId == data.inscriptionId)
    this.updatePaginated_items();

  }

  rows_with_evidence() {
    return this.inscriptions.filter((value: Inscription) => (!this.isViewLinkHidden(value.registrationFormSubmittedDate) || !this.isViewLinkHidden(value.paymentReceiptSubmittedDate)) && value.confirmedDate)
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

  confirm_and_next(inscriptionId: string) {
    this.current_page++;
    this.updatePaginated_items()
    let confirmed_evidence = this.rows_with_evidence().find((evidence: any) => evidence.inscriptionId == inscriptionId) as any;
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
        // const currRowFormGroup = this.inscriptionFormRows().controls[i] as UntypedFormGroup;
        // this fails for some reason, and isn't needed because the update won't change any of these values
        // this.updateGradeEntryRow(currRowFormGroup, gradeRowData);
        // currRowFormGroup.markAsPristine();
        // this.inscriptionFormRows().controls[i].get('confirmedDate')?.disable();
        // this.successMessage = 'Changes were saved successfully.';
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
}

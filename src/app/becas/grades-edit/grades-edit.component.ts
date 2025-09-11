import { Location } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BecaDataService } from 'src/app/_shared/data/beca-data.service';
import { MiscDataService } from 'src/app/_shared/data/misc-data.service';
import { GradesGivenEntryDTO } from 'src/app/_shared/models/grades-given-entryDTO';
import { StudentGrades } from 'src/app/_shared/models/student-grades';
import { TruncateDatePipe } from 'src/app/_shared/pipes/truncate-date-pipe';
import { StudentState } from 'src/app/_store/student/student.state';
import { SELECTITEM } from '../../_shared/interfaces/SELECTITEM';
import { StudentDTO } from '../../_shared/models/studentDTO';
import { ColumnSortService } from '../../_shared/services/column-sort.service';
import { SessionService } from '../../_shared/services/session.service';
import { UrlService } from '../../_shared/services/url.service';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';

@Component({
  templateUrl: './grades-edit.component.html',
  styleUrls: ['./grades-edit.component.scss'],
  standalone: false
})
export class GradesEditComponent implements OnInit {
  myForm: UntypedFormGroup;
  studentDTO: StudentDTO;
  studentGradesData: StudentGrades[];
  entry: GradesGivenEntryDTO;
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

  displayedColumns = ["academicTermId", "gradesEntryEndDate", "gradesTurnedInDate", "gradePointAvg", "imageSubmittedDate", "confirmedById", "confirmedDate", "exception"]
  page_size = 1;
  current_page = 0;
  total_items = 0;
  paginated_items: any[] = [];
  @ViewChild('documentation') myDialogTemplate!: TemplateRef<any>;
  constructor(
    public becaData: BecaDataService,
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
      gradeEntryFormRows: this._fb.array([])
    });
  }

  ngOnInit() {
    console.log('gradesEdit ngOnInit');
    this.subscribeForStudentGUIds2();
    // AABBCCEE
    this.subscribeForStudentNames();
  }

  fetchFilteredData() {
    if (this.studentGUId && this.studentGUId !== undefined && this.studentGUId !== '0000') {
      this.isLoading = true;
      this.becaData.getStudentGradesForStudent(this.studentGUId).subscribe(
        (data) => {
          this.studentGradesData = data;
          console.log(data);
          
        },
        (err) => {
          this.errorMessage = err;
        },
        () => {
          this.studentGradesData.forEach((gradeEntryDataRow) => {
            this.addGradeEntryFormRow(gradeEntryDataRow);
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

  gradeEntryFormRows(): UntypedFormArray {
    return <UntypedFormArray>this.myForm.get('gradeEntryFormRows');
  }

  addGradeEntryFormRow(gradeEntryDataRow: StudentGrades) {
    console.log('addGradeEntryFormRow: add new row to form array');
    const gradeEntryFormRow: UntypedFormGroup = this.createEmptyGradeEntryFormRow();

    console.log('addGradeEntryFormRow: form row B4 is ', gradeEntryFormRow.controls);
    this.updateGradeEntryFormRow(gradeEntryFormRow, gradeEntryDataRow);
    console.log('addGradeEntryFormRow: form row after is ', gradeEntryFormRow.controls);

    console.log('addGradeEntry: push new populated row intoFormArray');
    this.gradeEntryFormRows().push(gradeEntryFormRow);
    console.log('Form array populated:', this.gradeEntryFormRows);
  }

  createEmptyGradeEntryFormRow(): UntypedFormGroup {
    console.log('CreateEmptyGradeEntryFormRow create empty row to be populated');
    return this._fb.group({
      academicTermId: { value: '', disabled: true },
      // gradesGivenDate: { value: '', disabled: true },
      gradesEntryEndDate: { value: '', disabled: true },
      gradesTurnedInDate: [
        { value: '' },
        Validators.compose([Validators.pattern(/^\d{4}\-\d{1,2}\-\d{1,2}$/), Validators.maxLength(10)])
      ],
      gradePointAvg: [{ value: '' }, Validators.pattern(/^\d{1,2}\.\d{1,1}$/)],
      exception: [''],
      confirmedDate: { value: '', disabled: true },
      confirmedById: [{ value: '' }, Validators.required],
    });
  }

  updateGradeEntryFormRow(gradeEntryFormRow: UntypedFormGroup, gradeEntryDataRow: StudentGrades): void {
    console.log('updateGradeEntryFormRow update existing row with actual data');
    console.log(JSON.stringify(gradeEntryDataRow));
    gradeEntryFormRow.patchValue({
      academicTermId: gradeEntryDataRow.academicTermId,
      gradesEntryEndDate: new TruncateDatePipe().transform('' + gradeEntryDataRow.gradesEntryEndDate),
      gradesTurnedInDate: new TruncateDatePipe().transform('' + gradeEntryDataRow.gradesTurnedInDate),
      gradePointAvg: this.toFixedValue(gradeEntryDataRow.gradePointAvg),
      exception: gradeEntryDataRow.exception,
      confirmedById: gradeEntryDataRow.confirmedById,
      confirmedDate: new TruncateDatePipe().transform('' + gradeEntryDataRow.confirmedDate)
    });
    gradeEntryFormRow.markAsPristine();
  }

  subscribeForStudentNames() {
    this.subscription = this.currentName$.subscribe((message) => {
      this.studentName = message;
      console.log('************NGXS: grades edit new StudentName received' + this.studentName);
    });
  }

  subscribeForStudentGUIds2() {
    this.subscription = this.currentGUId$.subscribe((message) => {
      this.studentGUId = message;
      console.log('************NGXS: grades edit new StudentGUId received' + this.studentGUId);
      if (this.studentGUId && this.studentGUId !== '0000') {
        this.fetchFilteredData();
      }
    });
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
    console.log('studentGradesData length is ' + this.studentGradesData.length);
    for (let i = 0; i < this.studentGradesData.length; ++i) {
      console.log('saveEntry ' + i);
      this.saveEntry(i);
    }
    this.myForm.markAsPristine();
  }

  resetAllChangedEntries() {
    console.log('studentGradesData length is ' + this.studentGradesData.length);
    for (let i = 0; i < this.studentGradesData.length; ++i) {
      console.log('saveEntry ' + i);
      this.resetEntry(i);
    }
    this.myForm.markAsPristine();
  }

  retrieveFormValuesForRow(i: number): void {
    console.log('retrieveFormValues for row' + JSON.stringify(this.gradeEntryFormRows().value[i]));
    this.studentGradesData[i] = { ...this.studentGradesData[i], ...this.gradeEntryFormRows().value[i] };
  }

  isRowDirty(i: number): boolean {
    // console.log('checking dirty state of i ' + i + ' -- ' + this.gradeEntryFormRows().controls[i].dirty);
    return this.gradeEntryFormRows().controls[i].dirty;
  }

  saveEntry(i: number): boolean {
    console.log('saveEntry for ' + i);
    this.isLoading = true;
    this.errorMessage = '';
    console.log('row dirty value is ' + this.gradeEntryFormRows().controls[i].dirty);
    if (this.gradeEntryFormRows().controls[i].dirty) {
      this.gradeEntryFormRows().controls[i].get('confirmedDate').enable();
      this.retrieveFormValuesForRow(i);
      this.becaData.updateStudentGrades(this.studentGradesData[i]).subscribe(
        (gradeRowData) => {
          console.log('subscribe result in updateGradeRowData');
          console.log(JSON.stringify(gradeRowData));
          // need timeout to avoid "Expression has changed error"
          window.setTimeout(() => {
            this.successMessage = 'Changes were saved successfully.';
          }, 0);
          const currRowFormGroup = this.gradeEntryFormRows().controls[i] as UntypedFormGroup;
          // this fails for some reason, and isn't needed because the update won't change any of these values
          // this.updateGradeEntryRow(currRowFormGroup, gradeRowData);
          currRowFormGroup.markAsPristine();
          this.gradeEntryFormRows().controls[i].get('confirmedDate').disable();
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

    if (this.gradeEntryFormRows().controls[i].dirty) {
      this.retrieveFormValuesForRow(i);
      this.gradeEntryFormRows().controls[i].reset();
      this.gradeEntryFormRows().controls[i].markAsPristine();
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

    const gradeEntryRow: UntypedFormGroup = this.gradeEntryFormRows().controls[i] as UntypedFormGroup;
    gradeEntryRow.patchValue({
      gradesTurnedInDate: strDate
    });
    gradeEntryRow.markAsDirty();
  }

  setConfirmedBy(i: number, adminId?: any): void {
    console.log('setConfirmedBy with adminId = ' + adminId);
    const gradeEntryRow: UntypedFormGroup = this.gradeEntryFormRows().controls[i] as UntypedFormGroup;
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


  open_documentation_dialog(data: StudentGrades): void {
    this.dialog.open(this.myDialogTemplate, {
      height: '75%',
      width: '75%'
    });
    this.current_page = this.rows_with_evidence().findIndex((row: StudentGrades) => row.studentGradeId == data.studentGradeId)
    this.updatePaginated_items();

  }

  rows_with_evidence() {
    return this.studentGradesData.filter((value: StudentGrades) => !(this.isViewLinkHidden(value.imageSubmittedDate) && this.isViewLinkHidden(value.gradesTurnedInDate)) && value.confirmedDate)
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

  confirm_and_next(studentGradeId: string) {
    this.current_page++;
    this.updatePaginated_items()
    let confirmed_evidence = this.rows_with_evidence().find((evidence: any) => evidence.studentGradeId == studentGradeId) as any;
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

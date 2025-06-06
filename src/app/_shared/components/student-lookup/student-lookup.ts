import { Component, Injectable, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { SetSelectedStudentGUId, SetSelectedStudentIdentifiers } from 'src/app/_store/student/student.action';
import { StudentState } from 'src/app/_store/student/student.state';
import { StudentDataService } from '../../data/student-data.service';
import { StudentMiniDTO } from '../../models/studentMiniDTO';


@Injectable({
  providedIn: 'root'
})
export class StudentNameService {
  constructor(private studentData: StudentDataService) {}
  searchActiveOnly=true;
  setSearchActiveOnly(searchActiveOnly: boolean) {
    this.searchActiveOnly = searchActiveOnly;
  }

  search(searchStr: string) {
    if (searchStr === '') {
      return of([]);
    }
    console.log('in search about to call getStudentMiniDTOs');
    return this.studentData.getCurrentStudentMiniDTOs(searchStr, this.searchActiveOnly).pipe(
      // catchError(this.handleError),
      tap((x) => console.log(x))
    );
  }
}

@Component({
    selector: 'app-student-lookup',
    templateUrl: './student-lookup.html',
    styles: ['.form-control { width: 300px; display: inline; }'],
    standalone: false
})
export class StudentLookupComponent implements OnInit {
  studentMiniDTO: StudentMiniDTO;
  searching = false;
  searchFailed = false;
  currentGUId = '0000';
  studentName: string;
  email: string;
  studentGUId: string;
  public searchActiveOnly = true;
  private subscription: Subscription;
  @Input() showSearchButton: boolean;
  @Input() showNonEssential: boolean;
  @Input() showSearchActiveOnly: boolean;

   currentGUId$ = this.store.select<string>(StudentState.getSelectedStudentGUId);

  constructor(
    private _service: StudentNameService,
    private router: Router,
    private studentData: StudentDataService,
    private store: Store
  ) {
    console.log('name-lookup constructor!');
  }

  ngOnInit() {
    this.subscribeForStudentGUIds2();
  }

  onSelect(item) {
    console.log('OnSelect New Student, dispatching new GUID');
    console.log(item.item.studentId);
    console.log(item.item.studentGUId);
    this.currentGUId = item.item.studentGUId;
    this.store.dispatch(new SetSelectedStudentGUId(this.currentGUId));

    this.email = item.item.email;
    this.studentName = item.item.studentName;
  }

  onFocus() {
    // console.log('onFocus');
    const input = document.getElementById('search-string') as HTMLInputElement;
    input.focus();
    input.select();
  }

  onInput() {
    const input = document.getElementById('search-string') as HTMLInputElement;
    if (input.value.length === 0) {
      this.resetStudentData();
    }
  }

  onClear() {
    console.log('onClear');
    const input = document.getElementById('search-string') as HTMLInputElement;
    input.focus();
    input.value = '';
    this.resetStudentData();
  }

  subscribeForStudentGUIds2() {
    this.subscription = this.currentGUId$.subscribe((message) => {
      this.studentGUId = message;
      console.log('************NGXS: header new StudentGUId received' + this.studentGUId);
      if (this.studentGUId && this.studentGUId !== '0000') {
        this.currentGUId = this.studentGUId;
        this.fetchData();
      }
    });
  }

  resetStudentData() {
    console.log('studentLookup reset');
    this.currentGUId = '0000';
    this.store.dispatch(new SetSelectedStudentGUId(this.studentGUId));
  }

  fetchData() {
    this.studentData.getCurrentStudentMiniDTO(this.currentGUId).subscribe(
      (data) => {
        this.studentMiniDTO = data;
      },
      (err) => console.error('Subscribe error: ' + err),
      () => {
        this.email = this.studentMiniDTO.email;
        this.studentName = this.studentMiniDTO.studentName;
      }
    );
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      // tap((term) => console.log('search function has searchStr ' + term)),
      tap(() => (this.searching = true)),
      switchMap((term) =>
        this._service.search(term).pipe(
          tap(() => (this.searchFailed = false)),
          tap((x) => console.log(x[0].studentName)),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          })
        )
      ),
      tap(() => (this.searching = false))
    );
  formatter = (x: { studentName: string; email: string }) => x.studentName + ' <' + x.email + '>';

  gotoStudentList() {
    const link = 'admins/students/studentList';
    this.router.navigateByUrl(link);
  }

  gotoStudent( studentName: string) {
    if (this.currentGUId !== '0000') {
      const studentGUId = this.currentGUId;
      this.store.dispatch(new SetSelectedStudentIdentifiers({ studentGUId, studentName }));

      const link = ['admins/students/student-container', { guid: this.currentGUId }];
      console.log('navigating to ' + link);
      this.router.navigate(link);
    }
  }
  toggleSearchActiveOnly(event) {
    this.searchActiveOnly = event.target.checked; //  !this.searchActiveOnly;
    console.log('calling dataservice with ' + this.searchActiveOnly);
    this._service.setSearchActiveOnly(this.searchActiveOnly);
  }

}

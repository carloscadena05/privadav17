import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { constants } from 'src/app/_shared/constants/constants';
import { MemberDataService } from 'src/app/_shared/data/member-data.service';
import { SELECTITEM } from 'src/app/_shared/interfaces/SELECTITEM';
import { SORTCRITERIA } from 'src/app/_shared/interfaces/SORTCRITERIA';
import { MemberWithAnyRelatedStudent } from 'src/app/_shared/models/member-with-any-related-student';
import { ColumnSortService } from 'src/app/_shared/services/column-sort.service';
import { SessionService } from 'src/app/_shared/services/session.service';
import { UIState } from 'src/app/_store/ui/ui.state';

@Component({
  templateUrl: './admins-member-list.component.html',
  styleUrls: ['./admins-member-list.component.scss'],
  standalone: false
})
export class AdminsMemberListComponent implements OnInit {
  memberTypes: SELECTITEM[];
  _selectedType: SELECTITEM;
  roleStatuses: SELECTITEM[];
  _selectedStatus: SELECTITEM;
  studentStatuses: SELECTITEM[];
  _selectedStudentStatus: SELECTITEM;
  members: MemberWithAnyRelatedStudent[];
  isLoading: boolean;
  errorMessage: string;
  successMessage: string;
  sortCriteria: SORTCRITERIA;
  displayTestNames: boolean;

  testNameVisibility$ = this.store.select<boolean>(UIState.getTestNamesVisibility);

  /* 
  + CARLOS' CODE
   */

  displayedColumns: string[] = ['index', 'member', 'status', 'email', 'student', 'student_status'];
  dataSource: MatTableDataSource<MemberWithAnyRelatedStudent>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public memberData: MemberDataService,
    public router: Router,
    private session: SessionService,
    private columnSorter: ColumnSortService,
    private store: Store
  ) {
    console.log('Hi from member List Ctrl controller function');
    this.roleStatuses = constants.memberStatuses;
    this.memberTypes = constants.memberTypes;
    this.studentStatuses = constants.studentStatuses;
    this.isLoading = false;
    this.testNameVisibility$.subscribe((flag) => {
      this.displayTestNames = flag;
    });
  }

  public set selectedStatus(status: SELECTITEM) {
    this._selectedStatus = status;
    this.fetchFilteredData();
  }

  public get selectedStatus() {
    return this._selectedStatus;
  }

  public set selectedStudentStatus(status: SELECTITEM) {
    this._selectedStudentStatus = status;
    this.fetchFilteredData();
  }

  public get selectedStudentStatus() {
    return this._selectedStudentStatus;
  }

  public set selectedType(type: SELECTITEM) {
    this._selectedType = type;
    this.session.setMemberType(type);
    this.fetchFilteredData();
  }
  public get selectedType() {
    return this._selectedType;
  }

  ngOnInit() {
    console.log('ngOnInit');
    console.log('types[2] = ' + this.memberTypes[2]?.label);

    const memType = this.session.getMemberType();
    let idx = 2;
    if (memType) {
      idx = this.memberTypes.findIndex((x) => x.value === memType.value);
      console.log('setting MemberType to saved ' + memType);
    }
    this._selectedType = this.memberTypes[idx] ?? {
      "value": "1010",
      "label": "Mentor"
    };
    console.log('statuses[0] = ' + this.roleStatuses[0]?.value);
    this._selectedStatus = this.roleStatuses[0] ?? {
      "value": "1015",
      "label": "Active"
    };
    this._selectedStudentStatus = this.studentStatuses[2] ?? {
      "value": "1005",
      "label": "Current"
    };
    this.fetchFilteredData();
  }

  gotoCreateNewMember() {
    const link = 'admins/members/createNewMember';
    this.router.navigateByUrl(link);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  fetchFilteredData() {
    this.isLoading = true;
    this.memberData
      .getMemberWithAnyRelatedStudent(
        this.selectedType?.label,
        Number(this.selectedStatus?.value),
        Number(this.selectedStudentStatus?.value)
      )
      .subscribe(
        (data) => {
          this.members = data.filter((item) => {
            if (this.displayTestNames) {
              return item;
            } else if (!this.displayTestNames && item['lastNames'] !== '_Test') {
              return item;
            }
          });
          this.dataSource = new MatTableDataSource(this.members);
          setTimeout(() => {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }, 100);          
        },
        (err) => (this.errorMessage = err),
        () => {
          console.log('done');
          this.isLoading = false;
        }
      );
  }
  gotoMember(guid: string) {
    const link = ['admins/members/member', { guid: guid }];
    console.log('navigating to ' + link);
    this.router.navigate(link);
  }
  gotoStudent(guid: string, studentName: string) {
    console.log('setting studentName to ' + studentName + ' for guid ' + guid);;
    // XXYYZZ this.session.setStudentInContextName(studentName);
    const link = ['admins/students/student-container', { guid: guid }];

    console.log('navigating to ' + link);
    this.router.navigate(link);
  }
  gotoMemberSearch() {
    const link = ['admins/members'];
    console.log('navigating to ' + link);
    this.router.navigate(link);
  }

  public onSortColumn(sortCriteria: SORTCRITERIA) {
    console.log('parent received sortColumnCLick event with ' + sortCriteria.sortColumn);
    return this.members.sort((a, b) => this.columnSorter.compareValues(a, b, sortCriteria));
  }

  compare_individual_types = (option: any, value: any) => {
    return option && value && option.value == value.value;
  };
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MentorReport2DataService } from 'src/app/_shared/data/mentor-report2-data.service';
import { SELECTITEM } from 'src/app/_shared/interfaces/SELECTITEM';
import { SORTCRITERIA } from 'src/app/_shared/interfaces/SORTCRITERIA';
import { MentorReportSubmittedCount } from 'src/app/_shared/models/mentor-report-submitted-count';
import { ColumnSortService } from 'src/app/_shared/services/column-sort.service';

@Component({
  selector: 'app-mr-submitted-count',
  templateUrl: './mentor-reports-submitted.component.html',
  styleUrls: ['./mentor-reports-submitted.component.scss'],
  standalone: false
})
export class MentorReportsSubmittedComponent implements OnInit {
  reportTypes: SELECTITEM[];
  mentorReportSubmittedCounts: MentorReportSubmittedCount[];
  isLoading: boolean;
  errorMessage: string;
  successMessage: string;
  sortCriteria: SORTCRITERIA;

  displayedColumns: string[] = ['mentorName', 'studentName', 'mentorAssignedDate', 'submittedCount', 'latestDate', 'mentoringComment'];
  dataSource: MatTableDataSource<MentorReportSubmittedCount>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    public sqlReports: MentorReport2DataService,
    private columnSorter: ColumnSortService,
    private router: Router
  ) {
    this.isLoading = false;
  }

  /*
https://plnkr.co/edit/DITVzCSqHHB1uNrTxFit?p=info
*/

  ngOnInit() {
    console.log('ngOnInit');
    this.fetchData();
  }

  fetchData() {
    console.log('fetchData for MentorReportsSubmittedCounts');
    this.isLoading = true;
    this.sqlReports.getMentorReportSubmittedCounts().subscribe(
      (data) => {
        this.mentorReportSubmittedCounts = data;
        console.log(this.mentorReportSubmittedCounts[0]);
        this.dataSource = new MatTableDataSource(data);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 100);
      },
      (err) => {
        this.errorMessage = err;
      },
      () => {
        console.log('done');
        this.isLoading = false;
      }
    );
  }

  public onSortColumn(sortCriteria: SORTCRITERIA) {
    console.log('parent received sortColumnCLick event with ' + sortCriteria.sortColumn);
    return this.mentorReportSubmittedCounts.sort((a, b) => this.columnSorter.compareValues(a, b, sortCriteria));
  }

  // onSorted($event) {
  //   console.log('sorted event received');
  // }

  gotoMember(memberGUId: string) {
    const link = ['/admins/members/member/', { guid: memberGUId }];
    console.log('navigating to ' + link);
    this.router.navigate(link);
  }

  gotoStudent(studentGUId: string) {

    // this.store.dispatch(new SetPhotoPathname(photoUrl));
    // this.store.dispatch(new SetSelectedStudentGUId(guid));
    // this.store.dispatch(new SetSelectedStudentName(studentName));
    // this.store.dispatch(new SetSelectedStudentMentorGUId(mentorGUId));
    // this.store.dispatch(new SetSelectedStudentIdentifiers({ studentGUId, studentName }));

    const link = ['admins/students/student-container', { guid: studentGUId }];
    console.log('navigating to ' + link);
    this.router.navigate(link);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

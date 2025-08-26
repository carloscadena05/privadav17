import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { UniversityDataService } from '../../_shared/data/university-data.service';
import { SORTCRITERIA } from '../../_shared/interfaces/SORTCRITERIA';
import { University } from '../../_shared/models/university';
import { ColumnSortService } from '../../_shared/services/column-sort.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PlusSignIcon } from '@hugeicons/core-free-icons';

@Component({
  selector: 'app-universities',
  templateUrl: './universities.component.html',
  styleUrls: ['./universities.component.scss'],
  standalone: false
})
export class UniversitiesComponent implements OnInit {
  universities: University[];
  isLoading: boolean;
  errorMessage: string;
  successMessage: string;
  sortCriteria: SORTCRITERIA;
  PlusSignIcon = PlusSignIcon
  /* 
    + CARLOS' CODE
     */

  displayedColumns: string[] = ['index', 'id', 'universityAbbrev', 'universityName', 'academicYearType'];
  dataSource: MatTableDataSource<University>;

  filters = {}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public universityData: UniversityDataService,
    public router: Router,
    private columnSorter: ColumnSortService,
    private store: Store
  ) {
    this.isLoading = false;
  }

  ngOnInit() {
    console.log('universities OnInit');
    this.fetchData();
  }

  fetchData() {
    this.isLoading = true;
    this.universityData.getUniversities().subscribe(
      (data) => {
        console.log('data ' + data[0].universityId);
        this.universities = data;
        this.dataSource = new MatTableDataSource(this.universities);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 100);
      },
      (err) => (this.errorMessage = err),
      () => {
        console.log('done' + this.universities[0].universityId);
        this.isLoading = false;
      }
    );
  }


  editUniversity(id: number) {
    const link = ['/admins/university-edit/', { id: id }];
    console.log('navigating to ' + link);
    this.router.navigate(link);
  }
  addNewUniversity() {
    const link = ['/admins/university-add'];
    console.log('navigating to ' + link);
    this.router.navigate(link);
  }
  /* 

  addNewUniversity(universityAbbrev: string) {
    console.log('adding universityAbbrev ' + universityAbbrev);
    if (!universityAbbrev ) {
      alert('University Abbrev must not be empty');
      return;
    }
    const sg = new University();
    sg.universityAbbrev = universityAbbrev;

    this.universityData.addNewUniversity(sg).subscribe(
      () => {
        console.log((this.successMessage = 'New University ' + universityAbbrev + ' added successfully'));
        this.isLoading = false;
        this.fetchData();
        this.successMessage = 'Be sure to edit the new University to add more details';
        window.setTimeout(() => {
          // console.log('clearing success message');
          this.successMessage = '';
        }, 5000);
      },
      (error) => {
        console.log((this.errorMessage = error));
        this.isLoading = false;
      }
    );
  } 
    */

  public onSortColumn(sortCriteria: SORTCRITERIA) {
    console.log('parent received sortColumnCLick event with ' + sortCriteria.sortColumn);
    return this.universities.sort((a, b) => this.columnSorter.compareValues(a, b, sortCriteria));
  }

  onSorted() {
    console.log('sorted event received');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async apply_filter(object: any) {
    this.filters = { ...this.filters, ...object };

    for (const key in this.filters)
      if (this.filters[key] == true)
        delete this.filters[key];

    this.dataSource.filterPredicate = (data: any) => {
      if (Object.keys(this.filters).length == 0)
        return true;

      for (const key in this.filters)
        if (data[key] != this.filters[key])
          return false;

      return true;
    };

    this.dataSource.filter = Object.keys(this.filters).length > 0
      ? JSON.stringify(this.filters)
      : '';
  }
}

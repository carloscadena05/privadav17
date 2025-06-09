import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { UniversityDataService } from '../../_shared/data/university-data.service';
import { SORTCRITERIA } from '../../_shared/interfaces/SORTCRITERIA';
import { University } from '../../_shared/models/university';
import { ColumnSortService } from '../../_shared/services/column-sort.service';

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
      },
      (err) => (this.errorMessage = err),
      () => {
        console.log('done' + this.universities[0].universityId);
        this.isLoading = false;
      }
    );
  }


  editUniversity(id: number) {
    const link = [ '/admins/university-edit/', { id: id } ];
    console.log('navigating to ' + link);
    this.router.navigate(link);
  }

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

  public onSortColumn(sortCriteria: SORTCRITERIA) {
    console.log('parent received sortColumnCLick event with ' + sortCriteria.sortColumn);
    return this.universities.sort((a, b) => this.columnSorter.compareValues(a, b, sortCriteria));
  }

  onSorted() {
    console.log('sorted event received');
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { SponsorGroupDataService } from 'src/app/_shared/data/sponsor-group-data.service';
import { SponsorGroup } from 'src/app/_shared/models/sponsor-group';
import { SponsorGroupMemberDTO } from 'src/app/_shared/models/sponsor-group-memberDTO';
import { UIState } from 'src/app/_store/ui/ui.state';
import { SORTCRITERIA } from '../../_shared/interfaces/SORTCRITERIA';
import { ColumnSortService } from '../../_shared/services/column-sort.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-sponsor-groups',
  templateUrl: './sponsor-groups.component.html',
  styleUrls: ['./sponsor-groups.component.scss'],
  standalone: false
})
export class SponsorGroupsComponent implements OnInit {
  sponsorGroups: SponsorGroupMemberDTO[];
  isLoading: boolean;
  errorMessage: string;
  successMessage: string;
  sortCriteria: SORTCRITERIA;
  displayTestNames: boolean;

  testNameVisibility$ = this.store.select<boolean>(UIState.getTestNamesVisibility);

  displayedColumns: string[] = ['sponsorGroupName', 'sponsorGroupMemberName'];
  dataSource: MatTableDataSource<SponsorGroupMemberDTO>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public sponsorGroupData: SponsorGroupDataService,
    public router: Router,
    private columnSorter: ColumnSortService,
    private store: Store
  ) {
    this.isLoading = false;
  }

  ngOnInit() {
    this.testNameVisibility$.subscribe((flag) => {
      this.displayTestNames = flag;
      this.fetchData();
    });
  }

  // can't rely on two way binding to have updated the selected values
  // in time so we do it manually below

  fetchData() {
    this.isLoading = true;
    console.log('in fetchFilteredData');
    this.sponsorGroupData.getSponsorGroupsWithMembers().subscribe(
      (data) => {
        this.sponsorGroups = data.filter((item) => {
          if (this.displayTestNames) {
            return item;
          } else if (!this.displayTestNames && item.sponsorGroupName !== '_Test _Sponsor _Group') {
            return item;
          }
        });
        this.dataSource = new MatTableDataSource(this.sponsorGroups);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 100);
      },
      (err) => (this.errorMessage = err),
      () => {
        console.log('done' + this.sponsorGroups[0].sponsorGroupId);
        this.isLoading = false;
      }
    );
  }
  gotoMember(id: number, memberName: string) {
    console.log('setting memberName to ' + memberName);
    // this.session.setAssignedMemberName(memberName);

    const link = ['/admins/members/member/' + id];
    console.log('navigating to ' + link);
    this.router.navigate(link);
  }

  editSponsorGroup(id: number) {
    const link = ['/admins/sponsor-group/' + id];
    console.log('navigating to ' + link);
    this.router.navigate(link);
  }

  addNewSponsorGroup(sponsorGroupName: string) {
    if (!sponsorGroupName || sponsorGroupName.length < 5) {
      alert('Sponsor Group Name must be at least 5 characters long');
      return;
    }
    const sg = new SponsorGroup();
    sg.sponsorGroupName = sponsorGroupName;

    console.log('adding sponsorGroupName ' + sg.sponsorGroupName);
    this.sponsorGroupData.addNewSponsorGroup(sg).subscribe(
      () => {
        console.log((this.successMessage = 'New SponsorGroup ' + sponsorGroupName + ' added successfully'));
        this.isLoading = false;
        this.fetchData();
        window.setTimeout(() => {
          // console.log('clearing success message');
          this.successMessage = '';
        }, 3000);
      },
      (error) => {
        console.log((this.errorMessage = error));
        this.isLoading = false;
      }
    );
  }

  public onSortColumn(sortCriteria: SORTCRITERIA) {
    console.log('parent received sortColumnCLick event with ' + sortCriteria.sortColumn);
    return this.sponsorGroups.sort((a, b) => this.columnSorter.compareValues(a, b, sortCriteria));
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
}

import { Component, inject, Input, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FollowUpRequestDTO } from '../../models/follow-up-requestDTO';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-follow-up-requests-list',
  templateUrl: './follow-up-requests-list.component.html',
  standalone: false
})
export class FollowUpRequestsListComponent {
  @Input() followUpRequests: FollowUpRequestDTO[];
  @Input() selectedRequestStatusId: number;
  displayCompleteHistory = false;

  studentId: number;
  currentHistoryText_EN: string;
  currentHistoryText_ES: string;
  currentRequestId = 0;

  displayedColumns: string[] = ['requestSubStatus', 'assignedToName', 'studentName', 'subject', 'requesterName', 'updaterName', 'detail', 'edit'];
  dataSource: MatTableDataSource<FollowUpRequestDTO>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  spanish: boolean = false;
  private dialog: MatDialog = inject(MatDialog);
  currentRequest!: FollowUpRequestDTO;

  constructor(private router: Router) {
    console.log('FollowUpRequestsListComponent constructor');

    this.spanish = navigator.language.startsWith('es');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    this.dataSource = new MatTableDataSource(changes.followUpRequests.currentValue);
    setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 100);
    
  }

  followUpRequestAdd() {
    console.log('in follow-up-requests: FollowUpRequestAdd, ready to navigate');
    const link = ['/admins/follow-up/requests-add'];
    this.router.navigate(link);
  }

  editFollowUpRequest(requestId: number) {
    console.log('edit has index ' + requestId);
    // const target = '/admins/follow-up/request-edit';
    //   const navigationExtras: NavigationExtras = {
    //     queryParams: {
    //               requestId: requestId,
    //               requestStatusId: this.selectedRequestStatusId
    //     }
    //   };
    //   console.log('navigate to target ' + target[0]);
    //   console.log('with queryParams ' + navigationExtras.queryParams);
    //   this.router.navigate([target], navigationExtras);

    const link: [string, { requestId: number, requestStatusId: number }] = [
      '/admins/follow-up/request-edit',
      {
        requestId: requestId,
        requestStatusId: this.selectedRequestStatusId
      }
    ];
    console.log('navigate to link ' + link);
    this.router.navigate(link);

  }

  setSelectedRow(idx: number) {
    console.log('set selected idx: ' + idx);
    this.currentRequestId = idx;
  }

  clearSelectedRow() {
    console.log('clear selected idx');
    this.currentRequestId = 0;
  }

  gotoStudent(guid: string) {
    if (guid && guid.length > 0) {
      const link = ['admins/students/student-container', { guid: guid }];
      console.log('navigating to ' + link);
      this.router.navigate(link);
    }
  }

  show_more_request(template: TemplateRef<any>, request: FollowUpRequestDTO) {
    this.dialog.open(template, {
      maxWidth: '48rem'
    });
    this.currentRequest = request;

  }

}

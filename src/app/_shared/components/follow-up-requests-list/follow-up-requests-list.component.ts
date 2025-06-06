import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FollowUpRequestDTO } from '../../models/follow-up-requestDTO';

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
  currentRequestId =0;

  constructor(private router: Router) {
    console.log('FollowUpRequestsListComponent constructor');
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

  setSelectedRow(idx : number) {
    console.log('set selected idx: ' + idx );
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

}

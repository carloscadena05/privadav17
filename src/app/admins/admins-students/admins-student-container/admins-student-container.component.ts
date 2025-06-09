import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { constants } from 'src/app/_shared/constants/constants';
import { SELECTITEM } from 'src/app/_shared/interfaces/SELECTITEM';

@Component({
    selector: 'app-admins_student-container',
    templateUrl: '../admins-student-container/admins-student-container.component.html',
    standalone: false
})
export class AdminsStudentContainerComponent implements OnInit {
  selectedQRPeriod = '';
  studentGUId: string;
  studentGUIdReceived: boolean;
  readonly qrPeriods: SELECTITEM[] = constants.qrPeriods;
  readonly reviewedStatuses: SELECTITEM[] = constants.reviewedQRStatuses;
  subscription: Subscription;
  twcss_activeTab = 'profile';




  constructor(private route: ActivatedRoute, private store: Store) {

  }

  ngOnInit() {
    this.studentGUId = this.route.snapshot.params['guid'];
    console.log('student student-profile with studentGUId: ' + this.studentGUId);
  }

}

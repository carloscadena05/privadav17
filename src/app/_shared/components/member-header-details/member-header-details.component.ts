import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { SetPhotoPathname } from 'src/app/_store/member/member.action';
import { MemberState } from 'src/app/_store/member/member.state';
import { MemberDataService } from '../../data/member-data.service';
import { MemberHeaderDTO } from '../../models/memberHeaderDTO';

@Component({
    selector: 'app-member-header-details',
    templateUrl: './member-header-details.component.html',
    standalone: false
})
export class MemberHeaderDetailsComponent implements OnInit {
  data: Object;
  loadingState = 0;
  submitted: boolean;
  bReadOnly = true;

  errorMessage: string;
  successMessage: string;
  // firstNames: string;
  // lastNames: string;

  member: MemberHeaderDTO;
  memberGUId: string;
  private subscription: Subscription;

   currentGUId$ = this.store.select<string>(MemberState.getSelectedMemberGUId);

  constructor(private store: Store, public memberData: MemberDataService, public location: Location) {
    console.log('hi from MemberHeaderDetails constructor');

    this.errorMessage = '';
    this.successMessage = '';
    this.submitted = false;
  }

  ngOnInit() {
    console.log('MemberHeaderDetails ngOnInit');
    // this.fetchMemberDTOData();
    this.loadingState = 0;
    this.subscribeForMemberGUIds2();
  }

  subscribeForMemberGUIds2() {
    // console.log('header set up memberGUId subscription');
    this.subscription = this.currentGUId$.subscribe((message) => {
      this.memberGUId = message;
      console.log('************NGXS: header new StudentGUId received' + this.memberGUId);
      if (this.memberGUId && this.memberGUId !== '0000') {
        this.fetchData();
      }
    });
  }

  fetchData() {
    this.loadingState = 1;
    this.memberData.getMemberHeaderDTO(this.memberGUId).subscribe(
      (data) => {
        this.member = data;
      },
      (err) => {
        this.errorMessage = err;
      },
      () => {
        this.loadingState = 2;
        this.store.dispatch(new SetPhotoPathname(this.member.photoUrl));
      }
    );
  }
}

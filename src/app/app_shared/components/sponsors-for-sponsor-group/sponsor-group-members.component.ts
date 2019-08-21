import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { SponsorGroupMemberDTO } from '../../models/sponsor-group-memberDTO';
import { SessionService } from '../../services/session.service';
import { SqlResource } from '../../services/sql-resource.service';

@Component({
  selector: 'app-sponsor-group-members',
  templateUrl: './sponsor-group-members.component.html'
})

export class SponsorGroupMembersComponent implements OnInit, OnChanges {
  sponsorGroupMembers: SponsorGroupMemberDTO[];
  sponsorName: string;
  sponsorId: number;
  isLoading: boolean;
  submitted: boolean;
  bReadOnly = true;
  errorMessage: string;
  successMessage: string;

  @Output() onSelectedSponsorName = new EventEmitter<string>();
  @Output() onSelectedSponsorId = new EventEmitter<number>();
  // @Input() studentId: number;
  @Input() sponsorGroupId: number;
  @Input() newMemberNotification: string;

  constructor(public session: SessionService,
    private sqlResource: SqlResource) {

    console.log('in SponsorsForSponsorGroupComponent constructor with SponsorGroupId=' + this.sponsorGroupId);
  }

  public ngOnInit() {
    this.fetchData();
  }
  fetchData() {
    this.sqlResource.getMembersForSponsorGroup(this.sponsorGroupId)
      .subscribe(
        data => { this.sponsorGroupMembers = data; console.log('getSponsorsForSponsorGroup'); console.log(this.sponsorGroupMembers[0]); },
        err => console.error('Subscribe error: ' + err),
        () => {
          console.log('sponsors-for-sponsor-group loaded ' + this.sponsorGroupMembers.length + ' rows');
        }
      );
  }

  public ngOnChanges(changes: SimpleChanges) {
    // if (changes.sponsorGroupId) {
    //   console.log('sponsorGroupMembers child has new input sponsorGroupId');
    //   this.ngOnInit();
    // }
    if (changes.newMemberNotification) {
      console.log('sponsorGroupMembers child has new input newMemberNotification');
      this.fetchData();
    }
  }

  deleteSponsorGroupMember(sponsorGroupId: number, sponsorGroupMemberId: number) {
    console.log('delete click for ' + sponsorGroupId + '|' + sponsorGroupMemberId);
    this.sqlResource.deleteSponsorGroupMember(sponsorGroupId, sponsorGroupMemberId)
      .subscribe(
        data => {
          console.log('deleteSponsorsForSponsorGroup');
          window.setTimeout(() => {
            this.successMessage = 'Changes were saved successfully.';
          }, 0);
          this.submitted = true;
          this.isLoading = false;
          window.setTimeout(() => {// console.log('clearing success message');
            this.successMessage = '';
          }, 3000);
        },
        err => console.error('Subscribe error: ' + err),
        () => {
          this.fetchData();
        });
  }

}

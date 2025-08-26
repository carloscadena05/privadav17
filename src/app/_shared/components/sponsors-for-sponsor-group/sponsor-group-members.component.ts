import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { SponsorGroupDataService } from '../../data/sponsor-group-data.service';
import { SponsorGroupMemberDTO } from '../../models/sponsor-group-memberDTO';
import { SessionService } from '../../services/session.service';
import { Cancel01FreeIcons } from '@hugeicons/core-free-icons';

@Component({
    selector: 'app-sponsor-group-members',
    templateUrl: './sponsor-group-members.component.html',
    standalone: false
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
  @Input() sponsorGroupId: number;
  @Input() newMemberNotification: string;

  Cancel01FreeIcons = Cancel01FreeIcons;
  constructor(public session: SessionService, private sponsorGroupData: SponsorGroupDataService) {
    console.log('in SponsorsForSponsorGroupComponent constructor with SponsorGroupId=' + this.sponsorGroupId);
  }

  public ngOnInit() {
    this.fetchData();
  }
  fetchData() {
    if (this.sponsorGroupId) {
      this.sponsorGroupData.getMembersForSponsorGroup(this.sponsorGroupId).subscribe(
        (data) => {
          this.sponsorGroupMembers = data;
          console.log('getMembersForSponsorGroup');
          console.log(this.sponsorGroupMembers[0]);
        },
        (err) => console.error('Subscribe error: ' + err),
        () => {
          // console.log('members-for-sponsor-group loaded ' + this.sponsorGroupMembers.length + ' rows');
        }
      );
    }
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.sponsorGroupId) {
      // console.log('sponsorGroupMembers child has new input sponsorGroupId');
      this.sponsorGroupId = changes.sponsorGroupId.currentValue;
      // console.log('sponsorGroupMembers child has new input sponsorGroupId' + this.sponsorGroupId);
      this.fetchData();
    }
    if (changes.newMemberNotification) {
      // console.log('sponsorGroupMembers child has new input newMemberNotification');
      this.fetchData();
    }
  }

  deleteSponsorGroupMember(sponsorGroupId: number, sponsorGroupMemberId: number) {
    console.log('delete click for ' + sponsorGroupId + '|' + sponsorGroupMemberId);
    this.sponsorGroupData.deleteSponsorGroupMember(sponsorGroupId, sponsorGroupMemberId).subscribe(
      () => {
        console.log('deleteSponsorsForSponsorGroup');
        window.setTimeout(() => {
          this.successMessage = 'Changes were saved successfully.';
        }, 0);
        this.submitted = true;
        this.isLoading = false;
        window.setTimeout(() => {
          // console.log('clearing success message');
          this.successMessage = '';
        }, 3000);
      },
      (err) => console.error('Subscribe error: ' + err),
      () => {
        this.fetchData();
      }
    );
  }
}

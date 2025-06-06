import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberDataService } from '../../data/member-data.service';
import { MemberMiniDTO } from '../../models/memberMiniDTO';
import { SponsorGroupMember } from '../../models/sponsor-group-member';

@Component({
    selector: 'app-sponsor-group-member-edit',
    templateUrl: './sponsor-group-member-edit.component.html',
    standalone: false
})
export class SponsorGroupMemberEditComponent implements OnInit {
  myForm: UntypedFormGroup;
  isLoading: boolean;
  submitted: boolean;
  bReadOnly = true;
  errorMessage: string;
  successMessage: string;
  memberSponsors: MemberMiniDTO[];
  memberSponsor: MemberMiniDTO;
  memberId: number;
  @Input() sponsorGroupId: number;
  eventMessage: string;
  @Output() onSelectedMember = new EventEmitter<string>();

  constructor(
    public currRoute: ActivatedRoute,
    public memberData: MemberDataService,
    public router: Router,
    public formBuilder: UntypedFormBuilder
  ) {
    this.isLoading = false;

    this.myForm = formBuilder.group({
      memberSelector: [ { value: '' } ]
    });
  }

  public ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.isLoading = true;
    console.log('in fetchData for getActiveSponsorMembers');
    this.memberData.getActiveSponsorMembers().subscribe(
      (data) => {
        this.memberSponsors = data;
        console.log('getActiveMemberSponsors');
        console.log(this.memberSponsors[0]);
      },
      (err) => console.error('Subscribe error: ' + err),
      () => {
        console.log('sponsor-group-member-edit loaded ' + this.memberSponsors.length + ' rows');
        this.isLoading = false;
        // this.setFormValues(this.memberSponsors);
      }
    );
  }

  setSelectedMember() {
    const newSponsorGroupMember = new SponsorGroupMember();
    const ctls = this.myForm.controls;

    newSponsorGroupMember.sponsorGroupMemberId = ctls.memberSelector.value.memberId;
    newSponsorGroupMember.sponsorGroupId = +this.sponsorGroupId;
    console.log('after constructor assignments');
    console.log(newSponsorGroupMember);
    this.memberData.addNewSponsorGroupMember(newSponsorGroupMember).subscribe(
      () => {
        // console.log('subscribe result in updateStudent');
        // need timeout to avoid "Expression has changed error"
        window.setTimeout(() => {
          this.successMessage = 'Changes were saved successfully.';
          console.log('// cause sibling to reload by sending @Output message up through parent');
          this.eventMessage = 'newMember:' + newSponsorGroupMember.sponsorGroupMemberId;
          this.onSelectedMember.emit(this.eventMessage);
          this.myForm.controls.memberSelector.setValue({ memberId: 0, memberName: '' });
        }, 0);
        // this.successMessage = 'Changes were saved successfully.';
        this.submitted = true;
        this.isLoading = false;
        window.setTimeout(() => {
          // console.log('clearing success message');
          this.successMessage = '';
        }, 3000);
      },
      (error) => {
        console.log((this.errorMessage = error.message));
        this.isLoading = false;
        this.myForm.controls.memberSelector.setValue({ memberId: 0, memberName: '' });
        window.setTimeout(() => {
          // console.log('clearing success message');
          this.errorMessage = '';
        }, 3000);
      }
    );

    // prevent default action of reload
    return false;
  }
}

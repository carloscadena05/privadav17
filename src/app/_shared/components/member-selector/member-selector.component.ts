import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MemberDataService } from '../../data/member-data.service';
import { SELECTITEM } from '../../interfaces/SELECTITEM';
import { MemberMiniDTO } from '../../models/memberMiniDTO';
@Component({
    selector: 'app-member-selector',
    templateUrl: './member-selector.component.html',
    styleUrls: ['./member-selector.component.scss'],
    standalone: false
})
export class MemberSelectorComponent implements OnInit {
  members: Array<MemberMiniDTO>;
  errorMessage = '';
  haveData: boolean;
  haveMemberType = false;
  requesterRoles: SELECTITEM[];
  selectedRoles: SELECTITEM[];
  @Output() onSelectedRoleId = new EventEmitter<number>();
  @Output() onSelectedMemberId = new EventEmitter<number>();
  @Input() memberTypeLabel: string;
  @Input() roleId: string;
  @Input() currMemberId : number;
  requesterMembers: MemberMiniDTO[];
  selectedMembers: MemberMiniDTO[];


  constructor(private memberData: MemberDataService) {
    this.requesterRoles = [
      // { value: '0', label: '[None]' },
      // { value: '1008', label: 'Volunteer' },
      // { value: '1009', label: 'Sponsor' },
      // { value: '1010', label: 'Mentor' },
      // { value: '1013', label: 'Donor' },
      // { value: '1007', label: 'Board Member' },
      { value: '2068', label: 'Admin' },
      // { value: '2069', label: 'Student' }
    ];
  }


  public ngOnInit() {
    this.haveData = false;
    this.haveMemberType = true;
    this.setSelectedRole(this.roleId);
  }

  public setSelectedRole(roleId2: string) {
    console.log('selectedRole is set to ' + roleId2);
    this.haveMemberType = true;
    console.log(this.requesterRoles);

    this.selectedRoles = this.requesterRoles.filter((r) => r.value == roleId2 );
    // console.log(this.selectedRoles);
    const x = this.selectedRoles.map((row) => row.label);
    // console.log(this.selectedRoles);
    // console.log(x);
    console.log('selectedRoles[0] value,label is '  + this.selectedRoles[0].value, this.selectedRoles[0].label);
    this.fetchMembers(this.selectedRoles[0].label);
    this.onSelectedRoleId.emit(+roleId2);
  }

  public fetchMembers(role: string) {
    console.log('in fetchMembers');
    this.memberData.getCurrentMemberMiniDTOsByRole(role).subscribe(
      (data) => {
        this.members = data;
      },
      (err) => console.error('Subscribe error: ' + err),
      () => {
        console.log('member-selector loaded ' + this.members.length + ' rows');
        if (this.members.length > 0) {

          this.selectedMembers = this.members.filter((m) => m.memberId == this.currMemberId );
          const x = this.selectedMembers.map((row) => row.memberName);
          console.log(this.members[0].memberName);
        } else {
          //
        }
      }
    );
  }
  public setSelectedMember(memberId: string) {
    console.log('selected memberId is set to ' + memberId);
    this.onSelectedMemberId.emit(+memberId);
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MemberDataService } from '../../data/member-data.service';
import { MemberMiniDTO } from '../../models/memberMiniDTO';

@Component({
    selector: 'app-mentor-selector',
    templateUrl: './mentor-selector.component.html',
    standalone: false
})
export class MentorSelectorComponent implements OnInit {
  members: Array<MemberMiniDTO>;
  errorMessage = '';
  haveData: boolean;
  @Input() initialMemberGUId: string;
  @Output() onSelectedMemberGUId = new EventEmitter<string>();
  memberTypeLabel = 'Mentor';

  constructor(private memberData: MemberDataService) {}
  public ngOnInit() {
    this.haveData = false;
    this.fetchMembers(this.memberTypeLabel);
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
          console.log(this.members[0].memberName);
          this.haveData = true;
        } else {
          //
        }
      }
    );
  }
  public setSelectedMember(memberGUId: string) {
    console.log('selected memberId is set to ' + memberGUId);
    this.onSelectedMemberGUId.emit(memberGUId);
  }
}

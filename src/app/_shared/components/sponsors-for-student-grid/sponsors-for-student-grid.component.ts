import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { StudentState } from 'src/app/_store/student/student.state';
import { StudentDataService } from '../../data/student-data.service';
import { SponsorGroupMemberDTO } from '../../models/sponsor-group-memberDTO';
import { SessionService } from '../../services/session.service';

@Component({
    selector: 'app-sponsors-for-student-grid',
    templateUrl: './sponsors-for-student-grid.component.html',
    standalone: false
})
export class SponsorsForStudentGridComponent implements OnInit, OnChanges {
  sponsors: Array<SponsorGroupMemberDTO>;
  sponsorName: string;
  // sponsorId: number;
  errorMessage = '';
  studentGUId: string;
  private subscription: Subscription;

  @Output() onSelectedSponsorName = new EventEmitter<string>();
  @Output() onSelectedSponsorId = new EventEmitter<number>();
  @Input() sponsorId: number; // only used for change detection

   currentGUId$ = this.store.select<string>(StudentState.getSelectedStudentGUId);

  constructor(public session: SessionService,
     private studentData: StudentDataService,
     private store: Store
     ) {}

  public ngOnInit() {


    console.log('ponsors-for-student-grid  onInit sponsors for student gred with' + this.studentGUId );
    if (this.studentGUId) {
    this.studentData.getSponsorGroupMembersForStudent(this.studentGUId).subscribe(
      (data) => {
        this.sponsors = data;
        console.log('>>>>>>>>>>>getSponsorMembersForStudent');
        console.log(this.sponsors[0]);
      },
      (err) => console.error('Subscribe error: ' + err),
      () => {
        console.log('sponsors-for-student-grid loaded ');
        if (this.sponsors.length > 0) {
          this.selectFirstRow();
        } else {
          this.errorMessage = 'No Assigned Sponsors.';
        }
      }
    );
    }
    this.subscribeForStudentGUIds2();
  }

  subscribeForStudentGUIds2() {
    this.subscription = this.currentGUId$.subscribe((message) => {
      this.studentGUId = message;
      console.log('************NGXS: header details new StudentGUId received' + this.studentGUId);
    });
  }
  public ngOnChanges() {}

  selectFirstRow() {
    console.log(
      'First row Id is ' + this.sponsors[0].sponsorGroupMemberId + ' ' + this.sponsors[0].sponsorGroupMemberName
    );
    this.setRowClasses(+this.sponsors[0].sponsorGroupMemberId);
    this.selectSponsor(+this.sponsors[0].sponsorGroupMemberId, 0);
  }

  public selectSponsor(sponsorId: number, idx: number) {
    console.log('sponsor selected sponsorId: ' + sponsorId + ' idx: ' + idx);
    const sponsorName: string = this.sponsors[idx].sponsorGroupMemberName; //  + ', ' + this.sponsorMentors[idx].sponsorFirstNames;
    this.sponsorId = sponsorId;
    this.onSelectedSponsorId.emit(sponsorId);
    this.onSelectedSponsorName.emit(sponsorName);
  }
  public setRowClasses(sponsorId: number) {
    const classes = {
      'table-success': sponsorId === this.sponsorId,
      'sponsor-row': true,
      clickable: true
    };
    return classes;
  }
}

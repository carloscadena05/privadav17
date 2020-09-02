import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SponsorGroupDataService } from 'src/app/_shared/data/sponsor-group-data.service';
import { SponsorGroup } from 'src/app/_shared/models/sponsor-group';
import { SORTCRITERIA } from '../../_shared/interfaces/SORTCRITERIA';

@Component({
  selector: 'app-sponsor-group',
  templateUrl: './sponsor-group.component.html'
})
export class SponsorGroupComponent implements OnInit {
  myForm: FormGroup;
  sponsorGroup: SponsorGroup;
  isLoading: boolean;
  submitted: boolean;
  bReadOnly = true;
  errorMessage: string;
  successMessage: string;
  sortCriteria: SORTCRITERIA;
  sponsorGroupId: number;
  newMemberMessage: string;

  constructor(
    public currRoute: ActivatedRoute,
    public sponsorGroupData: SponsorGroupDataService,
    public router: Router,
    public formBuilder: FormBuilder,
    public location: Location
  ) {
    this.isLoading = false;

    this.myForm = formBuilder.group({
      sponsorGroupId: [ { value: '', hidden: true } ],
      sponsorGroupName: [ '', Validators.compose([ Validators.required, Validators.maxLength(50) ]) ]
    });
    // this.myForm.disable();
  }

  ngOnInit() {
    this.sponsorGroup = new SponsorGroup();
    this.sponsorGroupId = this.currRoute.snapshot.params['id'];
    console.log('data service with sponsorGroupId: ' + this.sponsorGroupId);
    this.fetchData();
  }

  fetchData() {
    this.isLoading = true;
    this.sponsorGroupData.getSponsorGroup(this.sponsorGroupId).subscribe(
      (data) => {
        this.sponsorGroup = data;
      },
      (err) => (this.errorMessage = err),
      () => {
        console.log('done ' + this.sponsorGroup.sponsorGroupId + ':' + this.sponsorGroup.sponsorGroupName);
        this.isLoading = false;
        this.setFormValues(this.sponsorGroup);
      }
    );
  }

  setFormValues(sponsorGroup: SponsorGroup) {
    console.log('setFormValues ' + sponsorGroup.sponsorGroupName);
    this.myForm.setValue({
      sponsorGroupId: sponsorGroup.sponsorGroupId,
      sponsorGroupName: sponsorGroup.sponsorGroupName
    });
  }

  retrieveFormValues(): void {
    console.log('retrieveFormValues ' + JSON.stringify(this.myForm.value));
    // use spread operator to merge changes:
    this.sponsorGroup = { ...this.sponsorGroup, ...this.myForm.value };
  }

  saveSponsorGroup(): boolean {
    console.log('saving admin student ');
    this.isLoading = true;
    this.retrieveFormValues();
    this.sponsorGroupData.updateSponsorGroup(this.sponsorGroup).subscribe(
      () => {
        // console.log('subscribe result in updateStudent');
        // need timeout to avoid "Expression has changed error"
        window.setTimeout(() => {
          this.successMessage = 'Changes were saved successfully.';
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
        this.errorMessage = error;
        this.isLoading = false;
      }
    );
    // prevent default action of reload
    return false;
  }

  receiveSelectedMemberEvent($event) {
    console.log('parent recevied SelectedMemberEvent');
    this.newMemberMessage = $event;
  }
}

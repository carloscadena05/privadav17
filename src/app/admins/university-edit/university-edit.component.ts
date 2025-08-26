import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { constants } from 'src/app/_shared/constants/constants';
import { SELECTITEM } from 'src/app/_shared/interfaces/SELECTITEM';
import { UniversityDataService } from '../../_shared/data/university-data.service';
import { SORTCRITERIA } from '../../_shared/interfaces/SORTCRITERIA';
import { University } from '../../_shared/models/university';

@Component({
    selector: 'app-university',
    templateUrl: './university-edit.component.html',
    standalone: false
})
export class UniversityEditComponent implements OnInit {
  myForm: UntypedFormGroup;
  university: University;
  isLoading: boolean;
  submitted: boolean;
  bReadOnly = true;
  errorMessage: string;
  successMessage: string;
  sortCriteria: SORTCRITERIA;
  universityId: number;
  newMemberMessage: string;
  academicYearTypes: SELECTITEM[];

  constructor(
    public currRoute: ActivatedRoute,
    public universityData: UniversityDataService,
    public router: Router,
    public formBuilder: UntypedFormBuilder,
    public location: Location
  ) {
    this.isLoading = false;
    this.academicYearTypes = constants.academicYearTypes;

    this.myForm = formBuilder.group({
      universityId: [ { value: '', hidden: true } ],
      universityAbbrev: [ '', Validators.compose([ Validators.required, Validators.maxLength(10) ]) ],
      universityName: [ '', Validators.compose([ Validators.required, Validators.maxLength(50) ]) ],
      universityCity: [ '', Validators.compose([ Validators.required, Validators.maxLength(50) ]) ],
      academicYearTypeId: [ '', Validators.compose([ Validators.required ]) ]
    });
    // this.myForm.disable();
  }

  ngOnInit() {
    this.university = new (University);
    this.universityId = this.currRoute.snapshot.params['id'];
    console.log('data service with universityId: ' + this.universityId);
    this.fetchData();
  }

  fetchData() {
    this.isLoading = true;
    this.universityData.getUniversity(this.universityId).subscribe(
      (data) => {
        this.university = data;
      },
      (err) => (this.errorMessage = err),
      () => {
        console.log('done ' + this.university.universityId);
        this.isLoading = false;
        this.setFormValues(this.university);
      }
    );
  }

  setFormValues(university: University) {
    console.log('setFormValues ' + university.universityName);
    this.myForm.setValue({
      universityId: university.universityId,
      universityName: university.universityName,
      universityAbbrev: university.universityAbbrev,
      universityCity: university.universityCity,
      academicYearTypeId: String(university.academicYearTypeId)

    });
  }

  retrieveFormValues(): void {
    console.log('retrieveFormValues ' + JSON.stringify(this.myForm.value));
    // use spread operator to merge changes:
    this.university = { ...this.university, ...this.myForm.value };
  }

  saveUniversity(): boolean {
    console.log('saving university ');
    this.isLoading = true;
    this.retrieveFormValues();
    this.universityData.updateUniversity(this.university).subscribe(
      () => {
        // console.log('subscribe result in updateStudent');
        // need timeout to avoid "Expression has changed error"
        window.setTimeout(() => {
          this.successMessage = 'Changes saved successfully';
        }, 0);
        // this.successMessage = 'Changes were saved successfully.';
        this.submitted = true;
        this.isLoading = false;
        window.setTimeout(() => {
          this.location.back();
          // console.log('clearing success message');
          this.successMessage = '';
        }, 1500);
      },
      (error) => {
        this.errorMessage = error;
        this.isLoading = false;
      }
    );
    // prevent default action of reload
    return false;
  }
onCancel() {
    this.location.back();
  }

}

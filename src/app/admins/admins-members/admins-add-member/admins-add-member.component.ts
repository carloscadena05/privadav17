import { Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { constants } from 'src/app/_shared/constants/constants';
import { MemberDataService } from 'src/app/_shared/data/member-data.service';
import { SELECTITEM } from 'src/app/_shared/interfaces/SELECTITEM';
import { Member } from 'src/app/_shared/models/member';
import { Country } from 'src/app/_shared/models/neon/country.interface';
import { State } from 'src/app/_shared/models/neon/state.interface';
import { MasterService } from 'src/app/_shared/services/master.service';
import { NeonService } from 'src/app/_shared/services/neon.service';
import { ProviderService } from 'src/app/_shared/services/provider.service';
import { UrlService } from 'src/app/_shared/services/url.service';

@Component({
  templateUrl: './admins-add-member.component.html',
  styleUrls: ['./admins-add-member.component.scss'],
  standalone: false
})
export class AdminsAddMemberComponent implements OnInit {
  private form_builder: FormBuilder = inject(FormBuilder);
  private neon: NeonService = inject(NeonService);
  private provider: ProviderService = inject(ProviderService);
  private master: MasterService = inject(MasterService);

  myForm: UntypedFormGroup;
  data: Object;
  isLoading: boolean;
  submitted: boolean = false;
  bReadOnly = true;
  errorMessage: string;
  successMessage: string;

  countryList: SELECTITEM[];
  languageStatuses: SELECTITEM[];
  roleStatuses: SELECTITEM[];

  firstNames: string;
  lastNames: string;
  member: Member;
  newGUId: string;

  public bInvalidSubmitState = false;

  // public statusGroupError = 'statusGroupError';

  /* 
  + CARLOS' CODE
   */
  add_sponsor_form: FormGroup;
  countries: Country[] = [];
  stateProvinces: State[] = [];

  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    public urlService: UrlService,
    public memberData: MemberDataService,
    private _fb: UntypedFormBuilder,
    public location: Location
  ) {
    console.log('hi from AdminsAddMember constructor');

    this.languageStatuses = constants.languageStatuses;
    this.roleStatuses = constants.memberStatuses;

    this.myForm = _fb.group({
      textGroup: _fb.group(
        {
          firstNames: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
          lastNames: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
          email: ['', Validators.compose([Validators.required, Validators.email, Validators.maxLength(50)])],
          is_sponsor: [false]
        },
        { validator: this.setAllTextFields }
      )
      // statusGroup: _fb.group(
      //   {
      //     mentorStatusId: [''],
      //     sponsorStatusId: [''],
      //     adminStatusId: [''],
      //     employeeStatusId: [''],
      //     donorStatusId: [''],
      //     volunteerStatusId: [''],
      //     presidentStatusId: [''],
      //     boardStatusId: ['']
      //   },
      //   { validator: this.setAtLeastOneStatus }
      // )
    });

    /* 
    + CARLOS' CODE
    */

    this.add_sponsor_form = this.form_builder.group({
      firstNames: [null, Validators.required],
      middleName: [null, Validators.required],
      lastNames: [null, Validators.required],
      email: [null, Validators.required],
      smA_Phone: [null],
      city: [null],
      addressLine1: [null],
      addressLine2: [null],
      addressLine3: [null],
      addressLine4: [null],
      stateProvince: this.form_builder.control([]),
      country: this.form_builder.control([]),
      zipCode: [null]
    });

    // this.myForm.controls.statusGroup.setValidators(this.setAtLeastOneStatus);

    // this.myForm.controls.statusGroup.updateValueAndValidity();
    this.member = new Member();

    this.member.firstNames = '';
    this.member.lastNames = '';
    this.member.email = '';
    // this.member.mentorStatusId = 0;
    // this.member.mentorStatusId = 0;
    // this.member.sponsorStatusId = 0;
    // this.member.adminStatusId = 0;
    // this.member.employeeStatusId = 0;
    // this.member.donorStatusId = 0;
    // this.member.volunteerStatusId = 0;
    // this.member.presidentStatusId = 0;
    // this.member.boardMemberStatusId = 0;

    this.errorMessage = '';
    this.successMessage = '';
    this.submitted = false;
  }

  ngOnInit() {
    console.log('admins AddMember ngOnInit');
    this.setFormValues(this.member);
    this.isLoading = false;
    this.get_neon_lists();
  }

  setFormValues(member: Member) {
    console.log('setFormValues');
    this.myForm.patchValue({
      // memberId: 0,
      firstNames: member.firstNames,
      lastNames: member.lastNames,
      email: member.email // ,

      // mentorStatusId: member.mentorStatusId,
      // sponsorStatusId: member.sponsorStatusId,
      // adminStatusId: member.adminStatusId,
      // employeeStatusId: member.employeeStatusId,
      // donorStatusId: member.donorStatusId,
      // volunteerStatusId: member.volunteerStatusId,
      // presidentStatusId: member.presidentStatusId,
      // boardStatusId: member.boardMemberStatusId
    });
  }

  retrieveFormValues(): void {
    console.log('retrieveFormValues ' + JSON.stringify(this.myForm.value));
    // use spread operator to merge changes:
    this.member = {
      ...this.member,
      ...this.myForm.value,
      ...this.myForm.controls.textGroup.value,
      // ...this.myForm.controls.statusGroup.value
    };
  }

  async saveMyForm(): Promise<boolean> {
    console.log('saving admin member ');

    if (!this.myForm.valid) {
      this.bInvalidSubmitState = true;
      return false;
    }
    if (this.myForm.value.textGroup.is_sponsor) {
      const neon_sponsor: any = await this.save_sponsor();
      this.member.neonID = await neon_sponsor.id
    }

    this.isLoading = true;
    this.retrieveFormValues();
    this.memberData.addMember(this.member).subscribe(
      async (member) => {
        console.log('subscribe result in updateMember');
        // need timeout to avoid "Expression has changed error"

        window.setTimeout(() => {
          this.master.snack('success', 'New Member was created successfully. Click [Edit New Member] below to fill in additional details for this member.')
          /* this.successMessage =
            'New Member was created successfully. Click [Edit New Member] below to fill in additional details for this member.'; */
        }, 0);
        this.newGUId = member.memberGUId;
        this.submitted = true;
        this.myForm.disable();
        this.isLoading = false;
        window.scrollTo(0, 0);
        // window.setTimeout(() => {// console.log('clearing success message');
        //   this.successMessage = '';
        // }, 10000);
      },
      (error) => {
        console.log(error);
        this.master.snack('error', 'An error occurred; please check if a member with that email address already exits.')
        // this.errorMessage = 'An error occurred; please check if a member with that email address already exits.'; // <any>error.message;
        this.isLoading = false;
        window.setTimeout(() => {
          // console.log('clearing error message');
          this.errorMessage = '';
        }, 10000);
      }
    ); 
    // prevent default action of reload
    return false;
  }

  backToMemberSearch() {
    this.router.navigate(['/admins/members']);
  }

  gotoMember() {
    const link = ['admins/members/member', { guid: this.newGUId }];
    console.log('navigating to ' + link);
    this.router.navigate(link);
  }

  setAllTextFields(fg: UntypedFormGroup) {
    console.log('check if set all text fields');
    console.log('>' + fg.controls.firstNames.value + '<');
    console.log('>' + fg.controls.lastNames.value + '<');
    console.log('>' + fg.controls.email.value + '<');

    if (fg.controls.firstNames.value === '' || fg.controls.lastNames.value === '' || fg.controls.email.value === '') {
      console.log(' set -- setting error allText');

      return { allText: true };
    }
    return null;
  }

  setAtLeastOneStatus(fg: UntypedFormGroup) {
    if (
      fg.controls.mentorStatusId.value === '' &&
      fg.controls.sponsorStatusId.value === '' &&
      fg.controls.adminStatusId.value === '' &&
      fg.controls.employeeStatusId.value === '' &&
      fg.controls.donorStatusId.value === '' &&
      fg.controls.volunteerStatusId.value === '' &&
      fg.controls.presidentStatusId.value === '' &&
      fg.controls.boardStatusId.value === ''
    ) {
      console.log('no Status set -- setting error atLeastOne');
      return { atLeastOne: true };
    }
    return null;
  }

  public hasChanges() {
    // if have changes then ask for confirmation
    // ask if form is dirty and has not just been submitted
    console.log('hasChanges has submitted ' + this.submitted);
    console.log('hasChanges has form dirty ' + this.myForm.dirty);
    console.log('hasChanges net is ' + this.myForm.dirty || this.submitted);
    return this.myForm.dirty && !this.submitted;
  }

  /* 
  + CARLOS' CODE
  */

  async get_neon_lists() {
    this.countries = <Country[]>await this.neon.get_properties('countries')
    this.stateProvinces = <State[]>await this.neon.get_properties('stateProvinces')
  }


  async save_sponsor() {
    const sponsor = {
      "individualAccount": {
        "firstName": this.myForm.value.textGroup.firstNames, // this.add_sponsor_form.value.firstNames,
        "lastName": this.myForm.value.textGroup.lastNames,
        "primaryContact": {
          "firstName": this.myForm.value.textGroup.firstNames,
          "middleName": this.add_sponsor_form.value.middleName,
          "lastName": this.myForm.value.textGroup.lastNames,
          "email1": this.myForm.value.textGroup.email,
          "addresses": [{
            "isPrimaryAddress": true,
            "phone1": this.add_sponsor_form.value.smA_Phone,
            "country": this.add_sponsor_form.value.country,
            "stateProvince": this.add_sponsor_form.value.stateProvince,
            "city": this.add_sponsor_form.value.city,
            "addressLine1": this.add_sponsor_form.value.addressLine1,
            "addressLine2": this.add_sponsor_form.value.addressLine2,
            "addressLine3": this.add_sponsor_form.value.addressLine3,
            "addressLine4": this.add_sponsor_form.value.addressLine4,
            "zipCode": this.add_sponsor_form.value.zipCode,
          }]
        }
      }
    }

    return await this.provider.production('POST', '/neon/accounts', { body: sponsor })
  }

  select_country(id: string) {
    const country = this.countries.find((country: any) => country.id == id);

    if (country)
      this.add_sponsor_form.controls['country'].patchValue(country);
  }
  select_state(id: string) {
    const state = this.stateProvinces.find((state: any) => state.code == id);

    if (state)
      this.add_sponsor_form.controls['stateProvince'].patchValue(state);
  }

    /* 
  * COMPARE FUNCTIONS
  */

  compare_individual_types = (option: any, value: any) => {
    return option && value && ((option.id && option.id == value.id) || option.code && option.code == value.code);
  };
}

import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { constants } from 'src/app/_shared/constants/constants';
import { MemberDataService } from 'src/app/_shared/data/member-data.service';
import { SELECTITEM } from 'src/app/_shared/interfaces/SELECTITEM';
import { Member } from 'src/app/_shared/models/member';
import { UrlService } from 'src/app/_shared/services/url.service';
import { ProviderService } from 'src/app/_shared/services/provider.service';
import { NeonService } from 'src/app/_shared/services/neon.service';
import { FormService } from 'src/app/_shared/services/form.service';
import { HttpClient } from '@angular/common/http';
import { CustomField, OptionValues } from 'src/app/_shared/models/neon/custom-field.interface'
import { Sponsors } from 'src/app/_shared/models/neon/sponsors.interface'
import { Sponsor } from 'src/app/_shared/models/neon/sponsor.interface'
import { Pagination } from 'src/app/_shared/models/neon/pagination.interface'
import { Country } from 'src/app/_shared/models/neon/country.interface'
import { State } from 'src/app/_shared/models/neon/state.interface'
import { map, Observable, startWith } from 'rxjs';

@Component({
  templateUrl: './admins-member.component.html',
  styleUrls: ['./admins-member.component.scss'],
  standalone: false
})
export class AdminsMemberComponent implements OnInit {
  myForm: UntypedFormGroup;
  data: Object;
  isLoading: boolean;
  submitted: boolean;
  bReadOnly = true;
  errorMessage: string;
  successMessage: string;

  countryList: SELECTITEM[];
  languageStatuses: SELECTITEM[];
  roleStatuses: SELECTITEM[];

  firstNames: string;
  lastNames: string;
  member: Member;
  photoPathname: string;
  webPrefix: string;

  /* 
  + Carlos' code 
  */
  update_sponsor_form: FormGroup;
  account!: { companyAccount: any, individualAccount: Sponsor };
  customFields: CustomField[] = [];
  companies!: {
    accounts: Sponsors[],
    pagination: Pagination
  }
  dob!: Date;
  sponsor_id: string = "2550" // Prueba;
  individualTypes: any;
  sources: any;
  genders: any;
  countries: Country[];
  stateProvinces: State[];
  address_types: State[] = [];
  filtered_companies!: Observable<Sponsors[]>
  is_neon_sponsor: boolean = false;

  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    public urlService: UrlService,
    public memberData: MemberDataService,
    public formBuilder: UntypedFormBuilder,
    public location: Location,
    private provider: ProviderService,
    private http: HttpClient,
    private form_builder: FormBuilder,
    private form: FormService,
    private neon: NeonService,
  ) {
    console.log('hi from AdminsMember constructor');
    this.webPrefix = urlService.getClientUrl();

    this.countryList = constants.countryList;
    this.languageStatuses = constants.languageStatuses;
    this.roleStatuses = constants.memberStatuses;

    this.myForm = formBuilder.group({
      firstNames: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
      lastNames: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
      email: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      smA_Phone: [''],
      nonSMA_Phone: [''],

      mentorStatusId: [''],
      sponsorStatusId: [''],
      adminStatusId: [''],
      employeeStatusId: [''],
      donorStatusId: [''],
      volunteerStatusId: [''],
      presidentStatusId: [''],
      boardMemberStatusId: [''],

      yearJoinedJA: [''],
      monthsinSma: [''],
      nonSMA_CountryId: [''],
      bestWayToContactId: [''],
      countryOfResidenceId: [''],

      englishSkillLevelId: [''],
      spanishSkillLevelId: [''],
      preferredLanguageId: [''],

      lastLoginDateTime: [''],
      numberOfLogins: [''],

      careerBackground: [''],
      otherRelevantExperience: [''],
      comments: ['', Validators.maxLength(2000)],
      photoUrl: [{ value: '' }, Validators.maxLength(2000)],
      lastMentorMeeting: [''],

      memberId: [''],
      memberGUId: [''],
      studentRecordGUId: ['']
    });
    this.myForm.disable();

    this.member = new Member();

    this.errorMessage = '';
    this.successMessage = '';
    this.submitted = false;

    this.myForm.valueChanges.subscribe((form) => {
      if (form.lastMentorMeeting) {
        this.myForm.patchValue(
          {
            lastMentorMeeting: form.lastMentorMeeting.slice(0, 10)
          },
          {
            emitEvent: false
          }
        );
      }
    });

    /* 
    + CARLOS' CODE 
    */

    this.update_sponsor_form = form_builder.group({
      "individualAccount": form_builder.group({
        "accountId": [''], // string
        "noSolicitation": [''], // boolean
        "login": form_builder.group({
          "username": [''],
          "password": ['']
        }),
        "url": [''],
        "timestamps": form_builder.group({
          "createdBy": [''], // string
          "createdDateTime": [''], // string
          "lastModifiedBy": [''], // string
          "lastModifiedDateTime": [''] // string
        }),
        "consent": '',
        "accountCustomFields": form_builder.array([]),
        "source": [''],
        "primaryContact": form_builder.group({
          "accountId": [''],
          "contactId": [''], // string
          "firstName": [''], // string
          "middleName": [''], // string
          "lastName": [''], // string
          "prefix": [''],
          "suffix": [''],
          "salutation": [''], // string
          "preferredName": [''], // string
          "dob": form_builder.group({
            "day": [''],
            "month": [''],
            "year": ['']
          }),
          "gender": [''],
          "email1": [''], // string
          "email2": [''], // string
          "email3": [''], // string
          "deceased": [''], // boolean
          "department": [''],
          "title": [''],
          "primaryContact": '',
          "currentEmployer": '',
          "startDate": '',
          "endDate": '',
          "addresses": form_builder.array([this.address_fg()])
        }),
        "sendSystemEmail": [''], // boolean
        "email1OptOut": [''], // boolean
        "origin": {
          "originDetail": [''], // string
          "originCategory": [''] // string
        },
        "accountCurrentMembershipStatus": '',
        "generosityIndicator": {
          "indicator": [''],
          "affinity": [''],
          "recency": [''],
          "frequency": [''],
          "monetaryValue": ['']
        },
        "sendTextOptIn": [''], // boolean
        "smsNumber": [''], // string
        "restrictFromWindfallSync": [''], // boolean
        "company": [''],
        "facebookPage": '',
        "twitterPage": '',
        "individualTypes": form_builder.control([]),
        "roleVoList": ''
      }),
      "companyAccount": ''
    })


  }

  async ngOnInit() {
    console.log('admins Member ngOnInit');

    await this.fetchMemberData();
    console.log(this.myForm.value);
  }

  async fetchMemberData() {
    const guid = this.currRoute.snapshot.params['guid'];
    console.log('data service with MemberGUId: ' + guid);
    this.isLoading = true;
    await this.memberData.getMemberByGUId(guid).subscribe(
      async (data) => {
        console.log(data);

        this.member = data;
        this.photoPathname = this.webPrefix + '/assets/images/MemberPhotos';
        this.photoPathname = this.photoPathname + '/' + this.member.photoUrl;
        console.log('photoPathname is ' + this.photoPathname);
        this.is_neon_sponsor = !!data.neonID;
        await this.detail(this.member.neonID?.toString());
        this.sponsor_id = this.account.individualAccount.accountId
        await this.get_neon_properties()

      },
      async (err) => console.error('Subscribe error: ' + err),
      async () => {
        console.log('getMember is done with member values ');
        console.log(JSON.stringify(this.member));
        await this.setFormValues(this.member);
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 0);
        this.isLoading = false;
      }
    );

    await this.myForm.valueChanges.subscribe(() => {
      this.errorMessage = '';
      this.successMessage = '';
      this.submitted = false;
    });

  }

  setFormValues(member: Member) {
    console.log('setFormValues');
    this.myForm.setValue({
      memberId: member.memberId,
      firstNames: member.firstNames,
      lastNames: member.lastNames,
      email: member.email,
      smA_Phone: member.smA_Phone,
      nonSMA_Phone: member.nonSMA_Phone,
      // gender: member.gender,

      mentorStatusId: member.mentorStatusId,
      sponsorStatusId: member.sponsorStatusId,
      adminStatusId: member.adminStatusId,
      employeeStatusId: member.employeeStatusId,
      donorStatusId: member.donorStatusId,
      volunteerStatusId: member.volunteerStatusId,
      presidentStatusId: member.presidentStatusId,
      boardMemberStatusId: member.boardMemberStatusId,

      yearJoinedJA: member.yearJoinedJa,
      monthsinSma: member.monthsinSma,
      nonSMA_CountryId: member.nonSMA_CountryId,
      bestWayToContactId: member.bestWayToContactId,
      countryOfResidenceId: member.countryOfResidenceId,

      englishSkillLevelId: member.englishSkillLevelId,
      spanishSkillLevelId: member.spanishSkillLevelId,
      preferredLanguageId: member.preferredLanguageId,

      lastLoginDateTime: member.lastLoginDateTime,
      numberOfLogins: member.numberOfLogins,

      careerBackground: member.careerBackground,
      otherRelevantExperience: member.otherRelevantExperience,
      comments: member.comments,
      photoUrl: member.photoUrl,
      lastMentorMeeting: member.lastMentorMeeting,

      studentRecordGUId: member.studentRecordGUId,
      memberGUId: member.memberGUId
    });
  }

  retrieveFormValues(): void {
    console.log('retrieveFormValues ' + JSON.stringify(this.myForm.value));
    // use spread operator to merge changes:
    this.member = { ...this.member, ...this.myForm.value };
  }

  saveMyForm(): boolean {
    console.log('saving admin member ');
    console.log(JSON.stringify(this.myForm.value));
    this.isLoading = true;
    this.retrieveFormValues();
    this.memberData.updateMember(this.member).subscribe(
      () => {
        console.log('subscribe result in updateMember');
        // need timeout to avoid "Expression has changed error"
        /* 
        + CARLOS' CODE
        */
        if (this.is_neon_sponsor) {
          this.patch_account()
        }
        window.setTimeout(() => {
          this.successMessage = 'Changes were saved successfully.';
        }, 0);
        // this.successMessage = 'Changes were saved successfully.';
        this.submitted = true;
        this.isLoading = false;
        window.scrollTo(0, 0);
        window.setTimeout(() => {
          // console.log('clearing success message');
          this.successMessage = '';
        }, 10000);
      },
      (error) => {
        // need timeout to avoid "Expression has changed error"
        window.setTimeout(() => {
          this.errorMessage = error.message;
        }, 0);
        window.setTimeout(() => {
          // console.log('clearing error message');
          this.errorMessage = '';
          this.isLoading = false;
        }, 5000);
      }
    );
    // prevent default action of reload
    return false;
  }

  backToMembersList() {
    this.router.navigate(['/admins/students']);
  }

  setReadOnly() {
    console.log('toggle readOnly');
    if (this.myForm.enabled) {
      this.myForm.disable();
      this.update_sponsor_form.disable();
    } else {
      this.myForm.enable();
      this.update_sponsor_form.enable();
    }
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
  + Carlos' code 
  */
  async get_neon_properties() {
    // this.get_donations(this.sponsor_id)
    this.individualTypes = (await this.neon.get_properties('individualTypes') as any[])
    this.sources = await this.neon.get_properties('sources')
    this.genders = await this.neon.get_properties('genders')
    this.countries = <Country[]>await this.neon.get_properties('countries')
    console.log(this.countries);

    this.stateProvinces = <State[]>await this.neon.get_properties('stateProvinces')
    this.companies = <any>await this.provider.production('GET', '/neon/accounts?userType=COMPANY')
    this.customFields = <CustomField[]>await this.provider.production('GET', '/neon/customFields?category=Account')
    this.address_types = <any[]>await this.neon.get_properties('/addressTypes')
    console.log(this.customFields);

    this.filtered_companies = this.individual_account().controls['accountId'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    console.log(this.individual_account().controls['company'].value, this.companies.accounts);

  }

  async detail(id: string) {
    this.account = await this.provider.production('GET', '/neon/accounts/' + id);
    console.log(this.account);

    const dob = this.account.individualAccount?.primaryContact?.dob
    this.dob = new Date(`${dob?.month}-${dob?.day}-${dob?.year}`)

    await this.form.patch(this.account, this.update_sponsor_form)
    await this.update_sponsor_form.disable();

    console.log(this.countryList);
    console.log(this.countries);

  }

  async patch_account() {
    console.log('v1', this.update_sponsor_form.value);
    console.log(this.dob);

    this.update_sponsor_form.value.individualAccount.primaryContact.dob = {
      "day": this.dob.getDay().toString().padStart(2, '0'),
      "month": (this.dob.getMonth() + 1).toString().padStart(2, '0'),
      "year": this.dob.getFullYear().toString()
    }
    console.log(this.update_sponsor_form.value);

    let neon: Sponsor = this.update_sponsor_form.value.individualAccount;
    let privada: Member = this.myForm.value
    const countries_map = {
      "1020": {
        "id": "1",
        "name": "United States of America",
        "status": "ACTIVE"
      },
      "1021": {
        "id": "2",
        "name": "Canada",
        "status": "ACTIVE"
      },
      "1022": {
        "id": "137",
        "name": "Mexico",
        "status": "ACTIVE"
      },
      "1023": {
        "id": "83",
        "name": "United Kingdom of Great Britain and Northern Ireland",
        "status": "ACTIVE"
      }
    }
    neon!.primaryContact!.firstName! = privada.firstNames;
    neon!.primaryContact!.lastName! = privada.lastNames;
    neon!.primaryContact!.email1! = privada.email;
    neon!.primaryContact!.addresses[0]!.phone1! = privada.firstNames;
    neon!.primaryContact!.addresses[0]!.phone2! = privada.firstNames;
    neon!.primaryContact!.addresses[0]!.country! = countries_map[privada.countryOfResidenceId];
    console.log(neon);
    
    await this.provider.production('PUT', '/neon/accounts/' + this.sponsor_id, { body: this.update_sponsor_form.value });

    console.log('v2');

  }

  individual_account(): FormGroup {
    return <FormGroup>this.update_sponsor_form.controls['individualAccount']
  }

  primary_contact(): FormGroup {
    return <FormGroup>this.individual_account().controls['primaryContact']
  }

  addresses(): FormArray {
    return <FormArray>this.primary_contact().controls['addresses']
  }

  address(): FormGroup {
    return <FormGroup>this.addresses()?.at(0)!
  }

  accountCustomFields_Array(): FormArray {
    return <FormArray>this.individual_account().controls['accountCustomFields']
  }

  address_fg() {
    return this.form_builder.group({
      "addressId": [''],
      "type": {
        "id": [''],
        "name": [''],
        "status": [''],
      },
      "addressLine1": [''],
      "addressLine2": [''],
      "addressLine3": [''],
      "addressLine4": [''],
      "city": [''],
      "stateProvince": {
        "code": [''],
        "name": [''],
        "status": [''],
      },
      "country": {
        "id": [''],
        "name": [''],
        "status": [''],
      },
      "territory": [''],
      "county": [''],
      "zipCode": [''],
      "zipCodeSuffix": [''],
      "phone1": [''],
      "phone1Type": [''],
      "phone2": [''],
      "phone2Type": [''],
      "phone3": [''],
      "phone3Type": [''],
      "fax": [''],
      "faxType": [''],
      "isPrimaryAddress": [''],
      "validAddress": [''],
      "startDate": [''],
      "endDate": [''],
    })
  }

  find_accountCustonField(id: string) {
    // console.log(this.accountCustomFields_Array().value);

    if (this.accountCustomFields_Array().value) {
      const index = this.accountCustomFields_Array().value.findIndex((array: any) => array.id == id);

      if (index != -1)
        return <FormGroup>this.accountCustomFields_Array().at(index)

      // console.log(index, 'id no encontrado', id);
      return null
    }
  }

  find_optionValues(id: string): CustomField {
    return this.customFields.find((field: CustomField) => field.id == id) || <CustomField>{}
  }

  find_accountCustomFields(id: string) {
    return this.accountCustomFields_Array().value.find((field: any) => field.id == id)
  }

  includes_accountCustomFields(id: string, value: string) {
    return this.find_accountCustomFields(id)?.optionValues.map((option: any) => option.id).includes(value)
  }

  private _filter(value: string): Sponsors[] {
    const filterValue = value.toLowerCase();

    return this.companies.accounts.filter(option => option.companyName.toLowerCase().includes(filterValue));
  }

  /* 
  * COMPARE FUNCTIONS
  */

  compare_individual_types = (option: any, value: any) => {
    return option && value && option.id == value.id;
  };

  /* 
  * FUNCTIONS FOR GENERIC FIELD TEMPLATES
  */

  select_option(option: OptionValues, control: FormGroup) {
    control.controls['optionValues'].patchValue([option])
  }

  select_checkbox_options(option: OptionValues, control: FormGroup | AbstractControl) {
    const n_control: FormGroup = control as FormGroup;

    let option_values_array: OptionValues[] = n_control.controls['optionValues'].value;

    let option_in_array: OptionValues = option_values_array.find((op: OptionValues) => op.id == option.id) || <OptionValues>{}

    if (option_in_array.id) {
      option_values_array = option_values_array.filter((op: OptionValues) => op.id != option_in_array.id)
    } else {
      option_values_array.push(option)
    }

    n_control.controls['optionValues'].patchValue(option_values_array)
  }

  patch_value_input(control: AbstractControl, value: string) {
    control.patchValue(value)
  }

  disable_controls(control: FormControl | FormGroup | FormArray) {
    if (control instanceof FormControl)
      control.disable();
    else if (control instanceof FormGroup) {
      Object.keys(control.value).forEach((key: string) => {
        this.disable_controls(control.controls[key] as FormControl | FormGroup | FormArray)
      });
    }
    else if (control instanceof FormArray) {
      console.log(control);

      control.controls.forEach((element: FormControl | FormGroup | FormArray) => {
        this.disable_controls(element)
      });
    }
  }

}

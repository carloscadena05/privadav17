import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { constants } from 'src/app/_shared/constants/constants';
import { MemberDataService } from 'src/app/_shared/data/member-data.service';
import { MiscDataService } from 'src/app/_shared/data/misc-data.service';
import { SELECTITEM } from 'src/app/_shared/interfaces/SELECTITEM';
import { Member } from 'src/app/_shared/models/member';
import { UrlService } from 'src/app/_shared/services/url.service';
import { StudentState } from 'src/app/_store/student/student.state';

@Component({
    selector: 'app-admins-student-member-profile',
    templateUrl: './admins-student-member-profile.component.html',
    styleUrls: ['./admins-student-member-profile.component.css'],
    standalone: false
})
export class AdminsStudentMemberDataComponent implements OnInit {
  myForm: UntypedFormGroup;
  data: Object;
  isLoading: boolean;
  submitted: boolean;
  // bReadOnly = true;

  // studentStatuses: SELECTITEM[];
  languageStatuses: SELECTITEM[];
  schoolTypes: SELECTITEM[];
  joinedYears: SELECTITEM[];
  gradYears: SELECTITEM[];
  gradMonths: SELECTITEM[];
  credentialYears: SELECTITEM[];
  credentialMonths: SELECTITEM[];
  genders: SELECTITEM[];


  errorMessage: string;
  successMessage: string;
  firstNames: string;
  lastNames: string;
  member: Member;
  photoPathname: string;
  studentGUIdParam: string;
  sponsorGroupIdParam: number;
  emojiPathname: string;
  showEditLink = false;
  webPrefix: string;
  private subscription: Subscription;
  studentName: string;

   currentName$ = this.store.select<string>(StudentState.getSelectedStudentName);
  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    public urlService: UrlService,
    public memberData: MemberDataService,
    public miscData: MiscDataService,
    public formBuilder: UntypedFormBuilder,
    public location: Location,
    public store: Store
  ) {
    console.log('hi from AdminsStudent constructor');
    this.webPrefix = urlService.getClientUrl();

    this.languageStatuses = constants.languageStatuses;

    this.myForm = formBuilder.group({
      firstNames: ['',
        Validators.compose([Validators.required, Validators.maxLength(30)])],
      lastNames: [{ value: '' }, Validators.compose([Validators.required, Validators.maxLength(30)])],
      email: [{ value: '' }, Validators.compose([Validators.required, Validators.email, Validators.maxLength(50)])],
      cellPhone: [{ value: '' }, Validators.compose([Validators.maxLength(13)])],
      nickName: [{ value: '' }, Validators.maxLength(20)],
      photoUrl: [{ value: '' }, Validators.maxLength(255)],

      englishSkillLevelId: [{ value: '' }],
      smA_Address: [''],
      colonia: [''],
      nonSMA_Address: [''],
      nonSMA_City: [''],
      nonSMA_StateProvince: [''],
      nonSMA_PostalCode: ['']
    });
    this.myForm.disable();
    console.log(this.myForm.controls);


    this.member = new Member();

    this.errorMessage = '';
    this.successMessage = '';
    this.submitted = false;
  }

  ngOnInit() {
    console.log('admins Member ngOnInit');
    this.studentGUIdParam = this.currRoute.snapshot.params['guid'];
    console.log('student student-data with studentGUIdParam: ' + this.studentGUIdParam);
    this.fetchMemberData();
    this.subscribeForStudentNames();
  }

  subscribeForStudentNames() {
    this.subscription = this.currentName$.subscribe((message) => {
      console.log('subscribeForStudentName received with message [' + message + ']');
      this.studentName = message;
      console.log('************NGXS: student-as-member profile new StudentName received' + this.studentName);
    });
  }

  fetchMemberData() {
    console.log('studentMember with StudentGUId: ' + this.studentGUIdParam );
    this.isLoading = true;
    this.memberData.getMemberByStudentGUId(this.studentGUIdParam ).subscribe(
      (data) => {
        this.member = data;
        this.photoPathname = this.webPrefix + '/assets/images/MemberPhotos';
        this.photoPathname = this.photoPathname + '/' + this.member.photoUrl;
        console.log('photoPathname is ' + this.photoPathname);
      },
      (err) => console.error('Subscribe error: ' + err),
      () => {
        console.log('getMember is done with member values ');
        console.log(JSON.stringify(this.member));
        this.setFormValues(this.member);
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 0);
        this.isLoading = false;
      }
    );

    this.myForm.valueChanges.subscribe(() => {
      this.errorMessage = '';
      this.successMessage = '';
      this.submitted = false;
    });
  }

  setFormValues(member: Member) {
    console.log('setFormValues');
    console.log(this.myForm);
    console.log(this.myForm.controls);
    console.log('before call');
    this.myForm.setValue({
      firstNames: member.firstNames,
      lastNames: member.lastNames,
      email: member.email,
      cellPhone: member.cellPhone,
      nickName: member.nickName,
      photoUrl: '', // member.photoUrl,
      englishSkillLevelId: member.englishSkillLevelId,
      smA_Address: member.smA_Address,
      colonia: member.colonia,
      nonSMA_Address: member.nonSMA_Address,
      nonSMA_City: member.nonSMA_City,
      nonSMA_StateProvince: member.nonSMA_City,
      nonSMA_PostalCode: member.nonSMA_PostalCode
    });
  }

  retrieveFormValues(): void {
    console.log('retrieveFormValues ' + JSON.stringify(this.myForm.value));
    // use spread operator to merge changes:
    this.member = { ...this.member, ...this.myForm.value };
  }

  saveMyForm(): boolean {
    console.log('saving admin member ');
    this.isLoading = true;
    this.retrieveFormValues();
    this.memberData.updateMember(this.member).subscribe(
      () => {
        // console.log('subscribe result in updateStudent');
        // need timeout to avoid "Expression has changed error"
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

  scrollIntoView() {
    const element = document.body;
    if (element) {
      element.scrollIntoView(true);
    }
  }

  backToStudentsList() {
    this.router.navigate(['/admins/students']);
  }

  public hasChanges() {
    // if have changes then ask for confirmation
    // ask if form is dirty and has not just been submitted

    console.log('hasChanges has submitted ' + this.submitted);
    console.log('hasChanges has form dirty ' + this.myForm.dirty);
    console.log('hasChanges net is ' + this.myForm.dirty || this.submitted);
    return this.myForm.dirty && !this.submitted;
  }

  setReadOnly() {
    console.log('toggle readOnly');
    if (this.myForm.enabled) {
      this.myForm.disable();
      this.showEditLink = false;
    } else {
      this.myForm.enable();
      this.showEditLink = true;
    }

  }
  onDateSelect() {
    alert('data selected');
  }

}

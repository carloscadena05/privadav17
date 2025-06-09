import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { constants } from 'src/app/_shared/constants/constants';
import { MemberDataService } from 'src/app/_shared/data/member-data.service';
import { SELECTITEM } from 'src/app/_shared/interfaces/SELECTITEM';
import { Member } from 'src/app/_shared/models/member';
import { UrlService } from 'src/app/_shared/services/url.service';

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

  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    public urlService: UrlService,
    public memberData: MemberDataService,
    public formBuilder: UntypedFormBuilder,
    public location: Location
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
  }

  ngOnInit() {
    console.log('admins Member ngOnInit');

    this.fetchMemberData();
  }

  fetchMemberData() {
    const guid = this.currRoute.snapshot.params['guid'];
    console.log('data service with MemberGUId: ' + guid);
    this.isLoading = true;
    this.memberData.getMemberByGUId(guid).subscribe(
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
    } else {
      this.myForm.enable();
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
}

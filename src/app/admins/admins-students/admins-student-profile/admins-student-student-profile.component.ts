import { formatDate, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { BehaviorSubject, EMPTY, Observable, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { constants } from 'src/app/_shared/constants/constants';
import { MiscDataService } from 'src/app/_shared/data/misc-data.service';
import { StudentDataService } from 'src/app/_shared/data/student-data.service';
import { SELECTITEM } from 'src/app/_shared/interfaces/SELECTITEM';
import { Student } from 'src/app/_shared/models/student';
import { StudentDTO } from 'src/app/_shared/models/studentDTO';
import { TruncateDatePipe } from 'src/app/_shared/pipes/truncate-date-pipe';
import { UrlService } from 'src/app/_shared/services/url.service';
import { SetPhotoPathname, SetSelectedStudentGUId, SetSelectedStudentMentorGUId } from 'src/app/_store/student/student.action';
import { StudentState } from 'src/app/_store/student/student.state';

@Component({
    selector: 'app-admins-student-student-profile',
    templateUrl: './admins-student-student-profile.component.html',
    styleUrls: ['./admins-student-student-profile.component.scss'],
    standalone: false
})
export class AdminsStudentProfileComponent implements OnInit {
  myForm: UntypedFormGroup;
  data: Object;
  isLoading: boolean;
  submitted: boolean;
  // bReadOnly = true;

  studentStatuses: SELECTITEM[];
  languageStatuses: SELECTITEM[];
  schoolTypes: SELECTITEM[];
  joinedYears: SELECTITEM[];
  gradYears: SELECTITEM[];
  gradMonths: SELECTITEM[];
  credentialYears: SELECTITEM[];
  credentialMonths: SELECTITEM[];
  genders: SELECTITEM[];

  mentors$: Observable<SELECTITEM[]> = this.miscData.getMentors$().pipe(
    catchError((err) => {
      this.errorMessage = err;
      console.log('CAUGHT ERROR IN Component ' + err);
      return EMPTY;
    })
  );
  mentorSubject: BehaviorSubject<[SELECTITEM]>;

  // prepas: SELECTITEM[];
  prepas$: Observable<SELECTITEM[]> = this.miscData.prepas$.pipe(
    catchError((err) => {
      this.errorMessage = err;
      console.log('CAUGHT ERROR IN Component ' + err);
      return EMPTY;
    })
  );

  // universities: SELECTITEM[];
  universities$: Observable<SELECTITEM[]> = this.miscData.universities$.pipe(
    catchError((err) => {
      this.errorMessage = err;
      console.log('CAUGHT ERROR IN Component ' + err);
      return EMPTY;
    })
  );

  // universityGradeMonths: SELECTITEM[];
  universityGradeMonths$: Observable<SELECTITEM[]> = this.miscData.universityGradeMonths$.pipe(
    catchError((err) => {
      this.errorMessage = err;
      console.log('CAUGHT ERROR IN Component ' + err);
      return EMPTY;
    })
  );

  // sponsorGroups: SELECTITEM[];
  sponsorGroups$: Observable<SELECTITEM[]> = this.miscData.sponsorGroups$.pipe(
    catchError((err) => {
      this.errorMessage = err;
      console.log('CAUGHT ERROR IN Component ' + err);
      return EMPTY;
    })
  );

  errorMessage: string;
  successMessage: string;
  // firstNames: string;
  // lastNames: string;
  student: Student;
  studentDTO: StudentDTO;
  photoPathname: string;
  studentIdParam: number;
  studentGUIdParam: string;
  sponsorGroupIdParam: number;
  emojiPathname: string;
  readonly emojis: string[] = constants.emojis;
  showEditLink = false;
  webPrefix: string;
  staticUrlPrefix: string;
  private subscription: Subscription;
  studentName: string;

   currentName$ = this.store.select<string>(StudentState.getSelectedStudentName);

  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    public urlService: UrlService,
    public studentData: StudentDataService,
    public miscData: MiscDataService,
    public formBuilder: UntypedFormBuilder,
    public location: Location,
    public store: Store
  ) {
    console.log('hi from AdminsStudent constructor');
    this.webPrefix = urlService.getClientUrl();
    this.staticUrlPrefix = urlService.getStaticFilePrefix();

    this.languageStatuses = constants.languageStatuses;
    this.studentStatuses = constants.studentStatuses;
    this.schoolTypes = constants.schoolTypes;
    this.joinedYears = constants.joinedYears;
    this.gradYears = constants.gradYears;
    this.gradMonths = constants.months;
    this.credentialYears = constants.gradYears;
    this.credentialMonths = constants.months;
    this.genders = constants.genders;

    this.myForm = formBuilder.group({
      studentId: [{ value: '' }],
      // firstNames: ['',
      //   Validators.compose([Validators.required, Validators.maxLength(30)])],
      // lastNames: [{ value: '' },
      // Validators.compose([Validators.required, Validators.email, Validators.maxLength(30)])],
      // email: [{ value: '' },
      // Validators.compose([Validators.required, Validators.maxLength(50)])],
      // cellPhone: [{ value: '' }, Validators.compose([Validators.minLength(7), Validators.maxLength(13)])],
      // homePhone: [{ value: '' }, Validators.compose([Validators.minLength(7), Validators.maxLength(13)])],
      // nickName: [{ value: '' }, Validators.maxLength(20)],
      photoUrl: [{ value: '' }, Validators.maxLength(255)],
      gender: ['', Validators.compose([Validators.required, Validators.maxLength(1)])],
      educationalLevelId: [{ value: '' }],
      emergencyContactPhone: [{ value: '' }, Validators.compose([Validators.minLength(7), Validators.maxLength(13)])],
      emergencyContactName: [{ value: '' }],
      major: [{ value: '' }],
      tituloIssuedDate: [{ value: '' }],
      tituloUploadedDate: [{ value: '' }],

      cedula: [{ value: '' }],
      mastersUniversityId: [{ value: '' }],
      mastersUniversityGradeMonthId: [{ value: '' }],
      mastersFieldOfStudy: [{ value: '' }],
      mastersGradYear: [{ value: '' }],
      mastersGradMonthNum: [{ value: '' }],
      mastersStartYear: [{ value: '' }],
      mastersStartMonthNum: [{ value: '' }],
      undergradStartYear: [{ value: '' }],
      undergradStartMonthNum: [{ value: '' }],

      // englishSkillLevelId: [{ value: '' }],
      statusId: [{ value: '' }],
      yearJoinedJa: [{ value: '' }],
      joinedFromId: [{ value: '' }],
      prepaId: [{ value: '' }],
      universityId: [{ value: '' }],
      universityGradeMonthId: [{ value: '' }],
      gradYear: [{ value: '' }],
      gradMonthNum: [{ value: '' }],
      credentialYear: [{ value: '' }],
      credentialMonthNum: [{ value: '' }],
      probationStartDate: [
        { value: '' },
        Validators.compose([Validators.pattern(/^\d{4}\-\d{1,2}\-\d{1,2}$/), Validators.maxLength(10)])
      ],
      probationEndDate: [
        { value: '' },
        Validators.compose([Validators.pattern(/^\d{4}\-\d{1,2}\-\d{1,2}$/), Validators.maxLength(10)])
      ],

      mentorAssignedDate: [
        { value: '' },
        Validators.compose([Validators.pattern(/^\d{4}\-\d{1,2}\-\d{1,2}$/), Validators.maxLength(10)])
      ],
      mentoringEndDate: [
        { value: '' },
        Validators.compose([Validators.pattern(/^\d{4}\-\d{1,2}\-\d{1,2}$/), Validators.maxLength(10)])
      ],
      mentoringComment: [
        { value: '' },
        Validators.maxLength(50)
      ],
      curp: [{ value: '' }],
      rfc: [{ value: '' }],
      pcsId: [{ value: '' }],
      bankAccount: [{ value: '' }],
      sponsorGroupId: [{ value: '' }],
      mentorGUId: [{ value: '' }],
      studentGUId: [{ value: '' }]
    });
    this.myForm.disable();
    console.log(this.myForm.controls);

    this.student = new Student();

    this.errorMessage = '';
    this.successMessage = '';
    this.submitted = false;
  }

  ngOnInit() {
    console.log('%admins Student ngOnInit');
    this.studentGUIdParam = this.currRoute.snapshot.params['guid'];
    console.log('student student-profile with studentGUIdParam: ' + this.studentGUIdParam);
    this.fetchStudentDTOData();
    this.subscribeForStudentNames();
  }

  subscribeForStudentNames() {
    this.subscription = this.currentName$.subscribe((message) => {
      console.log('subscribeForStudentName received with message [' + message + ']');
      this.studentName = message;
      console.log('************NGXS: student profile new StudentName received ' + this.studentName);
    });
  }

  // need to get data from associated member record first
  fetchStudentDTOData() {
    this.isLoading = true;
    this.studentData.getStudentDTOViaGUID(this.studentGUIdParam).subscribe(
      (data) => {
        this.studentDTO = data;
        console.log('studentDTO: MemberRecordGUId ' + this.studentDTO.memberRecordGUId);
        console.log('studentDTO: mentorGUId ' + this.studentDTO.mentorGUId);
        console.log('studentDTO: studentName ' + this.studentDTO.studentName);
        this.studentDTO = this.getNumericStatus(this.studentDTO);
      },
      (err) => {
        this.errorMessage = err;
      },
      () => {
        console.log('studentDTO data loaded');
        console.log(JSON.stringify(this.studentDTO));
        // need to load additional fields that are not in DTO
        this.fetchStudentData();
        this.isLoading = false;
      }
    );
  }

  // called after fetchStudentDTOData  (contains additional fields needed)
  fetchStudentData() {
    this.isLoading = true;
    this.studentData.getStudentViaGUID(this.studentGUIdParam).subscribe(
      (data) => {
        this.student = data;
        this.photoPathname = this.webPrefix + '/assets/images/StudentPhotos/' + this.student.yearJoinedJa;
        this.photoPathname = this.photoPathname + '/' + this.student.photoUrl;
        console.log('photoPathname is ' + this.photoPathname);
        console.log('after fetch');
        console.log(this.student);
        this.emojiPathname = this.emojis[this.studentDTO.studentSnapshotStatus + 1];
        console.log('emoji is ' + this.emojiPathname);
      },
      (err) => console.error('Subscribe error: ' + err),
      () => {

        console.log('student data loaded');
        console.log(JSON.stringify(this.student));

        console.log('getStudent is done now set timeout for scroll');
        this.setFormValues(this.student);
        console.log('student: dispatching mentorGUId ' + this.student.mentorGUId);
        this.store.dispatch(new SetPhotoPathname(this.student.photoUrl));
        this.store.dispatch(new SetSelectedStudentGUId(this.student.studentGUId));
        // this.store.dispatch(new SetSelectedStudentName(this.student.studentName));
        this.store.dispatch(new SetSelectedStudentMentorGUId(this.student.mentorGUId));

        setTimeout(() => {
          this.scrollIntoView();
        }, 0);
        this.isLoading = false;
      }
    );

    this.myForm.valueChanges.subscribe(() => {
      this.errorMessage = '';
      this.successMessage = '';
      this.submitted = false;
    });

    this.myForm.controls.sponsorGroupId.valueChanges.subscribe((newId) => {
      console.log('have new sponsorGroupId: ' + newId);
      this.sponsorGroupIdParam = newId;
    });
  }

  setFormValues(student: Student) {
    console.log('setFormValues');
    console.log('>>>>>>>>>>>mentorGUId: ' + student.mentorGUId);
    console.log('>>>>>>>>>>>tituloUploadedDate: ' + student.tituloUploadedDate);
    console.log('>>>>>>>>>>>mastersUnivesityId ' + student.mastersUniversityId);
    this.myForm.setValue({
      studentId: student.studentId,
      gender: student.gender,
      photoUrl: student.photoUrl,
      educationalLevelId: student.educationalLevelId,
      emergencyContactPhone: student.emergencyContactPhone,
      emergencyContactName: student.emergencyContactName,
      major: student.major,
      tituloIssuedDate:  new TruncateDatePipe().transform('' + student.tituloIssuedDate),
      tituloUploadedDate:  new TruncateDatePipe().transform('' + student.tituloUploadedDate),

      cedula: student.cedula,
      mastersUniversityId: student.mastersUniversityId,
      mastersUniversityGradeMonthId: student.mastersUniversityId,
      mastersFieldOfStudy: student.mastersFieldOfStudy,
      mastersGradYear: student.mastersGradYear,
      mastersGradMonthNum: student.mastersGradMonthNum,

      mastersStartYear: student.mastersStartYear,
      mastersStartMonthNum: student.mastersStartMonthNum,

      undergradStartYear: student.undergradStartYear,
      undergradStartMonthNum: student.undergradStartMonthNum,

      // englishSkillLevelId: student.englishSkillLevelId,
      statusId: student.statusId,
      yearJoinedJa: student.yearJoinedJa,
      joinedFromId: student.joinedFromId,
      prepaId: student.prepaId,
      universityId: student.universityId,
      universityGradeMonthId: student.universityId,
      gradYear: student.gradYear,
      gradMonthNum: student.gradMonthNum,
      credentialYear: student.credentialYear,
      credentialMonthNum: student.credentialMonthNum,
      probationStartDate: new TruncateDatePipe().transform('' + student.probationStartDate),
      probationEndDate: new TruncateDatePipe().transform('' + student.probationEndDate),
      mentorAssignedDate: new TruncateDatePipe().transform('' + student.mentorAssignedDate),
      mentoringEndDate: new TruncateDatePipe().transform('' + student.mentoringEndDate),
      mentoringComment: student.mentoringComment,
      curp: student.curp,
      rfc: student.rfc,
      pcsId: student.pcsId,
      bankAccount: student.bankAccount,
      sponsorGroupId: student.sponsorGroupId,
      // mentorGUId: '46D33F1B-BA9E-4C47-800E-16E2AB0E095C', //
      mentorGUId: student.mentorGUId.toUpperCase(),
      // mentorGUId: mentorId, // student.mentorId,
      studentGUId: student.studentGUId
    });

    console.log('++++++++++++++++universityGradeMonthId = ' + this.myForm.controls.universityGradeMonthId.value);

    console.log('++++++++++++++++mastersUniversityGradeMonthId = ' + this.myForm.controls.mastersUniversityGradeMonthId.value);
  }

  retrieveFormValues(): void {
    console.log('retrieveFormValues on enter has form values:');
    console.log( JSON.stringify(this.myForm.value));
    // use spread operator to merge changes:

    console.log('student before retrieve FormValues merge');
    console.log(this.student);

    this.setEmptyDatesToNull (this.myForm.controls.mentorAssignedDate);
    this.setEmptyDatesToNull (this.myForm.controls.mentoringEndDate);
    this.setEmptyDatesToNull (this.myForm.controls.probationStartDate);
    this.setEmptyDatesToNull (this.myForm.controls.probationEndDate);

    this.setEmptyDatesToNull (this.myForm.controls.tituloIssuedDate);
    this.setEmptyDatesToNull (this.myForm.controls.tituloUploadedDate);

    this.student = { ...this.student, ...this.myForm.value };
    console.log('student after retrieve FormValues merge');
    console.log(this.student);
  }

  setEmptyDatesToNull(control: AbstractControl): void {

    // console.log('setEmptyDatesToNull has ' + control.value as string)
    if ((control.value as string)?.trim() === '') {
      control.setValue(null);
    }
  }

  saveMyForm(): boolean {
    console.log('saving admin student ');
    this.isLoading = true;
    this.retrieveFormValues();
    console.log('save');
    // console.log(this.student);
    // console.log('====before Update=====');
    this.studentData.updateStudent(this.student).subscribe(
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
  setMentorStartDate(){
    const formattedDt = formatDate(new Date(), 'yyyy-MM-dd', 'en_US');
    this.myForm.controls.mentorAssignedDate.setValue(formattedDt);
  }

  mentorReportsReview() {
    // const guid = this.currRoute.snapshot.params['guid'];
    this.router.navigate([
      '/admins/students/student/mentorReports/',
      {
        // mentorId: this.studentDTO.mentorId,
        mentorGUId: this.studentDTO.mentorGUId,
        studentGUId: this.studentDTO.studentGUId,
        studentName: this.studentDTO.studentName
      }
    ]);
  }

  public hasChanges() {
    // if have changes then ask for confirmation
    // ask if form is dirty and has not just been submitted

    console.log('hasChanges has submitted ' + this.submitted);
    console.log('hasChanges has form dirty ' + this.myForm.dirty);
    console.log('hasChanges net is ' + this.myForm.dirty || this.submitted);
    return this.myForm.dirty && !this.submitted;
  }

  gotoMemberRecord() {
    const link = ['admins/members/member', { guid: this.studentDTO.memberRecordGUId }];
    console.log('navigating to ' + link);
    this.router.navigate(link);
  }

  viewTitulo( studentGuid: string, gradYear: number ) {


    const url = this.staticUrlPrefix + 'Certifications/Titulos/' + gradYear + '/' + studentGuid.toUpperCase() + '.jpg';
    document.location.href = url;

  }

  uploadTitulo(studentGUId: string, gradYear: number) {
    console.log('submitImage');
    // this.store.dispatch(new SetSelectedStudentGUId({ studentGUId }));

    const link = ['titulos/titulos-entry',
      {
        studentGUId: studentGUId,
        gradYear: gradYear
      }
    ];
    console.log('navigating to ' + JSON.stringify(link));
    this.router.navigate(link);
  }

  gotoGradeHistory() {
    const id = this.currRoute.snapshot.params['id'];
    const link = ['/admins/students/grade-history/' + id + '/'];
    this.router.navigate(link);
  }

  gotoMentor(guid: string) {
    const link = ['admins/members/member', { guid: guid }];

    console.log('navigating to ' + link);
    this.router.navigate(link);
  }

  refreshMentors() {
    this.mentors$ = this.miscData.getMentors$().pipe(
      catchError((err) => {
        this.errorMessage = err;
        console.log('CAUGHT ERROR IN Component ' + err);
        return EMPTY;
      })
    );
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
    // needs to always be read only
    this.myForm.controls.universityGradeMonthId.disable();
    this.myForm.controls.mastersUniversityGradeMonthId.disable();
    this.myForm.controls.tituloUploadedDate.disable();
    this.myForm.controls.yearJoinedJa.disable();
  }
  onDateSelect() {
    alert('data selected');
  }

  getNumericStatus(studentDTO: StudentDTO): StudentDTO {
    // studentDTO.numericTimelyMentorMeetingStatus = 0;
    // if (studentDTO.timelyMentorMeetingStatus === 'red') {
    //   studentDTO.numericTimelyMentorMeetingStatus = 1;
    // } else if (studentDTO.timelyMentorMeetingStatus === 'yellow') {
    //   studentDTO.numericTimelyMentorMeetingStatus = 2;
    // } else if (studentDTO.timelyMentorMeetingStatus === 'green') {
    //   studentDTO.numericTimelyMentorMeetingStatus = 3;
    // }

    // studentDTO.numericTimelyMentorReportStatus = 0;
    // if (studentDTO.timelyMentorReportStatus === 'red') {
    //   studentDTO.numericTimelyMentorReportStatus = 1;
    // } else if (studentDTO.timelyMentorReportStatus === 'yellow') {
    //   studentDTO.numericTimelyMentorReportStatus = 2;
    // } else if (studentDTO.timelyMentorReportStatus === 'green') {
    //   studentDTO.numericTimelyMentorReportStatus = 3;
    // }

    // studentDTO.numericGradeRptStatus = 0;
    // if (studentDTO.gradeRptStatus === 'red') {
    //   studentDTO.numericGradeRptStatus = 1;
    // } else if (studentDTO.gradeRptStatus === 'yellow') {
    //   studentDTO.numericGradeRptStatus = 2;
    // } else if (studentDTO.gradeRptStatus === 'green') {
    //   studentDTO.numericGradeRptStatus = 3;
    // }

    // studentDTO.numericGPAStatus = 0;
    // if (studentDTO.gpaStatus === 'red') {
    //   studentDTO.numericGPAStatus = 1;
    // } else if (studentDTO.gpaStatus === 'yellow') {
    //   studentDTO.numericGPAStatus = 2;
    // } else if (studentDTO.gpaStatus === 'green') {
    //   studentDTO.numericGPAStatus = 3;
    // }

    studentDTO.joinedFrom = 'N/A';
    if (studentDTO.joinedFromId === 2056) {
      studentDTO.joinedFrom = 'Prepa';
    } else if (studentDTO.joinedFromId === 2057) {
      studentDTO.joinedFrom = 'Univ';
    }

    return studentDTO;
  }
}

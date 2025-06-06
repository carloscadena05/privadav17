import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/app/_shared/services/session.service';
import { constants } from '../../_shared/constants/constants';
import { MemberDataService } from '../../_shared/data/member-data.service';
import { SELECTITEM } from '../../_shared/interfaces/SELECTITEM';
import { Member } from '../../_shared/models/member';

@Component({
    templateUrl: './students-profile.component.html',
    styleUrls: ['./students-profile.component.css', '../students.component.css'],
    standalone: false
})
export class StudentProfileComponent implements OnInit {
  myForm: UntypedFormGroup;
  data: Object;
  isLoading: boolean;
  submitted: boolean;

  languageStatuses: SELECTITEM[];
  errorMessage: string;
  successMessage: string;
  firstNames: string;
  lastNames: string;
  email: string;
  student: Member;
  errorAlert: boolean = false;
  successAlert: boolean = false;

  constructor(
    public currRoute: ActivatedRoute,
    private session: SessionService,
    public memberData: MemberDataService,
    public formBuilder: UntypedFormBuilder
  ) {
    console.log('hi from profile.component constructor');
    this.languageStatuses = constants.languageStatuses;

    this.myForm = formBuilder.group({
      firstNames: ['', Validators.required],
      lastNames: ['', Validators.required],
      email: ['', Validators.required],
      cellPhone: ['', Validators.required],
      smA_Address: ['', Validators.required],
      colonia: ['', Validators.required],
      // smA_postalCode: ['', Validators.required],
      nonSMA_Address: ['', Validators.required],
      nonSMA_City: ['', Validators.required],
      nonSMA_StateProvince: ['', Validators.required],
      nonSMA_PostalCode: ['', Validators.required]
      // englishSkillLevelId: ['', Validators.required]
    });

    this.student = new Member();

    this.errorMessage = '';
    this.successMessage = '';
    this.submitted = false;
  }

  ngOnInit() {
    console.log('ngOnInit');
    this.fetchData();
    this.myForm.valueChanges.subscribe(() => {
      // this.errorMessage = '';
      // this.successMessage = '';
      this.submitted = false;
    });
    this.myForm.disable();
  }

  fetchData() {
    // const id = this.currRoute.snapshot.params['id'];
    const guid = this.session.getUserGUId();
    console.log('calling data service with studentGUId: ' + guid);
    this.isLoading = true;
    this.memberData.getMemberByGUId(guid).subscribe(
      (data) => {
        console.log(JSON.stringify(data));
        this.student = data;
      },
      (err) => console.error('Subscribe error: ' + err),
      () => {
        console.log('done loading');
        this.setFormValues(this.student);
        this.isLoading = false;
      }
    );
  }

  setFormValues(student_member: Member) {
    this.myForm.setValue({
      firstNames: student_member.firstNames,
      lastNames: student_member.lastNames,
      email: student_member.email,
      cellPhone: student_member.cellPhone,
      smA_Address: student_member.smA_Address,
      colonia: student_member.colonia,
      // smA_postalCode: student_member.smA_postalCode,
      nonSMA_Address: student_member.nonSMA_Address,
      nonSMA_City: student_member.nonSMA_City,
      nonSMA_StateProvince: student_member.nonSMA_City,
      nonSMA_PostalCode: student_member.nonSMA_PostalCode
      // englishSkillLevelId: student.englishSkillLevelId
    });
  }

  retrieveFormValues(): void {
    console.log('retrieveFormValues ' + JSON.stringify(this.myForm.value));
    // use spread operator to merge changes:
    this.student = { ...this.student, ...this.myForm.value };
  }
  editForm(element: HTMLInputElement) {
    /* enables all form inputs */
    if (this.myForm.disabled) {
      element.textContent = 'Cancelar';
      this.myForm.enable();
    } else {
      element.textContent = 'Editar';
      this.myForm.disable();
    }
  }

  saveMyForm(): boolean {
    console.log('saving ');
    this.myForm.disable();
    this.isLoading = true;
    this.retrieveFormValues();
    this.memberData.updateMember(this.student).subscribe(
      () => {
        
        this.successMessage = 'Changes were saved successfully.';
        /* triggers alert */
        this.successAlert = true;
        this.submitted = true;
        this.isLoading = false;

        window.scrollTo(0, 0);
        window.setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      (error) => {
        this.errorMessage = error;
        this.errorAlert = true;
        console.log('error ' + error);
        this.isLoading = false;
      }
    );
    // prevent default action of reload
    return false;
  }

  public hasChanges() {
    // if have changes then ask for confirmation
    // ask if form is dirty and has not just been submitted
    console.log('hasChanges has submitted ' + this.submitted);
    console.log('hasChanges has form dirty ' + this.myForm.dirty);
    console.log('hasChanges net is ' + this.myForm.dirty || this.submitted);
    return this.myForm.dirty && !this.submitted;
  }

  closeAlert(value: boolean){
    this.errorAlert = value;
    this.successAlert = value;
  }
}

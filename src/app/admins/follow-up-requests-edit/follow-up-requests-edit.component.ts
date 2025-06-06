import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FollowUpDataService } from 'src/app/_shared/data/follow-up-data.service';
import { MiscDataService } from 'src/app/_shared/data/misc-data.service';
import { constants } from '../../_shared/constants/constants';
import { SELECTITEM } from '../../_shared/interfaces/SELECTITEM';
import { FollowUpRequest } from '../../_shared/models/follow-up-request';
import { SessionService } from '../../_shared/services/session.service';
import { TranslationService } from '../../_shared/services/translation.service';

@Component({
    selector: 'app-follow-up-requests-edit',
    templateUrl: './follow-up-requests-edit.component.html',
    standalone: false
})
export class FollowUpRequestsEditComponent implements OnInit {
  myForm: UntypedFormGroup;
  followUpRequest: FollowUpRequest;
  isLoading: boolean;
  submitted: boolean;

  errorMessage: string;
  successMessage: string;
  requestStatuses: SELECTITEM[];
  saveStudentGUId: string;
  saveRequesterId: number;
  selectedRequestStatusId

  admins$: Observable<SELECTITEM[]> = this.miscData.getAdmins$().pipe(
      catchError((err) => {
      this.errorMessage = err;
      console.log('CAUGHT ERROR IN Component ' + err);
      return EMPTY;
    })
  );
  adminsubject: BehaviorSubject<[SELECTITEM]>;


  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    public followUpData: FollowUpDataService,
    public miscData: MiscDataService,
    private _fb: UntypedFormBuilder,
    private session: SessionService,
    private xlator: TranslationService
  ) {
    console.log('followUpRequestsEditComponent constructor');
    this.requestStatuses = constants.followUpStatuses;
    console.log(this.requestStatuses);

    this.myForm = _fb.group({
      requestSubStatusId: [''],
      assignedToId: [''],
      subject_English: [''],
      subject_Spanish: [''],
      updateHistory_English: [''],
      updateHistory_Spanish: ['']
    });

    //                      [(ngModel)]="followUpRequest.description_English"
//


    this.followUpRequest = new FollowUpRequest();

    // SQL Server will adjust the time to UTC by adding TimezoneOffset
    // we want to store local time so we adjust for that.
    const now = new Date();
    this.followUpRequest.createDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    console.log('reportDateTime = ' + this.followUpRequest.createDateTime);

    this.errorMessage = '';
    this.successMessage = '';
    this.submitted = false;
  }

  ngOnInit() {
      const followUpRequestId = this.currRoute.snapshot.params['requestId'];

      this.selectedRequestStatusId = this.currRoute.snapshot.params['reviewedStatusId'];
      if (this.selectedRequestStatusId === undefined) {
        this.selectedRequestStatusId = 0;
      }

      this.isLoading = true;
      console.log('fetching data with requestId ' + followUpRequestId);
      console.log('and requestStatusId ' + this.selectedRequestStatusId);
      this.followUpData.getFollowUpRequestByRequest(followUpRequestId).subscribe(
        (data) => {
          this.followUpRequest = data;
        },
        (err) => console.error('FollowUpReqs: data error: ' + err),
      () => {
        console.log('done with data followUpRequest, have data: ');
        console.log(this.followUpRequest);
        // this.currFollowUpRequestId = this.followUpRequest.followUpRequestId;  // won't change, just for completenes
        // this.currRequesterId = this.followUpRequest.followUpRequestId; // won't change, just for completeness
        this.myForm.controls.assignedToId.setValue(this.followUpRequest.assignedToId);
        this.myForm.controls.requestSubStatusId.setValue(this.followUpRequest.requestSubStatusId);
        this.myForm.controls.subject_English.setValue(this.followUpRequest.subject_English);
        this.myForm.controls.subject_Spanish.setValue(this.followUpRequest.subject_Spanish);
        this.myForm.controls.updateHistory_English.setValue(this.followUpRequest.updateHistory_English);
        this.myForm.controls.updateHistory_Spanish.setValue(this.followUpRequest.updateHistory_Spanish);

        this.saveRequesterId = this.followUpRequest.requesterId;
        this.saveStudentGUId = this.followUpRequest.studentGUId; // won't change, just for completeness

        this.isLoading = false;
      }
    );

    this.myForm.valueChanges.subscribe(() => {
      this.errorMessage = '';
      this.successMessage = '';
      this.submitted = false;
      // console.log('form change event');
    });
  }

  retrieveFormValues(): void {
    console.log('retrieveFormValues ' + JSON.stringify(this.myForm.value));
    // use spread operator to merge changes:
    // this.followUpRequest = { ...this.followUpRequest, ...this.myForm.value };

    // this.followUpRequest.followUpRequestId = // does not change

    this.followUpRequest.assignedToId = this.myForm.controls.assignedToId.value;
    this.followUpRequest.requestSubStatusId = this.myForm.controls.requestSubStatusId.value;
    this.followUpRequest.latestUpdaterId = this.session.getUserId();
    this.followUpRequest.subject_English = this.myForm.controls.subject_English.value;
    this.followUpRequest.subject_Spanish = this.myForm.controls.subject_Spanish.value;
    this.followUpRequest.updateHistory_English = this.myForm.controls.updateHistory_English.value;
    this.followUpRequest.updateHistory_Spanish = this.myForm.controls.updateHistory_Spanish.value;

    // this.followUpRequest.createDateTime = new Date();  // does not change
    this.followUpRequest.lastUpdateDateTime = new Date();
    this.followUpRequest.studentGUId =  this.saveStudentGUId; // does not change
  }

  onSubmit() {
    console.log('Hi from FollowUpRequests Submit');

    if (this.myForm.invalid) {
      this.errorMessage = '';
      window.scrollTo(0, 0);
      // return false;
    }
    this.retrieveFormValues();
    this.followUpData.updateFollowUpRequest(this.followUpRequest).subscribe(
      (response) => {
        console.log('followUp Edit Request completed');
        console.log(response.followUpRequest);
      },
      (error) => {
        this.errorMessage = error;
        this.isLoading = false;
      },
      () => {
        this.navigateBackInContext();
      }
    );
    return false;
  }

  onCancel() {
    this.navigateBackInContext();
  }

  navigateBackInContext() {
    const target = '/admins/follow-up/requests';
    console.log('after Submit or Cancel navigating to ' + target);

    const navigationExtras: NavigationExtras = {
      queryParams: { requestStatusId: this.selectedRequestStatusId
      }
    };
    this.router.navigate([target], navigationExtras);
  }

  public hasChanges() {
    // if have changes then ask for confirmation
    // ask if form is dirty and has not just been submitted
    console.log('hasChanges has submitted ' + this.submitted);
    console.log('hasChanges has form dirty ' + this.myForm.dirty);
    console.log('hasChanges net is ' + this.myForm.dirty || this.submitted);
    return this.myForm.dirty && !this.submitted;
  }

  public onSelectedAssignedToId(memberId: number) {
    this.followUpRequest.assignedToId = memberId;
    console.log('AssignedTo MemberId set to ' + memberId);
    this.followUpRequest.requestStatusId = 2092;  // Open
    this.followUpRequest.requestSubStatusId = 2171; // Requested
    alert('Please update the Comments section with details.')
  }
  public onSelectedRequestSubStatus(subStatusId: number) {
    this.followUpRequest.requestSubStatusId = subStatusId;
    console.log('requestSubStatus set to  ' + subStatusId);
    if (subStatusId == 2174 || subStatusId == 2175) {
      this.followUpRequest.requestStatusId = 2104; // Closed
      alert('Please update the Comments section with details.')
    } else { // if (subStatusId == 2171 || subStatusId === 2172 || subStatusId === 2173) {
      this.followUpRequest.requestStatusId = 2092; // Open
    }


  }

  public translateFromSpanish(spanishText: string) {
    this.xlator.translateFromSpanish(spanishText);
  }
}

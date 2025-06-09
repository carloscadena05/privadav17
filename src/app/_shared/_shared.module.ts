import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
/* import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
 */import { HighchartsChartModule } from 'highcharts-angular';
import { NgxFileDropModule } from 'ngx-file-drop';
import { CallbackComponent } from './components/callback.component';
import { DisplayErrorsComponent } from './components/display-errors.component';
import { GradesUploaderComponent } from './components/grades-uploader/grades-uploader.component';
import { InscriptionUploaderComponent } from './components/inscription-uploader/inscription-uploader.component';
import { TituloUploaderComponent } from './components/titulo-uploader/titulo-uploader.component';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ThreeWayCheckboxComponent } from '../_shared/components/three-way-checkbox/three-way-checkbox.component';
import { AlertComponent } from './components/alert/alert.component';
import { FollowUpRequestsListComponent } from './components/follow-up-requests-list/follow-up-requests-list.component';
import { LoadingContainerComponent } from './components/loading-container.component';
import { MemberHeaderDetailsComponent } from './components/member-header-details/member-header-details.component';
import { MemberHeaderComponent } from './components/member-header/member-header.component';
import { MemberLookupComponent } from './components/member-lookup/member-lookup';
import { MemberPhotoComponent } from './components/member-photo/member-photo.component';
import { MemberSelectorComponent } from './components/member-selector/member-selector.component';
import { MentorReports2ListComponent } from './components/mentor-reports2-list/mentor-reports2-list.component';
import { MentorSelectorComponent } from './components/mentor-selector/mentor-selector.component';
import { MentorsForStudentListComponent } from './components/mentors-for-student-list/mentors-for-student-list.component';
/* import { NgbdModalContentComponent } from './components/modal-content/modal-content';
 */import { QrStatusSelectorComponent } from './components/qr-status-selector/qr-status-selector.component';
import { SortableColumnComponent } from './components/sortable-column.component';
import { SponsorGroupMemberEditComponent } from './components/sponsor-group-member-edit/sponsor-group-member-edit.component';
import { SponsorGroupMembersComponent } from './components/sponsors-for-sponsor-group/sponsor-group-members.component';
import { SponsorsForStudentGridComponent } from './components/sponsors-for-student-grid/sponsors-for-student-grid.component';
import { StudentGradesStatusComponent } from './components/student-grades-status.component';
import { StudentHeaderDetailsComponent } from './components/student-header-details/student-header-details.component';
import { StudentHeaderComponent } from './components/student-header/student-header.component';
import { StudentHeader2Component } from './components/student-header2/student-header2.component';
import { StudentHistoryComponent } from './components/student-history/student-history.component';
import { StudentLookupComponent } from './components/student-lookup/student-lookup';
import { StudentMRStatusComponent } from './components/student-mr-status.component';
import { StudentPhotoComponent } from './components/student-photo/student-photo.component';
import { StudentSelectorComponent } from './components/student-selector/student-selector.component';
import { StudentSSRStatusComponent } from './components/student-ssr-status.component';
import { StudentsForMentorGridComponent } from './components/students-for-mentor-grid/students-for-mentor-grid.component';
import { StudentsForMentorListComponent } from './components/students-for-mentor-list/students-for-mentor-list.component';
import { StudentsForSponsorGridComponent } from './components/students-for-sponsor-grid/students-for-sponsor-grid.component';
import { StudentsForSponsorComponent } from './components/students-for-sponsor-list/students-for-sponsor-list';
import { UniversityGradeMonthsComponent } from './components/university-grade-months/university-grade-months.component';
import { SortableTableDirective } from './directives/sortable-table.directive';
import { AlphaLanguagePipe } from './pipes/alpha-language-pipe';
import { AlphaMonthPipe } from './pipes/alpha-month-pipe';
import { EmptyStatusPipe } from './pipes/empty-status-pipe';
import { MarkedPipe } from './pipes/marked-pipe';
import { TrimGuidPipe } from './pipes/trim-guid-pipe';
import { TruncateDatePipe } from './pipes/truncate-date-pipe';
import { UnsafeHtmlPipe } from './pipes/unsafe-html-pipe';
/**
 * Do not specify provider's for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [
    CommonModule, RouterModule, ReactiveFormsModule, FormsModule,
    /* NgbModule, */ NgxFileDropModule, SweetAlert2Module
  ],
  declarations: [
    DisplayErrorsComponent,
    LoadingContainerComponent,
    SponsorGroupMemberEditComponent,
    StudentsForMentorGridComponent,
    StudentsForMentorListComponent,
    StudentsForSponsorGridComponent,
    StudentsForSponsorComponent,
    StudentSelectorComponent,
    FollowUpRequestsListComponent,
    MemberSelectorComponent,
    MentorSelectorComponent,
    MentorReports2ListComponent,
    SortableColumnComponent,
    SortableTableDirective,
    SponsorsForStudentGridComponent,
    SponsorGroupMembersComponent,
    MentorsForStudentListComponent,
    MentorsForStudentListComponent,
    StudentGradesStatusComponent,
    StudentMRStatusComponent,
    StudentSSRStatusComponent,
    UniversityGradeMonthsComponent,
    CallbackComponent,
    AlphaMonthPipe,
    AlphaLanguagePipe,
    TruncateDatePipe,
    TrimGuidPipe,
    UnsafeHtmlPipe,
    MarkedPipe,
    StudentLookupComponent,
    StudentHeaderDetailsComponent,
    MemberPhotoComponent,
    QrStatusSelectorComponent,
    MemberLookupComponent,
    MemberHeaderComponent,
    MemberHeaderDetailsComponent,
/*     NgbdModalContentComponent,
 */    StudentHeaderComponent,
    StudentHeader2Component,
    StudentHistoryComponent,
    StudentPhotoComponent,
    EmptyStatusPipe,
    GradesUploaderComponent,
    InscriptionUploaderComponent,
    TituloUploaderComponent,
    StudentHeader2Component,
    AlertComponent,
    ThreeWayCheckboxComponent,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DisplayErrorsComponent,
    LoadingContainerComponent,
    MemberSelectorComponent,
    MentorSelectorComponent,
    SponsorGroupMemberEditComponent,
    SponsorsForStudentGridComponent,
    SponsorGroupMembersComponent,
    MentorsForStudentListComponent,
    StudentsForMentorGridComponent,
    StudentsForMentorListComponent,
    StudentsForSponsorComponent,
    StudentsForSponsorGridComponent,
    StudentSelectorComponent,
    MentorReports2ListComponent,
    FollowUpRequestsListComponent,
    SortableColumnComponent,
    SortableTableDirective,
    UniversityGradeMonthsComponent,
    StudentGradesStatusComponent,
    StudentMRStatusComponent,
    StudentSSRStatusComponent,
    CallbackComponent,
    AlphaMonthPipe,
    AlphaLanguagePipe,
    TruncateDatePipe,
    TrimGuidPipe,
    UnsafeHtmlPipe,
    MarkedPipe,
    StudentLookupComponent,
    StudentHeaderDetailsComponent,
    StudentHeaderComponent,
    StudentHistoryComponent,
    StudentHeader2Component,
    QrStatusSelectorComponent,
    MemberLookupComponent,
    MemberHeaderComponent,
    MemberHeaderDetailsComponent,
    MemberPhotoComponent,
    StudentPhotoComponent,
    EmptyStatusPipe,
    GradesUploaderComponent,
    InscriptionUploaderComponent,
    TituloUploaderComponent,
    StudentHeader2Component,
    HighchartsChartModule,
    AlertComponent,
    ThreeWayCheckboxComponent,

  ]
})
export class AppSharedModule {
  static forRoot(): ModuleWithProviders<AppSharedModule> {
    return {
      ngModule: AppSharedModule
    };
  }
}

import { NgModule } from '@angular/core';
import {
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';
/* import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
 */import { AppSharedModule } from '../_shared/_shared.module';

import { AdminsHomeComponent } from './admins-home/admins-home.component';
import { AdminsAddMemberComponent } from './admins-members/admins-add-member/admins-add-member.component';
import { AdminsMemberListComponent } from './admins-members/admins-member-list/admins-member-list.component';
import { AdminsMemberSearchComponent } from './admins-members/admins-member-search/admins-member-search.component';
import { AdminsMemberComponent } from './admins-members/admins-member/admins-member.component';
import { MentorReportsSubmittedComponent } from './admins-mr/mentor-reports-submitted/mentor-reports-submitted.component';
import { MentorReportsContainerComponent } from './admins-mr/mr-container/mr-container.component';
import { MentorReportsStatusCountsComponent } from './admins-mr/mr-status-counts/mr-status-counts.component';
import { MentorReportsSummaryTrackingComponent } from './admins-mr/mr-summary-tracking/mr-summary-tracking.component';
import { MentorReportSummaryUpdatesComponent } from './admins-mr/mr-summary-updates/mr-summary-updates.component';
import { AdminsNavbarComponent } from './admins-navbar/admins-navbar.component';
import { AdminsRoutingModule } from './admins-routing.module';
import { StudentSelfReportsContainerComponent } from './admins-ssr/ssr-container/ssr-container.component';
import { SSRMissingComponent } from './admins-ssr/ssr-missing/ssr-missing.component';
import { SSRStatusCountsComponent } from './admins-ssr/ssr-status-counts/ssr-status-counts.component';
import { StudentSelfReportsTrackingComponent } from './admins-ssr/ssr-summary-tracking/ssr-summary-tracking.component';
import { StudentSelfReportsSummaryUpdatesComponent } from './admins-ssr/ssr-summary-updates/ssr-summary-updates.component';

import { AdminsStudentMRsComponent } from './admins-student-mrs/admins-student-mrs.component';
import { AdminsStudentQRsComponent } from './admins-student-qrs/admins-student-qrs.component';
import { AdminsStudentSSRComponent } from './admins-student-ssr/admins-student-ssr.component';

import { AdminsStudentContainerComponent } from './admins-students/admins-student-container/admins-student-container.component';
import { AdminsStudentListComponent } from './admins-students/admins-student-list/admins-student-list.component';
import { AdminsStudentMemberDataComponent } from './admins-students/admins-student-member-profile/admins-student-member-profile.component';
import { AdminsStudentProfileComponent } from './admins-students/admins-student-profile/admins-student-student-profile.component';
import { AdminsStudentSearchComponent } from './admins-students/admins-student-search/admins-student-search.component';
import { AdminsComponent } from './admins.component';
import { FollowUpRequestsAddComponent } from './follow-up-requests-add/follow-up-requests-add.component';
import { FollowUpRequestsEditComponent } from './follow-up-requests-edit/follow-up-requests-edit.component';
import { FollowUpRequestsComponent } from './follow-up-requests/follow-up-requests.component';
import { SponsorGroupComponent } from './sponsor-group/sponsor-group.component';
import { SponsorGroupsComponent } from './sponsor-groups/sponsor-groups.component';
// import { StudentReportsStatusCountsComponent } from './ssr-status-countsXXX/ssr-status-counts.component';
import { UniversitiesComponent } from './universities/universities.component';
import { UniversityEditComponent } from './university-edit/university-edit.component';
import { UniversityAddComponent } from './universities/university-add/university-add.component';

import { ServerEnvironmentComponent } from './utilities/server-environment/server-environment.component';
import { TestNamesVisibilityComponent } from './utilities/test-names-visibility/test-names-visibility.component';
import { UtilitiesComponent } from './utilities/utilities.component';

import { WHSE_Daily_MR_Component } from '../_shared/components/whse-daily-mr/whse-daily-mr.component';
import { WHSE_Daily_SSR_Component } from '../_shared/components/whse-daily-ssr/whse-daily-ssr.component';
import { WHSE_GS_Component } from '../_shared/components/whse-gs/whse-gs.component';
import { WHSE_MR_Component } from '../_shared/components/whse-mr/whse-mr.component';
import { WHSE_SG_Component } from '../_shared/components/whse-sg/whse-sg.component';
import { WHSE_SS_Component } from '../_shared/components/whse-ss/whse-ss.component';
import { WHSE_SSR_Component } from '../_shared/components/whse-ssr/whse-ssr.component';

import { WHSE_DC_Component } from '../_shared/components/whse-dc/whse-dc.component';

import { WHSE_QR_Component } from '../_shared/components/whse-qr/whse-qr.component';
import { WHSE_SU_Component } from '../_shared/components/whse-su/whse-su.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SponsorStudentMatchComponent } from './sponsor-student-match/sponsor-student-match.component';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
    imports: [AppSharedModule,
        AdminsRoutingModule,
        ReactiveFormsModule,
        FormsModule/* , 
        NgbModule */,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatRadioModule,
        MatCheckboxModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatSlideToggleModule,
        HugeiconsIconComponent,
        MatExpansionModule
    ],
    declarations: [
        AdminsComponent,
        AdminsHomeComponent,
        AdminsMemberListComponent,
        AdminsMemberComponent,
        AdminsAddMemberComponent,
        AdminsStudentListComponent,
        AdminsStudentProfileComponent,
        AdminsStudentMRsComponent,
        MentorReportsContainerComponent,
        MentorReportsSummaryTrackingComponent,
        MentorReportsStatusCountsComponent,
        MentorReportSummaryUpdatesComponent,
        ServerEnvironmentComponent,
        // MentorReportFollowUpUpdatesComponent,
        // StudentReportsStatusCountsComponent,
        StudentSelfReportsContainerComponent,
        StudentSelfReportsTrackingComponent,
        SSRMissingComponent,
        SSRStatusCountsComponent,
        StudentSelfReportsSummaryUpdatesComponent,
        AdminsNavbarComponent,
        FollowUpRequestsComponent,
        FollowUpRequestsAddComponent,
        FollowUpRequestsEditComponent,
        // SelfReportsUpdatesComponent,
        SponsorGroupsComponent,
        SponsorGroupComponent,
        // FollowUpEventsComponent
        UtilitiesComponent,
        UniversitiesComponent,
        UniversityEditComponent,
        UniversityAddComponent,
        MentorReportsSubmittedComponent,
        AdminsStudentSearchComponent,
        AdminsMemberSearchComponent,
        TestNamesVisibilityComponent,
        AdminsStudentContainerComponent,
        AdminsStudentMemberDataComponent,
        AdminsStudentQRsComponent,
        AdminsStudentSSRComponent,
        WHSE_SSR_Component,
        WHSE_MR_Component,
        WHSE_SS_Component,
        WHSE_GS_Component,
        WHSE_SG_Component,
        WHSE_SU_Component,
        WHSE_DC_Component,
        WHSE_Daily_MR_Component,
        WHSE_Daily_SSR_Component,
        WHSE_QR_Component,
    ],
    exports: [AdminsStudentMRsComponent,
        AdminsStudentQRsComponent,
        SponsorGroupsComponent]
})
export class AdminsModule { }

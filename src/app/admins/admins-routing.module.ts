import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateViaAdminAuthGuard, ConfirmDeactivateMRSummaryUpdatesGuard, ConfirmDeactivateStudentProfileUpdatesGuard } from '../app.routing-guards';
import { AdminsHomeComponent } from './admins-home/admins-home.component';
import { AdminsAddMemberComponent } from './admins-members/admins-add-member/admins-add-member.component';
import { AdminsMemberListComponent } from './admins-members/admins-member-list/admins-member-list.component';
import { AdminsMemberSearchComponent } from './admins-members/admins-member-search/admins-member-search.component';
import { AdminsMemberComponent } from './admins-members/admins-member/admins-member.component';
import { MentorReportsContainerComponent } from './admins-mr/mr-container/mr-container.component';
import { MentorReportsSummaryTrackingComponent } from './admins-mr/mr-summary-tracking/mr-summary-tracking.component';
import { MentorReportSummaryUpdatesComponent } from './admins-mr/mr-summary-updates/mr-summary-updates.component';
import { StudentSelfReportsContainerComponent } from './admins-ssr/ssr-container/ssr-container.component';
import { StudentSelfReportsTrackingComponent } from './admins-ssr/ssr-summary-tracking/ssr-summary-tracking.component';
import { StudentSelfReportsSummaryUpdatesComponent } from './admins-ssr/ssr-summary-updates/ssr-summary-updates.component';
import { AdminsStudentMRsComponent } from './admins-student-mrs/admins-student-mrs.component';
import { AdminsStudentContainerComponent } from './admins-students/admins-student-container/admins-student-container.component';
import { AdminsStudentListComponent } from './admins-students/admins-student-list/admins-student-list.component';
import { AdminsStudentSearchComponent } from './admins-students/admins-student-search/admins-student-search.component';
import { AdminsComponent } from './admins.component';
import { FollowUpRequestsAddComponent } from './follow-up-requests-add/follow-up-requests-add.component';
import { FollowUpRequestsEditComponent } from './follow-up-requests-edit/follow-up-requests-edit.component';
import { FollowUpRequestsComponent } from './follow-up-requests/follow-up-requests.component';
import { SponsorGroupComponent } from './sponsor-group/sponsor-group.component';
import { SponsorGroupsComponent } from './sponsor-groups/sponsor-groups.component';
import { UniversitiesComponent } from './universities/universities.component';
import { UniversityEditComponent } from './university-edit/university-edit.component';
import { UniversityAddComponent } from './universities/university-add/university-add.component';
import { UtilitiesComponent } from './utilities/utilities.component';
import { SponsorStudentMatchComponent } from './sponsor-student-match/sponsor-student-match.component';
import { ExportDonationsComponent } from './export-donations/export-donations.component';

const adminRoutes: Routes = [
  {
    path: '', // lazy loading
    component: AdminsComponent,
    canActivate: [CanActivateViaAdminAuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: AdminsHomeComponent // AdminsStudentSearchComponent//
      },
      {
        path: 'data',
        title: 'Data',
        component: AdminsHomeComponent
      },
      {
        path: 'sponsor-groups',
        title: 'Sponsor Groups',
        component: SponsorGroupsComponent
      },
      {
        path: 'sponsor-group/:id',
        title: 'Sponsor Group Detail',
        component: SponsorGroupComponent
      },


      /* {
        path: 'members',
        title: 'Members',
        component: AdminsMemberSearchComponent
      },
      {
        path: 'members/memberList',
        title: 'Memberlist',
        component: AdminsMemberListComponent
      }, */
      {
        path: 'members',
        title: 'Members',
        component: AdminsMemberListComponent
      },
      {
        path: 'members/createNewMember',
        title: 'Create New Member',
        component: AdminsAddMemberComponent,
      },

      {
        path: 'members/member', // using guid ; query param guid:guid',
        title: 'Member Detail', // Using Guid ; Query Param Guid:Guid',
        component: AdminsMemberComponent
      },

      {
        path: 'students',
        title: 'Students',
        component: AdminsStudentSearchComponent
      },
      {
        path: 'students/studentList',
        title: 'Student List',
        component: AdminsStudentListComponent
      },
      {
        path: 'students/student-container', // :guid',
        title: 'Student Detail', // :Guid',
        component: AdminsStudentContainerComponent,
        canDeactivate: [ConfirmDeactivateStudentProfileUpdatesGuard]
      },

      {
        path: 'students/student/mentorReports', // using query params /:mentorId/:mentorGUId/:studentGUId/:studentName',
        title: 'Mentor Reports', // Using Query Params /:Mentorid/:Mentorguid/:Studentguid/:Studentname',
        component: AdminsStudentMRsComponent
      },
      // {
      //   path: 'students/grade-history/:id',
      // title: 'Grade History Detail',
      //   component: AdminsGradeHistoryComponent
      // },
      {
        path: 'mentor-reports/summary-tracking', // using query param /:id/:year/:month/:summaryStatus/:highlight',
        title: 'Summary Tracking', // Using Query Param /:Id/:Year/:Month/:Summarystatus/:Highlight',
        component: MentorReportsSummaryTrackingComponent
      },

      {
        path: 'mentor-reports/mr-container',
        title: 'Mr Container',
        component: MentorReportsContainerComponent
      },

      {
        path: 'mentor-reports/summary-updates', // /:mentorReportId',
        title: 'Mentor Summary Updates', // /:Mentorreportid',
        component: MentorReportSummaryUpdatesComponent,
        canDeactivate: [ConfirmDeactivateMRSummaryUpdatesGuard]
      },

      {
        path: 'student-reports/summary-updates', // /:mentorReportId',
        title: 'Student Summary Updates', // /:Mentorreportid',
        component: StudentSelfReportsSummaryUpdatesComponent,
        canDeactivate: [ConfirmDeactivateMRSummaryUpdatesGuard]
      },

      {
        path: 'student-reports/summary-tracking', // using query param /:id/:year/:month/:summaryStatus/:highlight',
        title: 'Summary Tracking', // Using Query Param /:Id/:Year/:Month/:Summarystatus/:Highlight',
        component: StudentSelfReportsTrackingComponent
      },

      {
        path: 'student-reports/ssr-container',
        title: 'SSR Container',
        component: StudentSelfReportsContainerComponent
      },

      {
        path: 'student-reports/summary-updates', // /:mentorReportId',
        title: 'Summary Updates', // /:Mentorreportid',
        component: StudentSelfReportsSummaryUpdatesComponent,
        canDeactivate: [ConfirmDeactivateMRSummaryUpdatesGuard]
      },

      {
        path: 'follow-up/requests',
        title: 'Requests',
        component: FollowUpRequestsComponent
      },
      {
        path: 'follow-up/request-add',
        title: 'Request Add',
        component: FollowUpRequestsAddComponent
      },
      {
        path: 'follow-up/request-edit', // use ?x=  /:requestId',
        title: 'Request Edit', // Use ?X=  /:Requestid',
        component: FollowUpRequestsEditComponent
      },
      // {
      //   path: 'reports',
      // title: 'Reports',
      //   component: ReportsComponent
      // },
      {
        path: 'universities',
        title: 'Universities',
        component: UniversitiesComponent
      },
      {
        path: 'university-edit', // /:universityId',
        title: 'University Edit', // /:Universityid',
        component: UniversityEditComponent
      },
      {
        path: 'university-add', // /:universityId',
        title: 'University Add', // /:Universityid',
        component: UniversityAddComponent
      },
      {
        path: 'utilities',
        title: 'Utilities',
        component: UtilitiesComponent
      },
      {
        path: 'sponsor-student-match',
        title: 'Sponsor Student Match',
        component: SponsorStudentMatchComponent
      },
      {
        path: 'donations',
        title: 'Donations',
        component: ExportDonationsComponent
      },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminsRoutingModule { }

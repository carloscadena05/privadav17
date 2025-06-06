import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateViaMentorAuthGuard, ConfirmDeactivateMonthlyReportAddGuard } from '../app.routing-guards';
import { ForumComponent } from './forum/forum.component';
import { MentorsContainerComponent } from './mentors-container/mentors-container.component';
import { MentorsProfileComponent } from './mentors-profile/mentors-profile.component';
import { MentorsComponent } from './mentors.component';
import { MonthlyReports2EditComponent } from './monthly-reports2-edit/monthly-reports2-edit.component';
import { MonthlyReports2ENAddComponent } from './monthly-reports2-EN-add/monthly-reports2-EN-add.component';
import { MonthlyReports2ESAddComponent } from './monthly-reports2-ES-add/monthly-reports2-ES-add.component';
import { MonthlyReports2Component } from './monthly-reports2/monthly-reports2.component';

const mentorRoutes: Routes = [
  {
    path: '', // lazy loading
    component: MentorsComponent,
    canActivate: [CanActivateViaMentorAuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: MentorsContainerComponent
      },
      {
        path: 'becas-home',
        title: 'Becas-Home',
        component: MentorsContainerComponent
      },
      {
        path: 'profile/:id',
        title: 'Profile/:Id',
        component: MentorsProfileComponent
      },
      {
        path: 'monthly-reports/:mentorId',
        title: 'Monthly-Reports/:Mentorid',
        component: MonthlyReports2Component
      },
      {
        path: 'monthly-reports', // use session userId
        title: 'Monthly-Reports', // Use Session Userid
        component: MonthlyReports2Component
      },
      {
        path: 'monthly-reports-EN-add', // using query params /:mentorId/:studentGUId',
        title: 'Monthly Reports EN Add', // Using Query Params /:Mentorid/:Studentguid',
        component: MonthlyReports2ENAddComponent,
        canDeactivate: [ConfirmDeactivateMonthlyReportAddGuard]
      },
      {
        path: 'monthly-reports-ES-add', // using query params /:mentorId/:studentGUId',
        title: 'Monthly Reports ES Add', // Using Query Params /:Mentorid/:Studentguid',
        component: MonthlyReports2ESAddComponent,
        canDeactivate: [ConfirmDeactivateMonthlyReportAddGuard]
      },
      {
        path: 'monthly-reports-edit/:mentorReportId',
        title: 'Monthly Reports Edit',
        component: MonthlyReports2EditComponent,
        canDeactivate: [ConfirmDeactivateMonthlyReportAddGuard]
      },
      // {
      //   path: 'follow-up-requests-add',
      // title: 'Follow-Up-Requests-Add',
      //   component: FollowUpRequestsAddComponent,
      //   canDeactivate: [ConfirmDeactivateMonthlyReportAddGuard]
      // },
      // {
      //   path: 'follow-up-requests',
      // title: 'Follow-Up-Requests',
      //   component: FollowUpRequestsComponent
      // },
      {
        path: 'forum',
        title: 'Forum',
        component: ForumComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(mentorRoutes)],
  exports: [RouterModule]
})

export class MentorsRoutingModule { }

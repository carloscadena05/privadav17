import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateViaStudentAuthGuard } from '../app.routing-guards';
import { GradeEntryComponent } from './grade-entry/grade-entry.component';
import { InscriptionsEntryComponent } from './inscriptions-entry/inscriptions-entry.component';
import { SelfReportsAddComponent } from './self-reports-add/self-reports-add.component';
import { SelfReportsEditComponent } from './self-reports-edit/self-reports-edit.component';
import { StudentProfileComponent } from './students-profile/students-profile.component';
import { StudentsSelfReportsComponent } from './students-self-reports/students-self-reports.component';
import { StudentsComponent } from './students.component';


const routes: Routes = [
  {
    // path: 'students', // non lazy loading
    path: '', // lazy loading
    component: StudentsComponent,
    canActivate: [CanActivateViaStudentAuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        // shortcut to SelfReport /////
        component: StudentsSelfReportsComponent
      },
      {
        path: 'self-reports',
        title: 'Self Reports',
        component: StudentsSelfReportsComponent
      },
      {
        path: 'self-reports-add', // use params not path // /:sponsorGroupId/:studentGUId',
        title: 'Self Reports Add', // Use Params Not Path // /:Sponsorgroupid/:Studentguid',
        component: SelfReportsAddComponent
      },
      {
        path: 'self-reports-edit/:selfReportId',
        title: 'Self Reports Edit',
        component: SelfReportsEditComponent
      },
      {
        path: 'grade-entry',
        title: 'Grade Entry',
        component: GradeEntryComponent
      },
      {
        path: 'inscriptions-entry',
        title: 'Inscriptions Entry',
        component: InscriptionsEntryComponent
      },
      {
        path: 'students-profile',
        title: 'Students Profile',
        component: StudentProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule {}

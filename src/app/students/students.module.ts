import { CommonModule } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AppSharedModule } from '../_shared/_shared.module';
import { GradeEntryComponent } from './grade-entry/grade-entry.component';
import { SelfReportsAddComponent } from './self-reports-add/self-reports-add.component';
import { SelfReportsEditComponent } from './self-reports-edit/self-reports-edit.component';
import { StudentsHomeComponent } from './students-home/students-home.component';
import { StudentsNavbarComponent } from './students-navbar/students-navbar.component';
import { StudentProfileComponent } from './students-profile/students-profile.component';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentsSelfReportsComponent } from './students-self-reports/students-self-reports.component';
import { StudentsComponent } from './students.component';

import { ReactiveFormsModule } from '@angular/forms';
import { InscriptionsEntryComponent } from './inscriptions-entry/inscriptions-entry.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [AppSharedModule, CommonModule, StudentsRoutingModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  declarations: [
    StudentsComponent,
    StudentsNavbarComponent,
    StudentsHomeComponent,
    StudentProfileComponent,
    StudentsSelfReportsComponent,
    SelfReportsEditComponent,
    SelfReportsAddComponent,
    GradeEntryComponent,
    InscriptionsEntryComponent
  ],
  exports: [
    SelfReportsAddComponent
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'es'
   }]
})
export class StudentsModule {}

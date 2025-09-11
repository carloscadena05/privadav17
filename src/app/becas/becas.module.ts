import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
/* import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
 */import { AppSharedModule } from '../_shared/_shared.module';
import { BecasNavbarComponent } from './becas-navbar/becas-navbar.component';
import { BecasRoutingModule } from './becas-routing.module';
import { BecasComponent } from './becas.component';
import { GradesEditComponent } from './grades-edit/grades-edit.component';
import { GradesListComponent } from './grades-list/grades-list.component';
import { InscriptionsEditComponent } from './inscriptions-edit/inscriptions-edit.component';
import { InscriptionsListComponent } from './inscriptions-list/inscriptions-list.component';
import { PaymentsEditComponent } from './payments-edit/payments-edit.component';
import { PaymentsListComponent } from './payments-list/payments-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { HugeiconsIconComponent } from '@hugeicons/angular';

@NgModule({
  declarations: [
    BecasNavbarComponent,
    BecasComponent,
    GradesListComponent,
    GradesEditComponent,
    InscriptionsListComponent,
    InscriptionsEditComponent,
    PaymentsListComponent,
    PaymentsEditComponent,
  ],
  imports: [CommonModule
    , AppSharedModule
    , BecasRoutingModule/* 
    , NgbModule */
    ,MatTableModule
    ,MatInputModule
    ,MatFormFieldModule
    ,MatPaginatorModule
    ,MatSelectModule
    ,MatCheckboxModule
    ,MatDialogModule
    ,HugeiconsIconComponent
  ]
})
export class BecasModule { }

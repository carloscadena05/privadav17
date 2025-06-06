import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  CanActivateViaAdminAuthGuard,
  ConfirmDeactivateGradesEditGuard,
  ConfirmDeactivateInscriptionsEditGuard
} from '../app.routing-guards';
import { BecasComponent } from './becas.component';
import { GradesEditComponent } from './grades-edit/grades-edit.component';
import { GradesListComponent } from './grades-list/grades-list.component';
import { InscriptionsEditComponent } from './inscriptions-edit/inscriptions-edit.component';
import { InscriptionsListComponent } from './inscriptions-list/inscriptions-list.component';
import { PaymentsEditComponent } from './payments-edit/payments-edit.component';
import { PaymentsListComponent } from './payments-list/payments-list.component';

const gradesRoutes: Routes = [
  {
    path: '', // lazy loading
    component: BecasComponent,
    canActivate: [CanActivateViaAdminAuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: PaymentsListComponent
      },
      {
        path: 'payments-list',
        title: 'Payments List',
        component: PaymentsListComponent
      },
      {
        path: 'payments-edit',
        title: 'Payments Edit',
        component: PaymentsEditComponent
      },
      {
        path: 'grades-list',
        title: 'Grades List',
        component: GradesListComponent
      },
      {
        path: 'grades-edit',
        title: 'Grades Edit',
        component: GradesEditComponent,
        canDeactivate: [ConfirmDeactivateGradesEditGuard]
      },
      {
        path: 'inscriptions-list',
        title: 'Inscriptions List',
        component: InscriptionsListComponent
      },
      {
        path: 'inscriptions-edit',
        title: 'Inscriptions Edit',
        component: InscriptionsEditComponent,
        canDeactivate: [ConfirmDeactivateInscriptionsEditGuard]
      },
      {
        path: 'ssr-list',
        title: 'SSR List',
        component: InscriptionsEditComponent,
        canDeactivate: [ConfirmDeactivateInscriptionsEditGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(gradesRoutes)],
  exports: [RouterModule]
})
export class BecasRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateViaAdminAuthGuard } from '../app.routing-guards';
import { QuarterlyContainerComponent } from './quarterly-container/quarterly-container.component';
import { QuarterlyListComponent } from './quarterly-list/quarterly-list.component';
import { QuarterlyComponent } from './quarterly.component';


const quarterlyRoutes: Routes = [
  {
    path: '', // lazy loading
    component: QuarterlyComponent,
    canActivate: [CanActivateViaAdminAuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: QuarterlyListComponent
      },
      {
        path: 'edit',
        title: 'Edit',
        component: QuarterlyContainerComponent
      },
      {
        path: 'quarterly-container',
        title: 'Quarterly Container',
        component: QuarterlyListComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(quarterlyRoutes)],
  exports: [RouterModule]
})
export class QuarterlyRoutingModule { }

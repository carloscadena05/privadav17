import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateViaSponsorAuthGuard } from '../app.routing-guards';
import { SponsorsContainerComponent } from './sponsors-container/sponsors-container.component';
import { SponsorsComponent } from './sponsors.component';

const sponsorRoutes: Routes = [
  {
    path: '', // lazy loading
    component: SponsorsComponent,
    canActivate: [CanActivateViaSponsorAuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: SponsorsContainerComponent,
      },
      {
        path: 'becas-home',
        title: 'Becas',
        component: SponsorsContainerComponent
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(sponsorRoutes)],
  exports: [RouterModule]
})
export class SponsorsRoutingModule { }

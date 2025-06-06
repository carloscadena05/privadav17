import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateViaAdminAuthGuard } from '../app.routing-guards';
import { TitulosEntryComponent } from './titulos-entry/titulos-entry.component';
import { TitulosListComponent } from './titulos-list/titulos-list.component';
import { TitulosComponent } from './titulos.component';

const titulosRoutes: Routes = [
  {
    path: '', // lazy loading
    component: TitulosComponent,
    canActivate: [CanActivateViaAdminAuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: TitulosListComponent
      },
      {
        path: 'titulos-list',
        title: 'Titulos List',
        component: TitulosListComponent
      },
      {
        path: 'titulos-entry',
        title: 'Titulos Entry',
        component: TitulosEntryComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(titulosRoutes)],
  exports: [RouterModule]
})
export class TitulosRoutingModule {}

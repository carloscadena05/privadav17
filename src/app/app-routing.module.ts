import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallbackComponent } from './_shared/components/callback.component';
import { InitialNavigationGuard } from './app.routing-guards';

const appRoutes: Routes = [
  {
    path: 'callback',
    title: 'Callback',
    component: CallbackComponent
  },
  {
    path: '',
    title: '',
    redirectTo: 'home',
    pathMatch: 'full',

  },
  {
    path: 'home',
    title: 'Home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'Home/Mentors',
    title: 'Mentors',
    redirectTo: '/mentors'
  },
  {
    path: 'admins',
    title: 'Admins',
    loadChildren: () => import('./admins/admins.module').then(m => m.AdminsModule)
  },
  {
    path: 'mentors',
    title: 'Mentors',
    loadChildren: () => import('./mentors/mentors.module').then(m => m.MentorsModule)
  },
  {
    path: 'sponsors',
    title: 'Sponsors',
    loadChildren: () => import('./sponsors/sponsors.module').then(m => m.SponsorsModule)
  },
  {
    path: 'students',
    title: 'Students',
    loadChildren: () => import('./students/students.module').then(m => m.StudentsModule),
    canActivate: [InitialNavigationGuard]
  },
  {
    path: 'quarterly',
    title: 'Quarterly',
    loadChildren: () => import('./quarterly/quarterly.module').then(m => m.QuarterlyModule)
  },
  {
    path: 'becas',
    title: 'Becas',
    loadChildren: () => import('./becas/becas.module').then(m => m.BecasModule)
  },
  {
    path: 'titulos',
    title: 'Titulos',
    loadChildren: () => import('./titulos/titulos.module').then(m => m.TitulosModule)
  },
  { path: '**', redirectTo: '' }
];

// export const appRoutingProviders: any[] = [

// ];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
    enableTracing: false,
      paramsInheritanceStrategy: 'always'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

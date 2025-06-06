import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './_shared/services/auth.service';
import { SessionService } from './_shared/services/session.service';
import { MentorReportSummaryUpdatesComponent } from './admins/admins-mr/mr-summary-updates/mr-summary-updates.component';
import { AdminsStudentProfileComponent } from './admins/admins-students/admins-student-profile/admins-student-student-profile.component';
import { GradesEditComponent } from './becas/grades-edit/grades-edit.component';
import { InscriptionsEditComponent } from './becas/inscriptions-edit/inscriptions-edit.component';
import { MonthlyReports2ENAddComponent } from './mentors/monthly-reports2-EN-add/monthly-reports2-EN-add.component';
import { MonthlyReports2ESAddComponent } from './mentors/monthly-reports2-ES-add/monthly-reports2-ES-add.component';

@Injectable({ providedIn: 'root' })
export class CanActivateViaAdminAuthGuard  {
  constructor(private auth: AuthService, private router: Router, private session: SessionService) {}

  canActivate(next: ActivatedRouteSnapshot, routerStateSnapshot: RouterStateSnapshot) {
    console.log('canActivate for Admin AuthGuard with routerStateSnapshot.url' + routerStateSnapshot.url);
    if (this.auth.loggedIn) {
      console.log('Can Activate Admin 1');
      if (this.session.isAdmin()) {
        console.log('Authenticated and Can Activate Admin');
        return true;
      } else {
        console.log('Authenticated but unauthorized for Admin');
        return false;
      }
    } else {
      console.log('Not authenticated -- Can\'t Activate Admin');
      this.router.navigate([ '' ]); // just to clean up url bar
      this.auth.login(routerStateSnapshot.url);
      return false;
    }
  }
}
@Injectable({ providedIn: 'root' })
export class CanActivateViaMentorAuthGuard  {
  constructor(private auth: AuthService, private router: Router, private session: SessionService) {}

  canActivate(next: ActivatedRouteSnapshot, routerStateSnapshot: RouterStateSnapshot) {
    console.log('canActivate for /mentors');
    if (this.auth.loggedIn) {
      // following has issue of race condition with callback to get profile
      if (this.session.isMentor()) {
        console.log('Authenticated and Can Activate Mentor');
        return true;
      } else {
        return false;
      }
    } else {
      console.log('link to Mentor but not authenticated -- save /mentors routerState url:' + routerStateSnapshot.url);
      this.router.navigate([ '' ]); // just to clean up URL bar
      this.auth.login(routerStateSnapshot.url);

      return false;
    }
  }
}

@Injectable({ providedIn: 'root' })
export class CanActivateViaSponsorAuthGuard  {
  constructor(private auth: AuthService, private router: Router, private session: SessionService) {}

  canActivate(next: ActivatedRouteSnapshot, routerStateSnapshot: RouterStateSnapshot) {
    console.log('canActivate for /sponsors');
    if (this.auth.loggedIn) {
      // following has issue of race condition with callback to get profile
      if (this.session.isSponsor()) {
        console.log('Authenticated and Can Activate Sponsor');
        return true;
      } else {
        return false;
      }
    } else {
      console.log('link to Sponsor but not authenticated -- save /sponsors routerStateSnapshot.url:' + routerStateSnapshot.url);
      this.router.navigate([ '' ]); // just to clean up URL bar
      this.auth.login(routerStateSnapshot.url);

      return false;
    }
  }
}

@Injectable({ providedIn: 'root' })
export class CanActivateViaStudentAuthGuard  {
  constructor(private auth: AuthService, private router: Router, private session: SessionService) {}

  canActivate(next: ActivatedRouteSnapshot, routerStateSnapshot: RouterStateSnapshot) {
    console.log('canActivate for /students');
    if (this.auth.loggedIn) {
      // following has issue of race condition with callback to get profile
      if (this.session.isStudent() || this.session.isAdmin() /* for proxy cases */ ) {
        console.log('Authenticated and Can Activate Student');
        return true;
      } else {
        console.log('Authenticated but unauthorized for Student');
        return false;
      }
    } else {
      console.log('link to Student but not authenticated -- save /students routerStateSnapshot.url:' + routerStateSnapshot.url);
      this.router.navigate([ '' ]); // just to clean up URL bar
      this.auth.login(routerStateSnapshot.url);

      return false;
    }
  }
}

@Injectable({ providedIn: 'root' })
export class ConfirmDeactivateMonthlyReportAddGuard  {
  canDeactivate(component: MonthlyReports2ESAddComponent): boolean {
    if (component.hasChanges()) {
      console.log('CanDeactivate');
      // tslint:disable-next-line:max-line-length
      return window.confirm(
        'You have unsaved changes. Click OK to leave the page without saving.\nTiene cambios no guardados. Haga clic OK para salir de la página sin guardar'
      );
    }
    return true;
  }
}
@Injectable({ providedIn: 'root' })
export class ConfirmDeactivateMonthlyReportENAddGuard  {
  canDeactivate(component: MonthlyReports2ENAddComponent): boolean {
    if (component.hasChanges()) {
      console.log('CanDeactivate');
      // tslint:disable-next-line:max-line-length
      return window.confirm(
        'You have unsaved changes. Click OK to leave the page without saving.\nTiene cambios no guardados. Haga clic OK para salir de la página sin guardar'
      );
    }
    return true;
  }
}


@Injectable({ providedIn: 'root' })
export class ConfirmDeactivateMRSummaryUpdatesGuard  {
  canDeactivate(component: MentorReportSummaryUpdatesComponent): boolean {
    if (component.hasChanges()) {
      console.log('CanDeactivate');
      // tslint:disable-next-line:max-line-length
      return window.confirm(
        'You have unsaved changes. Click OK to leave the page without saving.\nTiene cambios no guardados. Haga clic OK para salir de la página sin guardar'
      );
    }
    console.log('CanDeactivate for MRSummaryUpdates clearing unauthenticate_retry+url');
    localStorage.removeItem('unauthenticated_retry_url');
    return true;
  }
}

// see https://stackoverflow.com/questions/68299992/how-to-use-can-deactivate-without-routing
@Injectable({ providedIn: 'root' })
export class ConfirmDeactivateStudentProfileUpdatesGuard  {
  canDeactivate(component: AdminsStudentProfileComponent): boolean {
    console.log('XXXXXXXXXXXCanDeactivate');
    if (component.hasChanges instanceof Function) {
      console.log('XXXXXXXXXXXCanDeactivate2');
      if (component.hasChanges()) {
        console.log('CanDeactivate');
        // tslint:disable-next-line:max-line-length
        return window.confirm(
          'You have unsaved changes. Click OK to leave the page without saving.\nTiene cambios no guardados. Haga clic OK para salir de la página sin guardar'
        );
      }
    }
    console.log('CanDeactivate for StudentProfile clearing unauthenticate_retry+url');
    localStorage.removeItem('unauthenticated_retry_url');
    return true;
  }
}

@Injectable({ providedIn: 'root' })
export class ConfirmDeactivateGradesEditGuard  {
  canDeactivate(component: GradesEditComponent): boolean {
    if (component.hasChanges()) {
      console.log('CanDeactivate');
      // tslint:disable-next-line:max-line-length
      return window.confirm(
        'You have unsaved changes. Click OK to leave the page without saving.\nTiene cambios no guardados. Haga clic OK para salir de la página sin guardar'
      );
    }
    console.log('CanDeactivate for GradesEdit clearing unauthenticate_retry+url');
    localStorage.removeItem('unauthenticated_retry_url');
    return true;
  }
}
@Injectable({ providedIn: 'root' })
  export class ConfirmDeactivateInscriptionsEditGuard  {
    canDeactivate(component: InscriptionsEditComponent): boolean {
      if (component.hasChanges()) {
        console.log('CanDeactivate');
        // tslint:disable-next-line:max-line-length
        return window.confirm(
          'You have unsaved changes. Click OK to leave the page without saving.\nTiene cambios no guardados. Haga clic OK para salir de la página sin guardar'
        );
      }
      console.log('CanDeactivate for InscriptionsEdit clearing unauthenticate_retry+url');
      localStorage.removeItem('unauthenticated_retry_url');
      return true;
    }
}

@Injectable({ providedIn: 'root' })
 export class InitialNavigationGuard  {
   private initialNavigation = true;

   constructor(private auth: AuthService, private session: SessionService, private router: Router) {}

   canActivate(): boolean {
     console.log('InitialNavigationGuard#canActivate called');
     if (this.initialNavigation && this.session.isStudent()) {
       this.initialNavigation = false;
       console.log('InitialNavigationGuard#canActivate: Redirecting to /students');
       this.router.navigate(['/students']);
       return false; // Prevent further navigation
     }
     return true;
   }
 }
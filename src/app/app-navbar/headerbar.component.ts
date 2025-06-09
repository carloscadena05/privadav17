import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_shared/services/auth.service';
import { SessionService } from '../_shared/services/session.service';
/**
 * This class represents the app-navbar component.
 */
@Component({
    selector: 'app-headerbar',
    templateUrl: 'headerbar.component.html',
    styleUrls: ['headerbar.component.scss'],
    standalone: false
})
export class HeaderbarComponent implements OnInit {
  private initialNavigation = true;

  constructor(public auth: AuthService, public session: SessionService, private router: Router) {}
  ngOnInit(): void {

    // this.router.events
    // .pipe(filter(event => event instanceof NavigationEnd))
    // .subscribe(() => {
    //   if (this.initialNavigation && this.session.isStudent()) {
    //     this.initialNavigation = false;
    //     this.router.navigate(['/students']);
    //     return false;
    //   }
    // });
  }

  public isAdminWithValidToken(): boolean {
    return this.auth.loggedIn && this.session.isAdmin();
  }

  public isMentorWithValidToken(): boolean {
    return this.auth.loggedIn && this.session.isMentor();
  }

  public isSponsorWithValidToken(): boolean {
    return this.auth.loggedIn && this.session.isSponsor();
  }

  public isStudentWithValidToken(): boolean {
    return this.auth.loggedIn && this.session.isStudent();
  }
}

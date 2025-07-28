import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_shared/services/auth.service';
import { SessionService } from '../_shared/services/session.service';
import { HomeIcon, AppleIcon, MoreVerticalIcon } from '@hugeicons/core-free-icons';
import { MediaMatcher } from '@angular/cdk/layout';

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
   private _media_matcher: MediaMatcher = inject(MediaMatcher)
  private initialNavigation = true;
  spanish: boolean = false;
  MoreVertical = MoreVerticalIcon
   theme: boolean = this._media_matcher.matchMedia("(prefers-color-scheme: light)").matches;

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
    this.spanish = navigator.language.startsWith('es');
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

  change_theme() {
      this.theme = !this.theme;
      document.documentElement.classList.toggle('dark');
  }

}

import { Component } from '@angular/core';
import { AuthService } from '../_shared/services/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss'],
    standalone: false
})
export class HomeComponent {

  constructor(public auth: AuthService) {

  }
  public onLoginClick = ($event: Event) => {
    $event.preventDefault(); // don't navigate to href.
    this.auth.login();
  };

  public onLogoutClick = ($event: Event) => {
    console.log('onLogoutClick');
    $event.preventDefault(); // don't navigate to href.
    this.auth.logout();
  };

}

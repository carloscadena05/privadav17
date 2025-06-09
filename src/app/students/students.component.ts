import { Component } from '@angular/core';
import { AuthService } from '../_shared/services/auth.service';
/**
 * This class represents the lazy loaded StudentsComponent.
 */
@Component({
    selector: 'app-students',
    templateUrl: 'students.component.html',
    styleUrls: ['students.component.scss'],
    standalone: false
})
export class StudentsComponent {

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

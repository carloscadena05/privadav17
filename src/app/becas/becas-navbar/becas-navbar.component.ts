import { Component } from '@angular/core';

@Component({
    selector: 'app-becas-navbar',
    templateUrl: 'becas-navbar.component.html',
    styleUrls: ['becas-navbar.component.scss'],
    standalone: false
})
export class BecasNavbarComponent {
  currUserId: number;

  constructor() {}
}

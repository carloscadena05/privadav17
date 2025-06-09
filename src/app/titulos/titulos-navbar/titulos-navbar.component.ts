import { Component } from '@angular/core';

@Component({
    selector: 'app-tituloas-navbar',
    templateUrl: 'titulos-navbar.component.html',
    styleUrls: ['titulos-navbar.component.scss'],
    standalone: false
})
export class TitulosNavbarComponent {
  currUserId: number;

  constructor() {}
}

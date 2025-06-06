import { Component } from '@angular/core';

@Component({
    selector: 'app-tituloas-navbar',
    templateUrl: 'titulos-navbar.component.html',
    styleUrls: ['titulos-navbar.component.css'],
    standalone: false
})
export class TitulosNavbarComponent {
  currUserId: number;

  constructor() {}
}

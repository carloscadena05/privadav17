import { Component } from '@angular/core';
/**
 * This class represents the lazy loaded
 */
@Component({
    templateUrl: 'admins-home.component.html',
    standalone: false
})
export class AdminsHomeComponent {

  twcss_activeTab: string = 'mentor'


  constructor() {
    // nada
  }

}

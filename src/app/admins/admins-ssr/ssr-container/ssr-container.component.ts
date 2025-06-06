import { Component } from '@angular/core';

@Component({
    templateUrl: 'ssr-container.component.html',
    standalone: false
})
export class StudentSelfReportsContainerComponent {
  constructor() {
    console.log('ssr-container constructor');
  }
}

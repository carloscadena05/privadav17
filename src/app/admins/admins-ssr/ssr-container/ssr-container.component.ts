import { Component } from '@angular/core';

@Component({
    templateUrl: 'ssr-container.component.html',
    standalone: false
})
export class StudentSelfReportsContainerComponent {
  twcss_activeTab = 'ssrReview';
  constructor() {
    console.log('ssr-container constructor');
  }
}

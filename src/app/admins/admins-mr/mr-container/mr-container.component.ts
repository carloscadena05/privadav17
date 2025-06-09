import { Component } from '@angular/core';

@Component({
    templateUrl: 'mr-container.component.html',
    standalone: false
})
export class MentorReportsContainerComponent {
  twcss_activeTab: string = 'review'
  constructor() {
    console.log('mr-container constructor');
  }
}

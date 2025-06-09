import { Component } from '@angular/core';

/**
 * This class represents the lazy loaded MentorsComponent.
 */
@Component({
    templateUrl: './mentors.component.html',
    styleUrls: ['./mentors.component.scss'],
    standalone: false
})
export class MentorsComponent {
  constructor() {
    console.log('MentorsComponent');
  }
}

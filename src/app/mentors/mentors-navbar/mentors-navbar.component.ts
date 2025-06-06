import { Component } from '@angular/core';
@Component({
    selector: 'app-mentors-navbar',
    templateUrl: './mentors-navbar.component.html',
    styleUrls: ['./mentors-navbar.component.css'],
    standalone: false
})
export class MentorsNavbarComponent {
  currUserId: number;

  constructor() {}
}

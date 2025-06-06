import { Component, Input } from '@angular/core';

@Component({
    template: `<div>
  <input id="gradeMonths" type="text" disabled
  class="form-control form-control-sm" value={{gradeMonths}} />
  </div>`,
    selector: 'app-university-grade-months',
    standalone: false
})
export class UniversityGradeMonthsComponent {
  @Input() universityId: number;
  gradeMonths: string;

  constructor() {
    this.gradeMonths = 'Quarter / JanMaySep';


  }
}

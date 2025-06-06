import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StudentDataService } from '../../data/student-data.service';
import { StudentMiniDTO } from '../../models/studentMiniDTO';
@Component({
    selector: 'app-student-selector',
    templateUrl: './student-selector.component.html',
    standalone: false
})
export class StudentSelectorComponent implements OnInit {
  students: Array<StudentMiniDTO>;
  errorMessage = '';
  haveData: boolean;
  isLoading: boolean;
  @Output() onSelectedStudentGUId = new EventEmitter<string>();
  @Input() currentStudentGUId: string;

  constructor(private studentData: StudentDataService) {}
  public ngOnInit() {

    console.log('student selector has input ' + this.currentStudentGUId);
    this.haveData = false;
    this.isLoading = true;
    this.studentData.getCurrentStudentMiniDTOs('', true).subscribe(
      (data) => {
        this.students = data;
      },
      (err) => console.error('Subscribe error: ' + err),
      () => {
        console.log('student selector has All students: ' + this.students.length);
        this.students = this.students.filter((s) => s.studentName !== 'N/A, N/A');
        console.log('student selector has Current students: ' + this.students.length);
        if (this.students.length > 0) {
          console.log(this.students[0].studentName);
          this.isLoading = false;
          this.haveData = true;

        } else {
          //
        }
      }
    );
  }

  public setSelectedStudent(studentGUId: string) {
    console.log('selected studentGUId is set to ' + studentGUId);
    this.onSelectedStudentGUId.emit(studentGUId);
  }
}

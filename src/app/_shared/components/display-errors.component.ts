import { Component, Host, Input } from '@angular/core';
import { UntypedFormGroup, FormGroupDirective } from '@angular/forms';

@Component({
    template: '<mat-error>{{currentError}}</mat-error>',
    selector: 'app-display-errors',
    standalone: false
})
export class DisplayErrorsComponent {
  @Input() errors: Object;
  @Input() control: string;
  myFormGroup: UntypedFormGroup;
  // constructor(@Host() private formDir: NgForm) {}
  constructor(@Host() private myFormGroupDirective: FormGroupDirective) { }
  get currentError() {
    this.myFormGroup = this.myFormGroupDirective.control;
    const control = this.myFormGroup.controls[this.control];
    // console.log(control);
    let errorMessages: Array<string> = [];
    if (control && (control.touched || !control.pristine)) {

      // console.log(Object.keys(this.errors));
      //   // [key1, key2]
      // console.log(Object.keys(this.errors)
      //   .map(k => control.hasError(k) ? (<any> this.errors)[k] : null));
      //   // [text of msg1 (has error), null (no error)]
      // console.log(Object.keys(this.errors)
      //   .map(k => control.hasError(k) ? (<any> this.errors)[k] : null)
      //   .filter(error => !!error));
      //   // [text of msg1 ]

      errorMessages = Object.keys(this.errors)
        .map(k => control.hasError(k) ? (<any>this.errors)[k] : null)
        .filter(error => !!error);
    }
    return errorMessages.pop();
  }
}

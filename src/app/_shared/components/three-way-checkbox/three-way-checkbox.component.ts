import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

// Courtesty of CoPilot

@Component({
    selector: 'app-three-way-checkbox',
    templateUrl: './three-way-checkbox.component.html',
    styleUrls: ['./three-way-checkbox.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ThreeWayCheckboxComponent),
            multi: true
        }
    ],
    standalone: false
})
export class ThreeWayCheckboxComponent {
  @Input() value: number | null = null;
  @Output() valueChange = new EventEmitter<number | null>();

  private onChange: (value: number | null) => void;
  private onTouched: () => void;
  disabled = false;

  toggleValue(): void {
    if (this.value === null) {
      this.value = 0;
    } else if (this.value === 0) {
      this.value = 1;
    } else {
      this.value = null;
    }

    // if (this.value === 2179) {
    //   this.value = 2180;
    // } else if (this.value === 2180) {
    //   this.value = 2181;
    // } else if (this.value === 2181) {
    //   this.value = 2179;
    // }

    this.valueChange.emit(this.value);
    if (this.onChange) {
      this.onChange(this.value);
    }
  }

  writeValue(value: number | null): void {
    this.value = value;
  }

  registerOnChange(fn: (value: number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Handle the disabled state if needed
    this.disabled = isDisabled;
  }
}
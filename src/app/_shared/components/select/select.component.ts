import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

export interface List {
  id?: string,
  code?: string,
  name: string
}

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

  @Input() data: List[] = [];
  @Input() label: string = '';
  @Input() control!: FormControl | AbstractControl;

  _filtered_data: List[] | any[] = [];
  _data: List[] = [];
  _label: string = '';
  _control!: FormControl;

  ngOnChanges(changes: SimpleChanges): void {
     this._data = changes['data']?.currentValue ?? this.data;
     this._label = changes['label']?.currentValue ?? this.label;
     this._control = (changes['control']?.currentValue ?? this.control) as FormControl;
  }

  ngOnInit(): void {
     this._filtered_data = this._data;
  }

  find(query: string) {
     if (query)
        this._filtered_data = this.data.filter(
           (el: List ) =>
              this.normalize(query).test(el?.name ?? (el as any).toLowerCase()) ||
              this.normalize(query).test(el?.id ?? (el as any).toLowerCase()) ||
              this.normalize(query).test(el?.code ?? (el as any).toLowerCase())
        );
     else this._filtered_data = this.data;
  }

  select(event: any) {
     this._control.patchValue(event);
     console.log(this._control.parent?.value);
     
  }

  normalize(query: string) {
     return new RegExp(
        query
           .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
           .toLowerCase()
           .split('')
           .join('.*?'),
        'i'
     );
  }
}

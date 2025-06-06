import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-alert',
    template: `
    <swal
      title="{{
        type === 'success' ? 'Guardado correctamente' : 'Ha ocurrido un error'
      }}"
      text="{{
        type === 'error'
          ? 'Inténtalo de nuevo, si el error persiste contacta al soporte de la plataforma'
          : ''
      }}"
      confirmButtonText="Aceptar"
      [icon]="type"
      [swalVisible]="isShown"
      (didClose)="this.hideAlert(false)"
    >
    </swal>
  `,
    standalone: false
})
export class AlertComponent {
  @Input() type: 'success' | 'error' = 'success';
  @Input()  isShown: boolean = false;
 
  @Output() didClose = new EventEmitter<boolean>();

  hideAlert(value: boolean){
    this.didClose.emit(value);
  }
}

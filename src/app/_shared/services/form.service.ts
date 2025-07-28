import { Injectable, inject } from '@angular/core';
import {
   AbstractControl,
   FormArray,
   FormBuilder,
   FormControl,
   FormGroup,
} from '@angular/forms';
import { Method, ProviderService } from './provider.service';
import { firstValueFrom } from 'rxjs';
import { ConfirmationComponent } from '../components/confirmation/confirmation.component';
import { MasterService } from './master.service';
import { MatDialog } from '@angular/material/dialog';
/**
 * Servicio que proporciona funciones utilitarias para trabajar con formularios en Angular.
 *
 * @remarks
 * Este servicio forma parte de la plantilla realizada con Angular 17.
 *
 * @beta
 */
@Injectable({
   providedIn: 'root',
})
export class FormService {
   private _provider: ProviderService = inject(ProviderService);
   private _form_builder: FormBuilder = inject(FormBuilder);
   private _master: MasterService = inject(MasterService);
   private _dialog: MatDialog = inject(MatDialog)

   /**
    * Aplica valores a un formulario o control de formulario en función de los datos proporcionados.
    *
    * @param data - Los datos que se aplicarán al formulario o control de formulario.
    * @param form_group - El formulario o control de formulario al que se aplicarán los datos.
    * @returns Una promesa que se resuelve en `true` si la operación fue exitosa; de lo contrario, `false`.
    */
   async patch<T extends AbstractControl>(
      data: any,
      form: T
   ): Promise<boolean> {
      try {
         if (form instanceof FormControl) {
            form.patchValue(data);
         }

         else if (form instanceof FormGroup) {
            for (const key in data) {
               if (form.controls[key]) {
                  await this.patch(data[key], form.controls[key]);
               }
            }
         }

         else if (form instanceof FormArray) {
            form.clear();
            for (let i = 0; i < data.length; i++) {
               const itemData = data[i];

               let control: AbstractControl;

               if (typeof itemData === 'object' && !Array.isArray(itemData)) {
                  const fg = this._form_builder.group({});
                  for (const key in itemData) {
                     fg.addControl(key, new FormControl(null));
                  }
                  control = fg;
               } else if (Array.isArray(itemData)) {
                  control = this._form_builder.array([]);
               } else {
                  control = new FormControl(null);
               }

               form.push(control);
               await this.patch(itemData, control);
            }
         }

         return true;
      } catch (error) {
         console.error('Error in patch:', error);
         return false;
      }
   }


   /**
    * Devuelve el control de formulario proporcionado como FormGroup, FormControl o FormArray, según sea el caso.
    *
    * @param control - El control de formulario que se devolverá.
    * @returns El mismo control de formulario proporcionado.
    */
   control<T extends AbstractControl>(control: T): T {
      return control;
   }

   /**
    * Verifica si todos los valores en el formulario son nulos, 'null' o cadenas vacías.
    *
    * @param form - El formulario o conjunto de controles de formulario a verificar.
    * @returns `true` si todos los valores son nulos, 'null' o cadenas vacías; de lo contrario, `false`.
    */
   empty(form: any): boolean {
      return Object.values(form).every(
         (key: any) =>
            key == null ||
            key == 'null' ||
            (typeof key == 'string' && key.length == 0)
      );
   }

   /**
    * Obtiene el nombre del control de formulario dentro de su grupo padre.
    *
    * @param control - El control de formulario del cual se obtendrá el nombre.
    * @returns El nombre del control de formulario.
    */
   control_name(control: AbstractControl): string {
      let group = <FormGroup>control.parent;

      if (!group) {
         return '';
      }

      let name: string = '';

      Object.keys(group.controls).forEach((key) => {
         let child = group.get(key);

         if (child !== control) return;

         name = key;
      });

      return name;
   }

   async save(method: Method, route: string, params: any, button: string, form_id: string): Promise<boolean> {
      const _button = this._master.id(button);
      if (!_button) return false;

      let content = await _button.innerHTML
      this._master.spin_button(_button)
      try {

         let confirm = await this.confirm()

         if (!confirm) return this._master.snack('info', 'No se han realizado cambios.');

         let firstInvalidControl = this._master.id(form_id)?.getElementsByClassName('ng-invalid')[0];

         if (firstInvalidControl) {
            firstInvalidControl?.scrollIntoView({ behavior: 'smooth' });
            (firstInvalidControl as HTMLElement).focus();
            return this._master.snack('info', 'Revisa tu información e inténtalo de nuevo.')
         }

         const response = await this._provider.request(method, route, params);
         const success = response === 'querys_executed';

         return this._master.snack(success ? 'success' : 'error');
      } catch (error) {
         return this._master.snack('error');
      } finally {
         this._master.spin_button(_button, content)
      }
   }

   async delete(method: Method, route: string, params: any) {
      let confirm = await this.confirm()

      if (!confirm) return this._master.snack('info', 'No se han realizado cambios.');

      const response = await this._provider.request(method, route, params);
      const success = response === 'querys_executed';

      return this._master.snack(success ? 'success' : 'error');
   }

   async confirm(): Promise<boolean> {
      return await firstValueFrom(this._dialog.open(ConfirmationComponent).afterClosed())
   }
}

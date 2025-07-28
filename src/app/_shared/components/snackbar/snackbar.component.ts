import { Component, inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';

export declare type SnackTypes = 'success' | 'error' | 'info' | 'forbidden';

@Component({
   selector: 'app-snackbar',
   standalone: true,
   imports: [],
   templateUrl: './snackbar.component.html',
   styleUrls: ['./snackbar.component.css']
})
export class SnackBarChart {
   data: { type: SnackTypes; message: string[] } = inject(MAT_SNACK_BAR_DATA);

   /*    ES: 'Ha ocurrido un error.',
      ES: 'Proceso ejecutado con éxito.',
      ES: 'No tienes permiso para realizar esta acción.', */
   info = {
      success: {
         icon: this.sanitize(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#50f790" fill="none">
               <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" stroke-width="1.5" />
               <path d="M8 12.5L10.5 15L16 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>`),
         class: '!text-success !stroke-success',
         message: this.data.message ?? 'Proceso ejecutado con éxito.',
      },
      error: {
         icon: this.sanitize(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#f7c250" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" />
            <path d="M11.992 15H12.001" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M12 12L12 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
         </svg>`),
         class: '!text-advertence !stroke-advertence',
         message: this.data.message ?? 'Ha ocurrido un error.',
      },
      info: {
         icon: this.sanitize(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#5090f7" fill="none">
            <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="#000000" stroke-width="1.5"></path>
            <path d="M12.2422 17V12C12.2422 11.5286 12.2422 11.2929 12.0957 11.1464C11.9493 11 11.7136 11 11.2422 11" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M11.992 8H12.001" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
         </svg>`),
         class: '!text-info !stroke-info',
         message: this.data.message ?? 'Información.',
      },
      forbidden: {
         icon: this.sanitize(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="720" height="720" color="#ef4444" fill="none">
            <path d="M 15.23 13.57 C 17.417 13.57 19.19 11.797 19.19 9.61 C 19.19 7.423 17.417 5.65 15.23 5.65 C 13.043 5.65 11.27 7.423 11.27 9.61 C 11.27 10.1911 11.3951 10.7429 11.62 11.24 L 6.65 16.21 V 18.19 H 8.63 V 16.87 H 9.95 V 15.55 H 11.27 L 13.6 13.22 C 14.0971 13.4449 14.6489 13.57 15.23 13.57 Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M 16.55 8.29 L 15.89 8.95" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="#000000" stroke-width="1.5"></path>
         </svg>`),
         class: '!text-warn !stroke-warn',
         message: this.data.message ?? 'No tienes permiso para realizar esta acción.',
      },

   }

   constructor(private _sanitizer: DomSanitizer) {

   }
   ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.      
   }

   sanitize(text: string) {
      return this._sanitizer.bypassSecurityTrustHtml(text);
   }
}

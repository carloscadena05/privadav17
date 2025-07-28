import { Pipe, PipeTransform } from '@angular/core';
/* import * as marked from 'marked';
 */
@Pipe({
    name: 'marked', pure: false,
    standalone: false
})
export class MarkedPipe implements PipeTransform {
  transform(value: any): any {
    /* if (value && value.length > 0) {
      return marked(value, { breaks: true });
    } */
    return value;
  }
}

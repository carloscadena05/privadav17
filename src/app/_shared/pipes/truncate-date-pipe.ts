import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'truncateDate',
    standalone: false
})

export class TruncateDatePipe implements PipeTransform {
  transform(value: string): string {
    // console.log('TruncateDatePipe has value ' + value);
    const x =  (value !== undefined  && value !== null) ? value.indexOf ('T') : 0;
    value = (value === '1900-01-01T00:00:00') ? '' : value;
    // console.log('TruncateDatePipe has index of ' + x);
    return (x > 0) ?  value.substring(0, (x)) : '';
  }
}

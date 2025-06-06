import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'trimGuid',
    standalone: false
})

export class TrimGuidPipe implements PipeTransform {
  transform(value: string): string {
    return (value.length > 0) ?  value.substring(0, 8) : '';
  }
}

import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'alphaMonth',
    standalone: false
})

export class AlphaMonthPipe implements PipeTransform {

  months: string[] = [
    '', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  transform(value: string): string {
    // console.log('AlphaMonthPipe has value [' + value + '] length ' + value.length);
    return (value > '') ?  this.months[+value] : '[NO MONTH!]';
  }
}

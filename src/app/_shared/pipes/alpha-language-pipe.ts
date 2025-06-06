import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'alphaLanguage',
    standalone: false
})

export class AlphaLanguagePipe implements PipeTransform {
  result: string;

  transform(value: number): string {
    // console.log('AlphaLanguagePipe has value [' + value + ']');
    if (value === undefined) {
      this.result = 'not set';
    } else if (value === 2100) {
      this.result = 'English';
    } else if (value === 2101) {
      this.result = 'Spanish';
    } else {
      this.result = 'unkown';
    }
    return this.result;
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'remove',
  standalone: false
})
export class RemovePipe implements PipeTransform {
  transform(value: string, charToRemove: string): string {
    if (!value) return '';
    if (!charToRemove) return value;

    // Crear una expresión regular para eliminar todas las ocurrencias del carácter
    const regex = new RegExp(charToRemove, 'g');
    return value.replace(regex, ' ');
  }
}

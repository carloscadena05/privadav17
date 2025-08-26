import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SELECTITEM } from '../interfaces/SELECTITEM';

@Pipe({
  name: 'filter',
  standalone: false
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], query: string): any[] {
    if (!items) return [];
    if (!query) return items;

    query = query.toLowerCase();

    return items.filter(
      (el: SELECTITEM) =>
        this.normalize(query).test(el?.value ?? (el as any).toLowerCase()) ||
        this.normalize(query).test(el?.label ?? (el as any).toLowerCase())
    );

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

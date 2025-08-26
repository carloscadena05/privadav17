import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'orderstatus',
  standalone: false
})
export class OrderStatusPipe implements PipeTransform {
  transform(items: any[]): any[] {
    if (!items) return [];

    const order = ['NEEDS_REVIEW', 'ON_HOLD', 'READY_FOR_QR', 'COPIED_TO_QR'];

    return [...items].sort((a, b) => {
      return order.indexOf(a.reviewedStatus) - order.indexOf(b.reviewedStatus);
    });
  }
}




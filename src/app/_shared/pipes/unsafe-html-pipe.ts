import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
    name: 'unsafeHtml', pure: false,
    standalone: false
})
export class UnsafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {
  }

  transform(content) {
    // console.log('in unsafeHtml pipe');
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
}

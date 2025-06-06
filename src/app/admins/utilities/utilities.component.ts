import { Component } from '@angular/core';
import { UrlService } from 'src/app/_shared/services/url.service';

@Component({
    templateUrl: 'utilities.component.html',
    styleUrls: ['utilities.component.css'],
    standalone: false
})

export class UtilitiesComponent {
  staticUrlPrefix: string;

  constructor(
  private url: UrlService
  ) {


  this.staticUrlPrefix = url.getStaticFilePrefix();
  }

}

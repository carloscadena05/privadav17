import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { MemberState } from 'src/app/_store/member/member.state';
import { UrlService } from '../../services/url.service';

@Component({
    selector: 'app-member-photo',
    templateUrl: './member-photo.component.html',
    standalone: false
})
export class MemberPhotoComponent implements OnInit {
  fullPhotoPathname: string;
  photoPathname: string;
  clientUrl: string;
  subscription: Subscription;

   photoPathname$ = this.store.select<string>(MemberState.getPhotoPathname);

  constructor(urlService: UrlService,
    private store: Store
    ) {
    this.clientUrl = urlService.getClientUrl();
  }

  ngOnInit() {
    this.subscribeForPhotoPathname();
  }

  subscribeForPhotoPathname() {
    this.subscription = this.photoPathname$.subscribe((message) => {
      this.photoPathname = message;
      console.log('************NGXS: photoPathname received' + this.photoPathname);
      this.fullPhotoPathname = this.clientUrl + '/assets/images/StudentPhotos/' + this.photoPathname;
    });
  }
}

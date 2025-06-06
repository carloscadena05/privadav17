import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { StudentState } from 'src/app/_store/student/student.state';
import { UrlService } from '../../services/url.service';

@Component({
    selector: 'app-student-photo',
    templateUrl: './student-photo.component.html',
    standalone: false
})
export class StudentPhotoComponent implements OnInit {
  fullPhotoPathname: string;
  photoPathname: string;
  clientUrl: string;
  subscription: Subscription;

   photoPathname$ = this.store.select<string>(StudentState.getPhotoPathname);

  constructor(urlService: UrlService,
    private store: Store
    ) {
    console.log('hi from student-photo constructor');
    this.clientUrl = urlService.getClientUrl();

  }

  ngOnInit(): void {
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

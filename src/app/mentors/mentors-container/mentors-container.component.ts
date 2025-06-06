import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { SetQRComponentsEditable } from 'src/app/_store/ui/ui.action';
@Component({
    templateUrl: 'mentors-container.component.html',
    standalone: false
})
export class MentorsContainerComponent implements OnInit {
  constructor(private store: Store) {
    // nada
  }

  ngOnInit() {
    this.setQRComponentsEditible(false);
  }

  setQRComponentsEditible(qrComponentsEditable: boolean) {
    this.store.dispatch(new SetQRComponentsEditable(qrComponentsEditable));
  }
}

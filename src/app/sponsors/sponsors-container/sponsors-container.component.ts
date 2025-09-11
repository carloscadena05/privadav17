import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { constants } from 'src/app/_shared/constants/constants';
import { SELECTITEM } from 'src/app/_shared/interfaces/SELECTITEM';
import { SetQRComponentsEditable, SetSelectedQRPeriod } from 'src/app/_store/ui/ui.action';
import { UIState } from 'src/app/_store/ui/ui.state';

@Component({
    templateUrl: './sponsors-container.component.html',
    standalone: false
})
export class SponsorsContainerComponent implements OnInit {
  isLoading = false;
  readonly qrPeriods: SELECTITEM[] = constants.qrPeriods;
  studentGUId: string;
  studentGUIdReceived: boolean;
  selectedQRPeriod: string;
  private subscription: Subscription;

   selectedQRPeriod$ = this.store.select<string>(UIState.getSelectedQRPeriod);
twcss_activeTab = 'student';




  constructor(private store: Store) {}

  ngOnInit() {
    this.setQRComponentsEditible(false);
    this.subscribeForselectedQRPeriod();
  }

  subscribeForselectedQRPeriod() {
    this.subscription = this.selectedQRPeriod$.subscribe((message) => {
      this.selectedQRPeriod = message;
      console.log('************NGXS: SR new selectedQRPeriod received' + this.selectedQRPeriod);
    });
  }

  setSelectedQRPeriod(yearPeriod: string) {
    this.store.dispatch(new SetSelectedQRPeriod(yearPeriod));
  }
  setQRComponentsEditible(qrComponentsEditable: boolean) {
    this.store.dispatch(new SetQRComponentsEditable(qrComponentsEditable));
  }
  value_select(a: any, b: any): boolean {
return a == b;
}

}

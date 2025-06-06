import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { SetTestNamesVisibility } from 'src/app/_store/ui/ui.action';
import { UIState } from 'src/app/_store/ui/ui.state';

@Component({
    selector: 'app-test-names-visibility',
    templateUrl: './test-names-visibility.component.html',
    standalone: false
})
export class TestNamesVisibilityComponent implements OnInit {
  displayTestNames: boolean;
  strVisibility = 'Not Visible';

   currentState$ = this.store.select<boolean>(UIState.getTestNamesVisibility);

  constructor(private store: Store) {

  }

  ngOnInit(): void {
    this.currentState$.subscribe((flag) => {
      this.displayTestNames = flag;
    });
    this.strVisibility = this.displayTestNames ? 'Visible' : 'Not Visible';
  }

  toggleTestNamesVisibility() {
    console.log('toggle');
    this.displayTestNames = !this.displayTestNames;
    this.strVisibility = this.displayTestNames ? 'Visible' : 'Not Visible';
    this.store.dispatch(new SetTestNamesVisibility(this.displayTestNames));
  }
}

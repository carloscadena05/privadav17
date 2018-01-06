import { Directive, OnInit, EventEmitter, Output, OnDestroy, Input, HostListener } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ColumnSortService } from '../services/column-sort.service';

/*
http://www.carbonatethis.com/sort-table-columns-with-angular-and-typescript/
*/

@Directive({
  selector: '[appSortableTable]'
})

export class SortableTableDirective implements OnInit, OnDestroy {
  @Output()
  sorted = new EventEmitter();

  private columnSortedSubscription: Subscription;

  constructor(private sortService: ColumnSortService) {}

    ngOnInit() {
        console.log('sortable-table onInit');
        // subscribe to sort changes so we emit and event for this data table
        this.columnSortedSubscription = this.sortService.columnSorted$.subscribe(event => {
            this.sorted.emit(event);
        });
    }

    ngOnDestroy() {
        this.columnSortedSubscription.unsubscribe();
    }

}

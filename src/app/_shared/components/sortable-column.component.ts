import { Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { SORTCRITERIA } from '../interfaces/SORTCRITERIA';
import { ColumnSortService } from '../services/column-sort.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: '[app-sortable-column]',
  styles: [
    `
      .up-arrow:after {
        content: '^';
      }

      .down-arrow:after {
        content: 'v';
      }
    `
  ],
  template: `<span class="up-arrow" *ngIf="sortDirection === 'asc'"></span>
    <span class="down-arrow" *ngIf="sortDirection === 'desc'"></span>
    <ng-content></ng-content>`
})
export class SortableColumnComponent implements OnInit, OnDestroy {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('app-sortable-column')
  columnName: string;
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('sort-direction')
  sortDirection: string;

  @Output() onSortColumn: EventEmitter<SORTCRITERIA> = new EventEmitter<SORTCRITERIA>(); // creating an output event

  sortCriteria: SORTCRITERIA;
  private columnSortedSubscription: Subscription;

  constructor(private columnSortService: ColumnSortService) {
    this.sortCriteria = { sortColumn: '', sortDirection: '' };
  }

  @HostListener('click') headerClicked() {
    console.log('app-sortable-column has headerClick');
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    console.log('direction = ' + this.sortDirection);
    console.log('emitting sortColumnClick with columnName = ' + this.columnName);
    this.sortCriteria.sortColumn = this.columnName;
    this.sortCriteria.sortDirection = this.sortDirection;
    this.onSortColumn.emit(this.sortCriteria);
    this.columnSortService.columnSorted(this.sortCriteria);
  }

  ngOnInit() {
    // subscribe to sort changes so we can react when other columns are sorted
    this.columnSortedSubscription = this.columnSortService.columnSorted$.subscribe((event) => {
      // reset this column's sort direction to hide the sort icons
      console.log('have column sort subscribption event');
      if (this.columnName !== event.sortColumn) {
        this.sortDirection = '';
      }
    });
  }

  ngOnDestroy() {
    this.columnSortedSubscription.unsubscribe();
  }
}

import { Component, Input, OnChanges } from '@angular/core';
import { MentorReport2DataService } from 'src/app/_shared/data/mentor-report2-data.service';
import { MentorReportsStatusCount } from 'src/app/_shared/models/mentor-reports-status-count';

@Component({
    selector: 'app-mr-status-counts',
    templateUrl: './mr-status-counts.component.html',
    standalone: false
})
export class MentorReportsStatusCountsComponent implements OnChanges {
  @Input() year: string;
  @Input() month: string;
  statusCounts: MentorReportsStatusCount[];
  errorMessage: string;

  constructor(private mentorReportsData: MentorReport2DataService) {}

  public ngOnChanges() {
    console.log('ngOnChanges has fired, calling data service with ');
    console.log(this.year);
    console.log(this.month);
    if (+this.month > 0) {
      this.mentorReportsData.getMentorReportsStatusCounts(this.year, this.month).subscribe(
        (data) => {
          this.statusCounts = data;
          console.log('getStatusCounts returns: ');
          console.log(this.statusCounts);
        },
        (err) => console.error('Subscribe error: ' + err),
        () => {
          console.log('statusCounts loaded ' + this.statusCounts.length + ' rows');
        }
      );
    }
  }
}

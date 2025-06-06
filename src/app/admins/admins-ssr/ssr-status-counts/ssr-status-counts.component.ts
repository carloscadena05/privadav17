import { Component, Input, OnChanges } from '@angular/core';
import { StudentSelfReportDataService } from 'src/app/_shared/data/student-self-report-data.service';
import { StudentReportsStatusCount } from 'src/app/_shared/models/student-reports-status-count';

@Component({
    selector: 'app-ssr-status-counts',
    templateUrl: './ssr-status-counts.component.html',
    standalone: false
})
export class SSRStatusCountsComponent implements OnChanges {
  @Input() yearPeriod: string;
  statusCounts: StudentReportsStatusCount[];
  errorMessage: string;

  constructor(private ssrData: StudentSelfReportDataService) {}

  public ngOnChanges() {
    console.log('ngOnChanges has fired, calling data service with ');
    console.log(this.yearPeriod);
    if (this.yearPeriod > '') {
      this.ssrData.getStudentSelfReportsStatusCounts( this.yearPeriod).subscribe(  // mentorReportsData.getMentorReportsStatusCounts(this.year, this.month).subscribe(
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

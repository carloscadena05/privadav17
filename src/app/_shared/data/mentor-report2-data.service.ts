import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseDataService } from '../data/base-data.service';
import { MentorReportSubmittedCount } from '../models/mentor-report-submitted-count';
import { MentorReport2RPT } from '../models/mentor-report2';
import { MentorReportsStatusCount } from '../models/mentor-reports-status-count';
import { UrlService } from '../services/url.service';

@Injectable({ providedIn: 'root' })
export class MentorReport2DataService extends BaseDataService {
  // WebApiPrefix: string;

  constructor(public http: HttpClient, public webApiPrefixService: UrlService) {
    super(http, webApiPrefixService);
  }

  /// ///////////////////////////////////////////////
  ///  MentorReportsController
  /// ///////////////////////////////////////////////

  public getMentorReport2(mentorReportId: number): Observable<MentorReport2RPT> {
    const url = this.WebApiPrefix + 'mentor_reports2/' + mentorReportId;
    console.log('sending AuthHttp get request for MentorReport2 with ' + url);
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  public getMentorReport2RPTsViaGUID(studentGUId: string, mentorGUId: string): Observable<MentorReport2RPT[]> {
    let url = '';

    if (mentorGUId != null && mentorGUId > '') {
      url = this.WebApiPrefix + 'mentor_reports2/' + studentGUId + '/' + mentorGUId;
    } else {
      url = this.WebApiPrefix + 'mentor_reports2/' + studentGUId;
    }

    console.log('sending AuthHttp get request for MentorReports2 with ' + url);
    return this.http.get<MentorReport2RPT[]>(url).pipe(catchError(this.handleError));
  }

  public updateMentorReport2(mentorReport: MentorReport2RPT): Observable<MentorReport2RPT> {
    const url = this.WebApiPrefix + 'mentor_reports2'; // + mentorReport.mentorReportId ;
    let body = JSON.stringify({ mentorReport });
    // strip outer 'mentor' name
    const x = JSON.parse(body);
    body = JSON.stringify(x.mentorReport);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log('ready to put ' + url + ' body: ' + body + ' options ' + headers);
    return this.http.put(url, body, { headers: headers });
  }

  public addMentorReport2(mentorReport: MentorReport2RPT): Observable<MentorReport2RPT> {
    const url = this.WebApiPrefix + 'mentor_reports2';
    let body = JSON.stringify({ mentorReport });
    // strip outer 'mentor' name
    const x = JSON.parse(body);
    body = JSON.stringify(x.mentorReport);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log('ready to post ' + url + ' body: ' + body + ' options ' + headers);
    return this.http.post(url, body, { headers: headers });
  }

  public deleteMentorReport2(mentorReportId: number): Observable<MentorReport2RPT> {
    const url = this.WebApiPrefix + 'mentor_reports2/' + mentorReportId;
    console.log('ready to delete mentorReport ' + url);
    return this.http.delete(url);
  }

  public getMentorReportsByPeriod(
    year: string,
    period: string,
    reviewedStatusId: string,
    studentGUId: string
  ): Observable<MentorReport2RPT[]> {
    const url =
      this.WebApiPrefix +
      'mentor_reports/by_period' +
      '?year=' +
      year +
      '&period=' +
      period +
      '&reviewedStatusId=' +
      reviewedStatusId +
      '&studentGUId=' +
      studentGUId;
    console.log('sending AuthHttp get request for MentorReportsByPeriod with ' + url);
    return this.http.get<MentorReport2RPT[]>(url).pipe(catchError(this.handleError));
  }

  public getMentorReportsByMonth(
    year: string,
    month: string,
    reviewedStatusId: string
  ): Observable<MentorReport2RPT[]> {
    const url =
      this.WebApiPrefix +
      'mentor_reports2/by_month' +
      '?year=' +
      year +
      '&month=' +
      month +
      '&reviewedStatusId=' +
      reviewedStatusId;
    console.log('sending AuthHttp get request for MentorReportsByMonth with ' + url);
    this.http.get<MentorReport2RPT[]>(url).subscribe((data: any) => console.log(data)
    )
    return this.http.get<MentorReport2RPT[]>(url).pipe(catchError(this.handleError));
  }

  public getMentorReportsStatusCounts(year: string, month: string): Observable<MentorReportsStatusCount[]> {
    const url = this.WebApiPrefix + 'mentor_reports2/status_counts' + '?year=' + year + '&month=' + month;
    // + '&summaryStatusId=' + summaryStatusId
    // + '&highlightStatusId=' + highlightStatusId;
    console.log('sending AuthHttp get request for MentorReportsStatusCounts with ' + url);
    return this.http.get<MentorReportsStatusCount[]>(url).pipe(catchError(this.handleError));
  }

  public getMentorReportSubmittedCounts(): Observable<MentorReportSubmittedCount[]> {
    const url = this.WebApiPrefix + 'reports/mentor_report_submitted_counts';
    console.log('sending AuthHttp get request for MentorReportSubmittedCounts with ' + url);
    return this.http.get<MentorReportSubmittedCount[]>(url).pipe(catchError(this.handleError));
  }
}

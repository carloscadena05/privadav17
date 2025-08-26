import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MentorReportsStatusCount } from '../models/mentor-reports-status-count';
import { StudentReportsStatusCount } from '../models/student-reports-status-count';
import { StudentSelfReport } from '../models/student-self-report';
import { StudentMiniDTO } from '../models/studentMiniDTO';
import { UrlService } from '../services/url.service';
import { BaseDataService } from './base-data.service';

@Injectable({ providedIn: 'root' })
export class StudentSelfReportDataService extends BaseDataService {
  // WebApiPrefix: string;

  constructor(public http: HttpClient, public webApiPrefixService: UrlService) {
    super(http, webApiPrefixService);
  }

  /// ///////////////////////////////////////////////
  ///  StudentSelfReportsController
  /// ///////////////////////////////////////////////

  public getStudentSelfReportsStatusCounts( yearPeriod: string): Observable<MentorReportsStatusCount[]> {
    const year = yearPeriod.substr(0, 4);
    const period = yearPeriod.substr(5, 1);
    const url = this.WebApiPrefix + 'student_self_reports/status_counts' + '?year=' + year + '&period=' + period;
    console.log('sending AuthHttp get request for MentorReportsStatusCounts with ' + url);
    return this.http.get<StudentReportsStatusCount[]>(url).pipe(catchError(this.handleError));
  }

  public getStudentSelfReportsByGUId(studentGUId: string): Observable<StudentSelfReport[]> {
    const url = this.WebApiPrefix + 'student_self_reports/' + studentGUId;
    console.log('sending AuthHttp get request for StudentSelfReports with ' + url);
    return this.http.get<StudentSelfReport[]>(url).pipe(catchError(this.handleError));
  }

  public getStudentSelfReport(selfReportId: number): Observable<StudentSelfReport> {
    const url = this.WebApiPrefix + 'student_self_reports/' + selfReportId + '/0'; // '0' is dummy to avoid conflict with guid
    console.log('sending AuthHttp get request for StudentSelfReports with ' + url);
    return this.http.get<StudentSelfReport>(url).pipe(catchError(this.handleError));
  }

  public getStudentSelfReportsByPeriod(
    yearPeriod: string,
    reviewedStatusId: string,
    studentGUId: string
  ): Observable<StudentSelfReport[]> {
    const year = yearPeriod.substr(0, 4);
    const period = yearPeriod.substr(5, 1);
    const url =
      this.WebApiPrefix +
      'student_self_reports/by_period' +
      '?year=' +
      year +
      '&period=' +
      period +
      '&reviewedStatusId=' +
      reviewedStatusId // +
      // '&studentGUId=' +
      // studentGUId;
    console.log('sending AuthHttp get request for StudentSelfReportsByMonth with ' + url);
    console.log(this.http.get<StudentSelfReport[]>(url));
    
    return this.http.get<StudentSelfReport[]>(url).pipe(catchError(this.handleError));
  }

  public getMissingStudentSelfReportsByPeriod(yearPeriod: string): Observable<StudentMiniDTO[]> {
    const year = yearPeriod.substr(0, 4);
    const period = yearPeriod.substr(5, 1);
    const url = this.WebApiPrefix + 'student_self_reports/missing/by_period' + '?year=' + year + '&period=' + period;
    return this.http.get<StudentMiniDTO[]>(url).pipe(catchError(this.handleError));
  }

  public postStudentSelfReport(selfReport: StudentSelfReport): Observable<StudentSelfReport> {
    const url = this.WebApiPrefix + 'student_self_reports';
    console.log('in postSelfReport with url ' + url);
    let body = JSON.stringify({ selfReport });
    // strip outer 'mentor' name
    const x = JSON.parse(body);
    body = JSON.stringify(x.selfReport);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log('ready to post ' + url + ' body: ' + body + ' options ' + headers);
    return this.http.post(url, body, { headers: headers });
  }

  public putStudentSelfReport(selfReport: StudentSelfReport): Observable<StudentSelfReport> {
    const url = this.WebApiPrefix + 'student_self_reports';
    console.log('in putSelfReport with url ' + url);
    let body = JSON.stringify({ selfReport });
    // strip outer 'mentor' name
    const x = JSON.parse(body);
    body = JSON.stringify(x.selfReport);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log('ready to putt ' + url + ' body: ' + body + ' options ' + headers);
    return this.http.put(url, body, { headers: headers });
  }

  public deleteStudentSelfReport(studentSelfReportId: number): Observable<StudentSelfReport> {
    const url = this.WebApiPrefix + 'student_self_reports/' + studentSelfReportId;
    console.log('ready to delete studentSelfReport ' + url);
    return this.http.delete(url);
  }
}

import { formatDate } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, Renderer2 } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { Subscription } from "rxjs";
import { constants } from "src/app/_shared/constants/constants";
import { StudentDataService } from "src/app/_shared/data/student-data.service";
import { StudentSelfReportDataService } from "src/app/_shared/data/student-self-report-data.service";
import { SponsorGroup } from "src/app/_shared/models/sponsor-group";
import { SetSelectedStudentIdentifiers } from "src/app/_store/student/student.action";
import { StudentState } from "src/app/_store/student/student.state";
import { StudentSelfReport } from "../../_shared/models/student-self-report";
import { StudentDTO } from "../../_shared/models/studentDTO";
import { SessionService } from "../../_shared/services/session.service";
//import { StudentSelfReportDataService } from 'src/app/_shared/data/student-self-report-data.service';

@Component({
  templateUrl: "./students-self-reports.component.html",
  styleUrls: ["./students-self-reports.component.css", "../students.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentsSelfReportsComponent implements OnInit {
  isLoading: boolean;
  errorMessage: string;
  studentId: number;
  student: StudentDTO;
  studentSelfReports: Array<StudentSelfReport>;
  sponsorGroup: SponsorGroup;
  sponsorGroupName: string;
  sponsorGroupId: number | undefined;
  selectedQRPeriod = "";
  subscription: Subscription;
  // ssrEditDateRange = '';
  ssrEditDateStart = "";
  ssrEditDateStop = "";
  inProcessingPeriod = false;
  haveCurrentReport = false;
  firstMonthInNextQuarter = "--";
  studentGUId: string;

  currentStudentGUId$ = this.store.select<string>(StudentState.getSelectedStudentGUId);

  fechaEntregaInicio: Date;
  fechaEntregaFinal: Date;
  dateRangeCache: { [key: string]: boolean } = {};

  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    public studentData: StudentDataService,
    public studentSelfReportData: StudentSelfReportDataService,
    public session: SessionService,
    public store: Store,
    public ssrData: StudentSelfReportDataService,
    public renderer2: Renderer2,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.studentGUId = this.session.getStudentRecordGUId();
    //console.log('studentSelfReport ngOnInit, studentGUID = ' + this.studentGUId);
    this.parseSSRDateRange();
    // fetch
    this.fetchSelfReports();
  }

  trackById(index: number, item: any): number {
    return item.studentSelfReportId;
  }

  getMonthStrings(strToday: string) {
    let month = strToday.substring(4, 6);
    //console.log('month ' + month)
    switch (month) {
      case "01":
      case "02":
      case "03":
        this.firstMonthInNextQuarter = "febrero";
        break;
      case "04":
      case "05":
      case "06":
        this.firstMonthInNextQuarter = "julio";
        break;
      case "07":
      case "08":
      case "09":
        this.firstMonthInNextQuarter = "octubre";
        break;
      case "10":
      case "11":
      case "12":
        this.firstMonthInNextQuarter = "enero";
        break;
    }
  }

  // subscribeForStudentGUId() {
  //   this.studentGUId = 'unset';
  //   this.subscription = this.currentStudentGUId$.subscribe((message) => {
  //     this.studentGUId= message;
  //     console.log('************NGXS: admins-student-qrs new StudentGUID received' + this.studentGUId);
  //     // this.fetchSponsorGroup();
  //     this.isLoading = true;
  //     this.parseSSRDateRange();
  //     this.fetchSelfReports();

  //   });
  // }

  // possible TODO: get full text only for each report and truncate here
  // OR fetch truncated text and full text in one pass
  fetchSelfReports() {
    // this returns truncated text and full text for all reports for a student
    this.studentSelfReportData.getStudentSelfReportsByGUId(this.studentGUId).subscribe(
      (data) => {
        console.log("got student self reports");
        console.log(data);
        this.studentSelfReports = data;
        this.setReportShortToReportShown(); // display the short version
        this.setReportFulltext(); // separate call to get full text
        this.setEllipsisLink();
      },
      (err) => console.error("Subscribe error: " + err),
      () => {
        //console.log('done: ');
        this.isLoading = false;
        this.changeDetector.markForCheck(); // Manually trigger change detection
      }
    );
  }

  selfReportEdit(id: number, studentGUId: string, studentName: string) {
    this.store.dispatch(new SetSelectedStudentIdentifiers({ studentGUId, studentName }));

    //console.log('datos para editar', id, studentGUId, studentName);
    const link = "/students/self-reports-edit/" + id;
    //console.log('navigating to ' + link);
    this.router.navigateByUrl(link);
  }

  studentSelfReportAdd() {
    let sponsorGroupId = 1168; // dummy value until code is eliminated
    const link = [
      "/students/self-reports-add",
      {
        sponsorGroupId: sponsorGroupId,
        studentGUId: this.studentGUId,
      },
    ];
    //console.log('navigating to ' + JSON.stringify(link));
    this.router.navigate(link);
  }


  parseSSRDateRange() {
    //console.log('in parseSSRDateRange');

    var strToday = formatDate(new Date(), "yyyyMMdd", "en-us");
    //console.log('today literal ' + strToday);

    this.setInProcessingPeriod(strToday);
    this.getMonthStrings(strToday);
  }

  // should be in a two functions
  setInProcessingPeriod(strToday: string) {
    console.log("constants has " + constants.ssrDateRange);
    this.ssrEditDateStart = constants.ssrDateRange.substring(0, 8);
    console.log("Start literal " + this.ssrEditDateStart);
    this.ssrEditDateStop = constants.ssrDateRange.substring(9);
    console.log("stop literal " + this.ssrEditDateStop);
    console.log("month " + constants.ssrDateRange.substring(4, 6));
    console.log("strToday " + strToday);

    if (strToday >= this.ssrEditDateStart && strToday <= this.ssrEditDateStop) {
      console.log("in report recording period");
      this.inProcessingPeriod = true;
    } else {
      console.log("NOT in report recording period");
      this.inProcessingPeriod = false;
    }
    console.log(">>>>>>ssr setup calc inPP " + "inReportProcessingPeriod = " + this.inProcessingPeriod);
  }

  thisReportDateIsInDateRange(rptDate: string) {

    // console.log("indexed rptDate: " + rptDate);
    rptDate = rptDate.substr(0, 4) + rptDate.substr(5, 2) + rptDate.substr(8, 2);
    // console.log('rptDate: ' + rptDate);
    // console.log('rptDate2: ' + this.dateRangeCache[rptDate]);
    // if (this.dateRangeCache[rptDate] === undefined) {
      console.log("~~~~~~~~~~~~~~~~~check if in date range~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
      // console.log("indexed rptDate: " + rptDate);
      // rptDate = rptDate.substr(0, 4) + rptDate.substr(5, 2) + rptDate.substr(8, 2);
      // console.log("reformatted rptDate: " + rptDate);
      // console.log("ssrEditDateStart: " + this.ssrEditDateStart);
      // console.log("ssrEditDateStop: " + this.ssrEditDateStop);
      // console.log("indexed rptDate > startDate and <= EndDate =");
      console.log(rptDate >= this.ssrEditDateStart && rptDate <= this.ssrEditDateStop);

      this.haveCurrentReport = rptDate >= this.ssrEditDateStart && rptDate <= this.ssrEditDateStop;

      return (this.haveCurrentReport);
      // this.dateRangeCache[rptDate] = rptDate >= this.ssrEditDateStart && rptDate <= this.ssrEditDateStop;
      // console.log('rptDate3: ' + this.dateRangeCache[rptDate]);
      // return this.dateRangeCache[rptDate];
    // }
  }

  ngAfterContentChecked(): void {
    // this.changeDetector.detectChanges();
  }

  readMore(position: number) {
    if (this.studentSelfReports[position]["link"] == "Leer más &#62;") {
      //display the full-length version
      this.studentSelfReports[position]["reportShown"] = this.studentSelfReports[position]["reportFulltext"];
      this.studentSelfReports[position]["link"] = "Leer menos &#708;";
      this.studentSelfReports[position]["ellipsis"] = "";
    } else {
      //cambiamos el valor del reportShown por el recumen del reporte
      // display the short version
      this.studentSelfReports[position]["reportShown"] = this.studentSelfReports[position]["reportShort"];
      this.studentSelfReports[position]["link"] = "Leer más &#62;";
      this.studentSelfReports[position]["ellipsis"] = " ...";
    }
  }
  // for initial load using truncated narrative_Spanish
  setReportShortToReportShown() {
    this.studentSelfReports.forEach((report) => {
      report["reportShort"] = report.narrative_Spanish; // store it
      report["reportShown"] = report.narrative_Spanish; // display it
    });
  }

  // fetch and store full text report load (do not display until leer mas)
  // (maybe change this to load on demand for a single report)
  setReportFulltext() {
    this.studentSelfReports.forEach((report) => {
      // full text
      this.ssrData.getStudentSelfReport(report.studentSelfReportId).subscribe(
        (data) => {
          //console.log(data)
          report["reportFulltext"] = data.narrative_Spanish;
          this.changeDetector.markForCheck();
        },
        (err) => console.error("Subscribe error: " + err)
      );
    });
  }
  setEllipsisLink() {
    this.studentSelfReports.forEach((report) => {
      report["link"] = "Leer más &#62;";
      report["ellipsis"] = "...";
    });
  }
}

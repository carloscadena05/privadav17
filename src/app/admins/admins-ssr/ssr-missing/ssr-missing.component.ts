import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { constants } from 'src/app/_shared/constants/constants';
import { StudentSelfReportDataService } from 'src/app/_shared/data/student-self-report-data.service';
import { SELECTITEM } from 'src/app/_shared/interfaces/SELECTITEM';
import { StudentMiniDTO } from 'src/app/_shared/models/studentMiniDTO';
import { StudentState } from 'src/app/_store/student/student.state';
import { SetSelectedQRPeriod } from 'src/app/_store/ui/ui.action';
import { UIState } from 'src/app/_store/ui/ui.state';

@Component({
  selector: 'app-ssr-missing',
  templateUrl: 'ssr-missing.component.html',
  styleUrls: ['ssr-missing.component.scss'],
  standalone: false
})
export class SSRMissingComponent implements OnInit {
  isLoading = false;
  errorMessage: string;
  successMessage: string;
  selectedQRPeriod = '';
  readonly qrPeriods: SELECTITEM[] = constants.qrPeriods;
  readonly reviewedStatuses: SELECTITEM[] = constants.reviewedQRStatuses;
  subscription: Subscription;
  studentMinis: StudentMiniDTO[];

  currentGUId$ = this.store.select<string>(StudentState.getSelectedStudentGUId);
  selectedQRPeriod$ = this.store.select<string>(UIState.getSelectedQRPeriod);

  displayedColumns = ['studentName', 'email', 'yearJoinedJA']
  dataSource: MatTableDataSource<StudentMiniDTO>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  filters = {}
  student_years: number[];

  constructor(
    public router: Router,
    public ssrData: StudentSelfReportDataService,
    private route: ActivatedRoute,
    private store: Store
  ) { }

  ngOnInit() {
    this.subscribeForselectedQRPeriod();
  }

  subscribeForselectedQRPeriod() {
    this.subscription = this.selectedQRPeriod$.subscribe((message) => {
      this.selectedQRPeriod = message;
      console.log('************NGXS: SSR Tracking new selectedQRPeriod received' + this.selectedQRPeriod);
      this.fetchFilteredData();
    });
  }

  fetchFilteredData() {
    this.isLoading = true;
    console.log('in fetchData for missingStudentReportsByPeriod');
    this.ssrData.getMissingStudentSelfReportsByPeriod(this.selectedQRPeriod).subscribe(
      (data) => {
        console.log('missing studentReportByPeriod has');
        this.studentMinis = data;
        this.student_years = [...new Set(data.map((objeto) => objeto.yearJoinedJA))].sort((a, b) => b - a)
        console.log(this.studentMinis);
        this.dataSource = new MatTableDataSource(this.studentMinis);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 100);
      },
      (err) => console.error('Subscribe error: ' + err),
      () => {
        console.log('data loaded now set timeout for scroll');
        setTimeout(() => {
          this.scrollIntoView();
        }, 0);
        this.isLoading = false;
      }
    );
  }

  scrollIntoView() {
    console.log('in scrollIntoView');
    if (this.route.snapshot.queryParams['id']) {
      console.log(this.route.snapshot.queryParams['id']);
      const idSelector = '#' + this.route.snapshot.queryParams['id'];
      console.log('id param = ' + this.route.snapshot.queryParams['id']);
      const element = document.querySelector(idSelector);
      if (element) {
        console.log('querySelector returns element ' + element);
        element.scrollIntoView(true);
      }
    }
  }

  gotoStudent(guid: string, studentName: string) {
    console.log(studentName);
    const link = ['admins/students/student-container', { guid: guid }];

    console.log('navigating to ' + link);
    this.router.navigate(link);
  }

  setSelectedQRPeriod(yearPeriod: string) {
    this.store.dispatch(new SetSelectedQRPeriod(yearPeriod));
    // this.fetchFilteredData();
  }

  // En tu componente.ts
applyFilter(filterValue: string) {
  this.currentTextFilter = filterValue.trim().toLowerCase();
  this.applyCombinedFilter();
}

apply_filter(filterObject: any) {
  // Actualiza los filtros por campo
  this.filters = { ...this.filters, ...filterObject };
  
  // Elimina filtros con valor 'true' (que viene del option "All")
  Object.keys(this.filters).forEach(key => {
    if (this.filters[key] === true) {
      delete this.filters[key];
    }
  });

  this.applyCombinedFilter();
}

private applyCombinedFilter() {
  this.dataSource.filterPredicate = (data: any) => {
    // Aplica filtro de texto a TODOS los campos string dinámicamente
    if (this.currentTextFilter) {
      const textMatches = Object.keys(data).some(key => {
        // Solo busca en campos que sean strings
        return typeof data[key] === 'string' && 
               data[key].toLowerCase().includes(this.currentTextFilter);
      });
      
      if (!textMatches) return false;
    }

    // Aplica filtros específicos por campo
    for (const key in this.filters) {
      if (data[key] != this.filters[key]) {
        return false;
      }
    }

    return true;
  };

  // Disparar el filtrado
  this.dataSource.filter = {
    textFilter: this.currentTextFilter,
    fieldFilters: this.filters
  } as any; // Usamos 'as any' porque filter espera string pero nosotros usamos objeto
}

// Añade esta propiedad a tu clase
currentTextFilter: string = '';
}

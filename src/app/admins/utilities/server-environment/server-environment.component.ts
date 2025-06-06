import { Component, OnInit } from '@angular/core';
import { UtilitiesDataService } from 'src/app/_shared/data/utilities-data.service';
import { ServerEnvironment } from 'src/app/_shared/models/server-environment';

@Component({
    selector: 'app-server-environment',
    templateUrl: './server-environment.component.html',
    standalone: false
})
export class ServerEnvironmentComponent implements OnInit {
  env: ServerEnvironment;
  isLoading: boolean;
  errorMessage: string;
  successMessage: string;

  constructor(public sqlReports: UtilitiesDataService) {
    console.log('hi from server-environment constructor');
  }

  ngOnInit() {
    this.env = new ServerEnvironment('zz', 'xx', 'yy');
    this.fetchData();
  }

  fetchData() {
    console.log('fetchData for ServerEnvironment');
    this.isLoading = true;
    this.sqlReports.getServerEnvironment().subscribe(
      (data) => {
        this.env = data;
        console.log(this.env);
        console.log(this.env.databaseServerName);
        console.log(this.env.databaseName);
        console.log(this.env.webApiServerName);
      },
      (err) => {
        this.errorMessage = err;
      },
      () => {
        console.log('done');
        this.isLoading = false;
      }
    );
  }
}

import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UrlService } from 'src/app/_shared/services/url.service';

@Component({
    templateUrl: 'utilities.component.html',
    styleUrls: ['utilities.component.scss'],
    standalone: false
})

export class UtilitiesComponent {
  staticUrlPrefix: string;

  displayedColumns: string[] = ['title', 'description'];
  displayedColumnsAccounts: string[] = ['name', 'user', 'password'];

  resources = [
    {
      title: 'Mentor Handbook',
      description: 'Latest Offical Mentor Handbook'
    }
  ]

  accounts = [
    {
      name: '_Test, _Admin',
      user: 'admin@test.test',
      password: '_TestEmail2'
    },
    {
      name: '_Test, _Mentor',
      user: 'mentor@test.test',
      password: '_TestEmail2'
    },
    {
      name: '_Test, _Sponsor',
      user: 'sponsor@test.test',
      password: '_TestEmail2'
    },
    {
      name: '_Test, _Student_Semestre',
      user: 'student@test.test',
      password: '_TestEmail2'
    },
    {
      name: '_Test, _Student_Cuatrimestre',
      user: 'studentC@test.test',
      password: '_TestEmail2'
    },
  ]

  accounts_data_source = new MatTableDataSource(this.accounts);
  resources_data_source = new MatTableDataSource(this.accounts);

  constructor(
  private url: UrlService
  ) {


  this.staticUrlPrefix = url.getStaticFilePrefix();
  }

}

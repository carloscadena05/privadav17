import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { TituloDataService } from '../../_shared/data/titulo-data.service';
import { TitulosIssuedDTO } from '../../_shared/models/titulos-issuedDTO';
import { SessionService } from '../../_shared/services/session.service';

@Component({
    templateUrl: './titulos-entry.component.html',
    standalone: false
})
export class TitulosEntryComponent implements OnInit {
  myForm: UntypedFormGroup;
  titulosData: TitulosIssuedDTO[];
  entry: TitulosIssuedDTO;
  isLoading: boolean;
  errorMessage: string;
  successMessage: string;
  studentGUId: string;
  gradYear: number;
  // tituloId: number;
  private subscription: Subscription;
  studentName: string;
  confirmedDateB: boolean;


  //  currentGUId$ = this.store.select<string>(StudentState.getSelectedStudentGUId);
  //  currentName$ = this.store.select<string>(StudentState.getSelectedStudentName);

  constructor(
    public tituloData: TituloDataService,
    public router: Router,
    private currRoute: ActivatedRoute,
    private session: SessionService,
    public location: Location,
    private store: Store,

  ) {
    this.isLoading = false;
  }


  ngOnInit() {
    this.studentGUId = this.currRoute.snapshot.params['studentGUId'];
    this.gradYear = this.currRoute.snapshot.params['gradYear'];
    console.log('&&&&&tituloUpload ngOnInit, studentGUID = ' + this.studentGUId, ' gradYear = ' + this.gradYear);
  }


}

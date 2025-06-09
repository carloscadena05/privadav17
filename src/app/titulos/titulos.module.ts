import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
/* import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
 */import { AppSharedModule } from 'src/app/_shared/_shared.module';
import { TitulosEntryComponent } from './titulos-entry/titulos-entry.component';
import { TitulosHomeComponent } from './titulos-home/titulos-home.component';
import { TitulosListComponent } from './titulos-list/titulos-list.component';
import { TitulosNavbarComponent } from './titulos-navbar/titulos-navbar.component';
import { TitulosRoutingModule } from './titulos-routing.module';
import { TitulosComponent } from './titulos.component';

@NgModule({
  declarations: [
    TitulosNavbarComponent,
    TitulosComponent,
    TitulosListComponent,
    TitulosHomeComponent,
    TitulosEntryComponent
  ],
  imports: [CommonModule, AppSharedModule, TitulosRoutingModule/* , NgbModule */]
})
export class TitulosModule {}

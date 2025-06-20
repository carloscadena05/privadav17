import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
/* import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
 */import { StudentHeaderQuarterlyComponent } from '../quarterly/student-header-quarterly/student-header-quarterly.component';
import { AppSharedModule } from '../_shared/_shared.module';
import { JaCommentsComponent } from './ja-comments/ja-comments.component';
import { MrConsolidatedComponent } from './mr-consolidated/mr-consolidated.component';
import { PrivateNotesComponent } from './private-notes/private-notes.component';
import { QuarterlyContainerComponent } from './quarterly-container/quarterly-container.component';
import { QuarterlyListComponent } from './quarterly-list/quarterly-list.component';
import { QuarterlyNavbarComponent } from './quarterly-navbar/quarterly-navbar.component';
import { QuarterlyRoutingModule } from './quarterly-routing.module';
import { QuarterlyComponent } from './quarterly.component';
import { SelfReportsComponent } from './self-reports/self-reports.component';

@NgModule({
  declarations: [
    QuarterlyComponent,
    QuarterlyContainerComponent,
    QuarterlyNavbarComponent,
    JaCommentsComponent,
    MrConsolidatedComponent,
    SelfReportsComponent,
    QuarterlyListComponent,
    PrivateNotesComponent,
    StudentHeaderQuarterlyComponent,
  ],
  imports: [
    CommonModule,
    AppSharedModule,

    QuarterlyRoutingModule,
/*     NgbModule
 */  ],

  exports: [
    JaCommentsComponent,
    MrConsolidatedComponent,
    SelfReportsComponent
  ]
})
export class QuarterlyModule { }

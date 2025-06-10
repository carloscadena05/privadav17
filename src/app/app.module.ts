import { APP_BASE_HREF, Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, inject, provideAppInitializer } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { NgxFileDropModule } from 'ngx-file-drop';
import { environment } from 'src/environments/environment';
import { ConstantsService } from './_shared/services/constantsService';
import { HeaderbarComponent } from './app-navbar/headerbar.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// every module that has a routing component no longer needs to be imported here
import { AppSharedModule } from './_shared/_shared.module';
import { MemberState } from './_store/member/member.state';
import { StudentState } from './_store/student/student.state';
import { UIState } from './_store/ui/ui.state';
// import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';



export function appInit(constantsService: ConstantsService) {
  return () => constantsService.loadFromDB();
}

@NgModule({
  declarations: [
    AppComponent, HeaderbarComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'always' }),
/*     HttpClientModule,
 */    AppRoutingModule,
    NgxFileDropModule,
    NgxsModule.forRoot([StudentState, MemberState, UIState], { developmentMode: !environment.production }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    AppSharedModule.forRoot(),
    // SweetAlert2Module.forRoot()
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule
  ],

  exports: [ReactiveFormsModule, HttpClientModule, AppRoutingModule],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '/'
    },
    provideAppInitializer(() => {
      const initializerFn = (appInit)(inject(ConstantsService));
      return initializerFn();
    }),
    Location
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

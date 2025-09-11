import { Component } from '@angular/core';
import { AuthService } from './_shared/services/auth.service';
import { SessionService } from './_shared/services/session.service';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * This class represents the main application component. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components (BecasHomeComponent, AboutComponent).
 */
@Component({
    selector: 'app-ja',
    templateUrl: 'app.component.html',
    standalone: false
})
export class AppComponent {
  year = new Date().getFullYear();

  constructor(public auth: AuthService, public session: SessionService, public router: Router, public aroute: ActivatedRoute) {
    console.log('AppComponentConstructor, calling localAuthSetup');
    auth.localAuthSetup();
   console.log(router.url);
   console.log(aroute.url);
   
   
    
  }
}

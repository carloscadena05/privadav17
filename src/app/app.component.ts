import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './_shared/services/auth.service';
import { SessionService } from './_shared/services/session.service';

/**
 * This class represents the main application component. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components (BecasHomeComponent, AboutComponent).
 */
@Component({
	selector: 'app-ja',
	templateUrl: 'app.component.html'
})
export class AppComponent {
	constructor(private auth: AuthService, session: SessionService, router: Router) {
		console.log('AppComponentConstructor, calling localAuthSetup');
		auth.localAuthSetup();
	}
}

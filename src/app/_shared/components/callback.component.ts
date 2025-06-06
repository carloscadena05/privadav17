import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
    template: 'Callback Component Page',
    selector: 'app-callback',
    standalone: false
})
export class CallbackComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.handleAuthCallback();
  }
}

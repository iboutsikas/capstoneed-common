import { Component } from '@angular/core';
import { Router } from '@angular/router';

import '../../style/app.scss';

@Component({
  selector: 'ced-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  loggedIn: boolean;

  constructor(private router: Router) {
    this.loggedIn = false;
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import '../../style/app.scss';
import { AuthenticationService } from '../../shared/Services/authenticationService';

@Component({
  selector: 'ced-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private authenticationService: AuthenticationService) {
  }
}

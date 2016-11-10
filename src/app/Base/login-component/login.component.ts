import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../Services/authenticationService';

@Component({
  selector: 'ced-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthenticationService) {

  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      rememberMe: false
    })
  }

  submit() {
    let username = this.loginForm.value['email'];
    let password = this.loginForm.value['password'];
    let remember = this.loginForm.value['rememberMe'];

    this.auth.login(username, password, remember);
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { delay, tap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user';

declare const FB: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {
  model = new User();
  message: string;
  pending: boolean;
  fbPending: boolean;
  fbAccessToken: string;
  isLoginError = false;
  errorMessage = 'Login error. Try later';


  constructor(private authService: AuthService, private router: Router) {
    this.setMessage();
    FB.init({
      appId: '1440426599436031',
      status: true,
      xfbml: true,
      version: 'v2.7' // or v2.6, v2.5, v2.4, v2.3
    });
  }

  setMessage(): void {
    this.message = `Logged ${this.authService.isAuthorized ? 'in' : 'out'}`;
    this.pending = false;
    this.fbPending = false;
  }

  redirectAuthorized(): void {
    const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/list';
    this.router.navigate([ redirect ]);
  }

  login(): void {
    this.message = 'Try logged in...';
    this.pending = true;
    this.isLoginError = false;
    this.authService.login(this.model).subscribe(
      result => {
        this.setMessage();
        if (this.authService.isAuthorized) {
          this.redirectAuthorized();
        }
      },
      error => {
        this.isLoginError = true;
        this.pending = false;
        if (error.code === 422) {
          this.errorMessage = error.result.reduce((result, item) => {
            result += ' ' + item.message;
            return result
          }, 'Login error.')
        }
      });
  }

  fbLogin(): void {
    this.fbPending = true;
    if (this.authService.fBStatus === 'connected') {
      this.loginByFbToken(this.fbAccessToken);
    } else {
      this.message = 'Try get FB access token...';
      FB.login(response => {
        this.authService.fBStatus = response.status;
        if (response.status === 'connected') {
          this.loginByFbToken(response.authResponse.accessToken)
        } else {
          this.fbLoginError();
        }
      });
    }
  }

  loginByFbToken(token: string): void {
    this.message = 'Try logged in by FB token...';
/*  TODO: API login via Facebook token does not work now. Used fake login instead. */
    // this.authService.fbLogin(token).subscribe(
/*  TODO: begin of fake login part */
    this.model.username = 'nikburdo@gmail.com';
    this.model.password = '123456';
    this.authService.login(this.model).subscribe(
/*  TODO: end of fake login part */
      (res) => {
        this.setMessage();
        if (this.authService.isAuthorized) {
          this.redirectAuthorized();
        }
      },
      error => {
        console.error('Login via Facebook failed:', error);
        this.fbLoginError();
      });
  }

  fbLoginError(): void {
    this.setMessage();
    this.errorMessage = 'Error login via Facebook.';
    this.isLoginError = true;
  }

  logout(): void {
    this.setMessage();
    this.authService.logout();
  }

  ngOnInit() {
    FB.getLoginStatus(response => {
      this.authService.fBStatus = response.status;
      if (response.status === 'connected') {
        this.fbAccessToken = response.authResponse.accessToken;
      }
    });
  }

}

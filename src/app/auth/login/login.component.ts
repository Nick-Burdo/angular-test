import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {delay, tap} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';
import {Observable} from 'rxjs/internal/Observable';
import {HttpClient} from '@angular/common/http';

declare const FB: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  message: string;
  pending: boolean;

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
  }

  redirectAuthorized(): void {
    const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/list';
    this.router.navigate([redirect]);
  }

  login(): void {
    this.message = 'Try logged in...';
    this.pending = true;
    this.authService.login().subscribe(() => {
      this.setMessage();
      if (this.authService.isAuthorized) {
        this.redirectAuthorized();
      }
    });
  }

  fbLogin(): void {
    this.message = 'Try logged in...';
    this.pending = true;
    FB.login(response => {
      console.log('LOGIN:', response);
      if (response.status === 'connected') {

        console.log('ACCESS DATA', response.authResponse);

        this.authService.fbLogin(response.authResponse.accessToken).subscribe((res) => {
          console.log('API FB LOGIN RESULT', res);
        });
      } else {
        this.setMessage();
      }
      // this.authService.setAuthorized(true);
      this.authService.setFBStatus(response.status);
      // this.redirectAuthorized();
    });
  }

  logout(): void {
    this.setMessage();
    this.authService.logout();
  }

  ngOnInit() {
    FB.getLoginStatus(response => {
      if (response.status === 'connected') {
        this.authService.setAuthorized(true);
        this.redirectAuthorized();
      }
      this.authService.setFBStatus(response.status);

      console.log('STATUS ON INIT:', response);

    });
  }

}

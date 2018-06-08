import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {
  message: string;
  pending: boolean;

  constructor(private authService: AuthService, private router: Router) {
    this.setMessage();
  }

  setMessage(): void {
    this.message = `Logged ${this.authService.isAuthorized ? 'in' : 'out'}`;
    this.pending = false
  }

  login(): void {
    this.message = 'Try logged in...';
    this.pending = true;
    this.authService.login().subscribe(() => {
      this.setMessage();
      if (this.authService.isAuthorized) {
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/list';
        this.router.navigate([ redirect ]);
      }
    });
  }

  logout(): void {
    this.setMessage();
    this.authService.logout();
  }

  ngOnInit() {
  }

}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../config';
import { TokenService } from './token.service';
import { Profile } from '../models/profile';

declare const FB: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthorized: boolean = false;
  redirectUrl: string;
  fBStatus: string;

  constructor(private router: Router, private http: HttpClient, private tokenService: TokenService) {
    const token = this.tokenService.getToken();
    if (token.token && token.expired_at > Date.now() / 1000) {
      this.isAuthorized = true;
    }
  }

  login(model: Profile): Observable<any> {
    return this.http.post(`${API_URL}/user/login`, model).pipe(
      tap(result => {
        this.isAuthorized = true;
        this.tokenService.setToken(result);
      })
    );
  }

  fbLogin(code: string): Observable<any> {
    return this.http.post(`${API_URL}/user/login/facebook`, {code}).pipe(
      tap(result => {
        this.isAuthorized = true;
        this.tokenService.setToken(result);
      })
    );
  }

  setAuthorized(state: boolean): void {
    this.isAuthorized = state;
  }

  setLogout(): void {
    this.isAuthorized = false;
    this.tokenService.setToken(null);
    this.router.navigate([ '/login' ]);
  }

  logout(): void {
    if (this.fBStatus === 'connected') {
      FB.logout(response => {
        this.setLogout();
      });
    } else {
      this.setLogout();
    }
  }
}

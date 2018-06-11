import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../config';
import { handleHttpError } from './handle-http-error';
import { User } from '../models/user';
import { Token } from '../models/token';

declare const FB: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthorized: boolean = false;
  token: string;
  redirectUrl: string;
  FBStatus: string;

  constructor(private router: Router, private http: HttpClient) {
    const tokenStorage = localStorage.getItem('token');
    if (tokenStorage) {
      const token = JSON.parse(tokenStorage);
      if (token.token && token.expired_at > Date.now() / 1000) {
        this.isAuthorized = true;
        this.token = token.token;
      }
    }
   }

  login(model: User): Observable<any> {
    return this.http.post(`${API_URL}/user/login`, model).pipe(
      tap(result => {
        this.isAuthorized = true;
        this.setToken(result);
      })
    );
  }

  fbLogin(code: string): Observable<any> {
    return this.http.post(`${API_URL}/user/login/facebook`, {code}).pipe(
      catchError(handleHttpError('Post User Login Facebook'))
    );
  }

  setToken(data: Token): void {
    if (data && data.token) {
      localStorage.setItem('token', JSON.stringify(data));
      this.token = data.token;
    } else {
      localStorage.removeItem('token');
      this.token = null;
    }
  }

  setAuthorized(state: boolean): void {
    this.isAuthorized = state;
  }

  setFBStatus(status: string): void {
    this.FBStatus = status;
  }

  setLogout(): void {
    this.isAuthorized = false;
    this.setToken(null);
    this.router.navigate([ '/login' ]);
  }

  logout(): void {
    if (this.FBStatus === 'connected') {
      FB.logout(response => {
        this.setLogout();
      });
    } else {
      this.setLogout();
    }
  }
}

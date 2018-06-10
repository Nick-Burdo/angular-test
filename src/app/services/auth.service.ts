import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {of} from 'rxjs/internal/observable/of';
import {catchError, delay, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../config';
import {handleHttpError} from './handle-http-error';

declare const FB: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthorized: boolean = false;
  redirectUrl: string;
  FBStatus: string;

  constructor(private router: Router, private http: HttpClient) {
  }

  login(): Observable<boolean> {
    return of(true).pipe(
      delay(500),
      tap(() => this.isAuthorized = true)
    );
  }

  fbLogin(code: string): Observable<any> {
    return this.http.post(`${API_URL}//user/login/facebook`, {code}).pipe(
      catchError(handleHttpError('Post User Login Facebook'))
    );
  }

  setAuthorized(state: boolean): void {
    this.isAuthorized = state;
  }

  setFBStatus(status: string): void {
    this.FBStatus = status;
  }

  setLogout(): void {
    this.isAuthorized = false;
    this.router.navigate(['/login']);
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

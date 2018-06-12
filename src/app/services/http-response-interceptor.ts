import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {catchError, map} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import { TokenService } from './token.service';

@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router, private tokenService: TokenService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenService.getTokenValue();
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });

    return next.handle(authReq).pipe(
      map((event: any) => {
        if (event instanceof HttpResponse) {
          return event.clone({
            body: event.body.result
          });
        }
        return event;
      }),
      catchError(this.handleError())
    );
  }

  /**
   * Handle Http operation that failed.
   * In case Error 401 - redirect to /login
   * In the remaining cases - throw error
   */
  private handleError<T>() {
    return (error: any): Observable<T> => {
      if (error.error && error.error.status === 401) {
        // this.authService.redirectUrl = '/profile';
        this.router.navigate(['/login']);
      }
      throw error.error;
    };
  }
}

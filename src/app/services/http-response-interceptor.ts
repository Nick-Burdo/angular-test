import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((event: any) => {
        if (event instanceof HttpResponse) {
          return event.clone({
            body: event.body.result
          })
        }
        return event;
      }),
/*
      catchError((error, caught) => {

          console.log('***** caught:', caught);

        console.log('ERROR:', error);
        console.log('IS RESPONSE =', error instanceof HttpResponse);

        return of([]);
      })
*/
    );
  }
}

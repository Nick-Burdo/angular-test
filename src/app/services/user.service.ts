import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../users/user';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl:string = 'https://test-api.live.gbksoft.net/rest/v1/';

  constructor(private http: HttpClient) {
  }

  /* GET Users List */
  getUsers(): Observable<User[]> {
    return this.http.get<any>(`${this.apiUrl}user2`).pipe(
      catchError(this.handleError('GET Users List', []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      return of(result as T);
    };
  }
}

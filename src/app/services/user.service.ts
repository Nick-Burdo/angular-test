import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {User} from '../users/user';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Profile} from '../auth/profile';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // apiUrl = 'https://test-api.live.gbksoft.net/rest/v1/';
  apiUrl = '/rest/v1';

  constructor(private http: HttpClient) {
  }

  /* GET Users List */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/user`).pipe(
      catchError(this.handleError('GET Users List', []))
    );
  }

  /* GET Current Users Data */
  getCurrentUser(): Observable<Profile> {
    return this.http.get<Profile>(`${this.apiUrl}/user/current`).pipe(
      catchError(this.handleError('GET Current User'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      return of(result as T);
    };
  }
}

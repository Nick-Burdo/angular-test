import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {User} from '../users/user';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Profile} from '../auth/profile';
import {API_URL} from '../config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  /* GET Users List */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${API_URL}/user`).pipe(
      catchError(this.handleError('GET Users List', []))
    );
  }

  /* GET Current User Data */
  getCurrentUser(): Observable<Profile> {
    return this.http.get<any>(`${API_URL}/user/current`).pipe(
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

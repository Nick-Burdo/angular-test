import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Profile} from '../models/profile';
import {API_URL} from '../config';
import {handleHttpError} from './handle-http-error';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  /* GET Users List */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${API_URL}/user`).pipe(
      catchError(handleHttpError('GET Users List', []))
    );
  }

  /* GET Users Data */
  getUser(id): Observable<User> {
    return this.http.get<User>(`${API_URL}/user/${id}`).pipe(
      catchError(handleHttpError('GET Users List', new User))
    );
  }

  /* GET Current User Data */
  getCurrentUser(): Observable<Profile> {
    return this.http.get<any>(`${API_URL}/user/current`).pipe(
      catchError(handleHttpError('GET Current User'))
    );
  }

  /* UPDATE Current User Data */
  updateCurrentUser(data: Profile): Observable<any> {
    return this.http.put(`${API_URL}/user/profile`, data).pipe(
      catchError(handleHttpError('UPDATE Current User'))
    );
  }
}

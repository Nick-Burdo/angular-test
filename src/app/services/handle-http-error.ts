/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
import {Observable, of} from 'rxjs';

export function handleHttpError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(`${operation} failed:`, error);
    return of(result as T);
  };
}

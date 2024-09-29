import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { environment } from 'src/Environment/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
  ) {}

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // Log the error to the console
    console.error(errorMessage);
    // Return an observable with a user-facing error message
    return throwError(
      ()=> new Error(errorMessage)
    );
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return headers;
  }

  get<T>(url: string): Observable<T> {
    const headers = this.getHeaders();
    return this.http.get<T>(`${environment.apiUrl}/${url}`, { headers });
  }

  post<T>(url: string, data: any): Observable<T> {
    const headers = this.getHeaders();
    return this.http.post<T>(`${environment.apiUrl}/${url}`, data, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  put<T>(url: string, data?: any): Observable<T> {
    const headers = this.getHeaders();
    return this.http.put<T>(`${environment.apiUrl}/${url}`, data, { headers });
  }

  delete<T>(url: string): Observable<T> {
    const headers = this.getHeaders();
    return this.http.delete<T>(`${environment.apiUrl}/${url}`, { headers });
  }

  patch<T>(url: string, data: any): Observable<T> {
    const headers = this.getHeaders();
    return this.http.patch<T>(`${environment.apiUrl}/${url}`, data, { headers });
  }

  head<T>(url: string): Observable<T> {
    const headers = this.getHeaders();
    return this.http.head<T>(`${environment.apiUrl}/${url}`, { headers });
  }

  options<T>(url: string): Observable<T> {
    const headers = this.getHeaders();
    return this.http.options<T>(`${environment.apiUrl}/${url}`, { headers });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../environment/environment'; 
import { Observable, catchError, map, of } from 'rxjs';
import { Router } from '@angular/router';
import { LoadingService } from './loading.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private user:any;
  private apiUrl = environment.API_URL;
  //private authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTkxNmEyN2VlNzBiOTlmZjQ5NWMxMGQiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzA0MDMwOTY2LCJleHAiOjE3MDQwNjY5NjZ9._uKM4t4c938AewMOYnJ1mOwJjW4Q26Mxc5svE7fcxG8';

  constructor(private http: HttpClient, private router:Router, private loadingService: LoadingService) {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  private getHeaders(): HttpHeaders {
    const authToken = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    });
  }


  private getToken(): string | null {
    // Implement logic to get the token from local storage or cookies
    return localStorage.getItem('authToken');
  }

  public setAuthToken(token: string): void {
    this.setToken(token);
  }
  private setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }


  removeToken(): void {
    // Implement logic to remove the token from local storage or cookies
    localStorage.removeItem('authToken');
  }

  login(userName: string, password: string): Observable<any> {
    const loginData = { userName, password };
  
    return this.http.post<any>(`${this.apiUrl}auth/authenticate`, loginData).pipe(
      map((response: any) => {
        
        this.user = response.user || null;
        localStorage.setItem('user', JSON.stringify(response.user));
        
        return response;
      })
    );
  }
  
  getUser(): any {
    return this.user;
  }

  logout() {
    // Implement logout logic and remove the token
    this.removeToken();
    this.user = null;
    this.router.navigate(['/login']);
  }

  isLoggedIn(): Observable<boolean> {
    this.loadingService.setLoadingState(true); 
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}auth/validate-token`, { headers })
    .pipe(
      tap(() => this.loadingService.setLoadingState(false)), // Set loading state to false after API call completes
      catchError(error => {
        this.loadingService.setLoadingState(false); // Ensure loading state is set to false in case of error
        throw error; // Re-throw the error to be handled by the caller
      })
    );
  }
  
  

}

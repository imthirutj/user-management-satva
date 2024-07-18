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
  
    return this.http.post<any>(`${this.apiUrl}login`, loginData).pipe(
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
    return this.http.get<any>(`${this.apiUrl}validate-token`, { headers })
    .pipe(
      tap(() => this.loadingService.setLoadingState(false)), // Set loading state to false after API call completes
      catchError(error => {
        this.loadingService.setLoadingState(false); // Ensure loading state is set to false in case of error
        throw error; // Re-throw the error to be handled by the caller
      })
    );
  }
  


  getApiData(expenseFilter: HttpParams): Observable<any> {
    this.loadingService.setLoadingState(true); // Set loading state to true before making the API call

    return this.http.get(this.apiUrl + 'admin/getExpenses', { headers: this.getHeaders(), params: expenseFilter })
      .pipe(
        tap(() => this.loadingService.setLoadingState(false)), // Set loading state to false after API call completes
        catchError(error => {
          this.loadingService.setLoadingState(false); // Ensure loading state is set to false in case of error
          throw error; // Re-throw the error to be handled by the caller
        })
      );
  }

  getCategoryApiData(): Observable<any> {
    this.loadingService.setLoadingState(true); // Set loading state to true before making the API call
    return this.http.get(this.apiUrl + 'admin/getCategories', { headers: this.getHeaders() })
      .pipe(
        tap(() => this.loadingService.setLoadingState(false)), // Set loading state to false after API call completes
        catchError(error => {
          this.loadingService.setLoadingState(false); // Ensure loading state is set to false in case of error
          throw error; // Re-throw the error to be handled by the caller
        })
      );
  }

  addCategory(categoryData: { name: string }): Observable<any> {
    this.loadingService.setLoadingState(true); // Set loading state to true before making the API call
    return this.http.post(this.apiUrl + 'admin/addCategory', categoryData, { headers: this.getHeaders() })
      .pipe(
        tap(() => this.loadingService.setLoadingState(false)), // Set loading state to false after API call completes
        catchError(error => {
          this.loadingService.setLoadingState(false); // Ensure loading state is set to false in case of error
          throw error; // Re-throw the error to be handled by the caller
        })
      );
  }

  addExpenses(expenseData: any): Observable<any> {
    this.loadingService.setLoadingState(true); // Set loading state to true before making the API call
    return this.http.post(this.apiUrl + 'user/addExpenses', expenseData, { headers: this.getHeaders() })
      .pipe(
        tap(() => this.loadingService.setLoadingState(false)), // Set loading state to false after API call completes
        catchError(error => {
          this.loadingService.setLoadingState(false); // Ensure loading state is set to false in case of error
          throw error; // Re-throw the error to be handled by the caller
        })
      );
  }

  editExpenses(expenseData: any, id: string): Observable<any> {
    this.loadingService.setLoadingState(true);
    return this.http.post(this.apiUrl + 'user/editExpenses/' + id, expenseData, { headers: this.getHeaders() })
      .pipe(
        tap(() => this.loadingService.setLoadingState(false)),
        catchError(error => {
          this.loadingService.setLoadingState(false);
          throw error;
        })
      );
  }
  
  deleteExpenses(id: string): Observable<any> {
    this.loadingService.setLoadingState(true);
    
    // Get the headers using the getHeaders() method
    const headers = this.getHeaders();
  
    return this.http.post(this.apiUrl + 'user/deleteExpenses/' + id, {}, { headers })
      .pipe(
        tap(() => this.loadingService.setLoadingState(false)),
        catchError(error => {
          this.loadingService.setLoadingState(false);
          throw error;
        })
      );
  }
  


  //#region user 
  getUserData(): Observable<any> {
    this.loadingService.setLoadingState(true); // Set loading state to true before making the API call
    return this.http.get(this.apiUrl + 'admin/getusersdata', { headers: this.getHeaders() })
      .pipe(
        tap(() => this.loadingService.setLoadingState(false)), // Set loading state to false after API call completes
        catchError(error => {
          this.loadingService.setLoadingState(false); // Ensure loading state is set to false in case of error
          throw error; // Re-throw the error to be handled by the caller
        })
      );
  }

  
  addUser(userData: any): Observable<any> {
    this.loadingService.setLoadingState(true); // Set loading state to true before making the API call
    return this.http.post(this.apiUrl + 'admin/createUser', userData, { headers: this.getHeaders() })
      .pipe(
        tap(() => this.loadingService.setLoadingState(false)), // Set loading state to false after API call completes
        catchError(error => {
          this.loadingService.setLoadingState(false); // Ensure loading state is set to false in case of error
          throw error; // Re-throw the error to be handled by the caller
        })
      );
  }
  //#endregion


  //Debt

  
  getDebtData(expenseFilter: HttpParams): Observable<any> {
    this.loadingService.setLoadingState(true); // Set loading state to true before making the API call

    return this.http.get(this.apiUrl + 'admin/getDebt', { headers: this.getHeaders(), params: expenseFilter })
      .pipe(
        tap(() => this.loadingService.setLoadingState(false)), // Set loading state to false after API call completes
        catchError(error => {
          this.loadingService.setLoadingState(false); // Ensure loading state is set to false in case of error
          throw error; // Re-throw the error to be handled by the caller
        })
      );
  }

  addDebt(expenseData: any): Observable<any> {
    this.loadingService.setLoadingState(true); // Set loading state to true before making the API call
    return this.http.post(this.apiUrl + 'user/addDebt', expenseData, { headers: this.getHeaders() })
      .pipe(
        tap(() => this.loadingService.setLoadingState(false)), // Set loading state to false after API call completes
        catchError(error => {
          this.loadingService.setLoadingState(false); // Ensure loading state is set to false in case of error
          throw error; // Re-throw the error to be handled by the caller
        })
      );
  }
  
  editDebt(expenseData: any, id: string): Observable<any> {
    this.loadingService.setLoadingState(true);
    return this.http.post(this.apiUrl + 'user/editDebt/' + id, expenseData, { headers: this.getHeaders() })
      .pipe(
        tap(() => this.loadingService.setLoadingState(false)),
        catchError(error => {
          this.loadingService.setLoadingState(false);
          throw error;
        })
      );
  }
  
    
  deleteDebt(id: string): Observable<any> {
    this.loadingService.setLoadingState(true);
    
    // Get the headers using the getHeaders() method
    const headers = this.getHeaders();
  
    return this.http.post(this.apiUrl + 'user/deleteDebt/' + id, {}, { headers })
      .pipe(
        tap(() => this.loadingService.setLoadingState(false)),
        catchError(error => {
          this.loadingService.setLoadingState(false);
          throw error;
        })
      );
  }

  addDebtDetails(data: any): Observable<any> {
    this.loadingService.setLoadingState(true); // Set loading state to true before making the API call
    return this.http.post(this.apiUrl + 'user/addDebtDetail', data, { headers: this.getHeaders() })
      .pipe(
        tap(() => this.loadingService.setLoadingState(false)), // Set loading state to false after API call completes
        catchError(error => {
          this.loadingService.setLoadingState(false); // Ensure loading state is set to false in case of error
          throw error; // Re-throw the error to be handled by the caller
        })
      );
  }

  editDebtDetail(data: any, id: string): Observable<any> {
    this.loadingService.setLoadingState(true);
    return this.http.post(this.apiUrl + 'user/editDebtDetail/' + id, data, { headers: this.getHeaders() })
      .pipe(
        tap(() => this.loadingService.setLoadingState(false)),
        catchError(error => {
          this.loadingService.setLoadingState(false);
          throw error;
        })
      );
  }
  
    
  deleteDebtDetail(id: string): Observable<any> {
    this.loadingService.setLoadingState(true);
    
    // Get the headers using the getHeaders() method
    const headers = this.getHeaders();
  
    return this.http.post(this.apiUrl + 'user/deleteDebtDetail/' + id, {}, { headers })
      .pipe(
        tap(() => this.loadingService.setLoadingState(false)),
        catchError(error => {
          this.loadingService.setLoadingState(false);
          throw error;
        })
      );
  }
  //#endRegion


  //card
  getCardsData(filter: HttpParams): Observable<any> {
    this.loadingService.setLoadingState(true); // Set loading state to true before making the API call

    return this.http.get(this.apiUrl + 'user/getCards', { headers: this.getHeaders(), params: filter })
      .pipe(
        tap(() => this.loadingService.setLoadingState(false)), // Set loading state to false after API call completes
        catchError(error => {
          this.loadingService.setLoadingState(false); // Ensure loading state is set to false in case of error
          throw error; // Re-throw the error to be handled by the caller
        })
      );
  }

  getCardTxnData(filter: HttpParams): Observable<any> {
    this.loadingService.setLoadingState(true); // Set loading state to true before making the API call

    return this.http.get(this.apiUrl + 'user/getCardTxn', { headers: this.getHeaders(), params: filter })
      .pipe(
        tap(() => this.loadingService.setLoadingState(false)), // Set loading state to false after API call completes
        catchError(error => {
          this.loadingService.setLoadingState(false); // Ensure loading state is set to false in case of error
          throw error; // Re-throw the error to be handled by the caller
        })
      );
  }

  
  addCard(data: any): Observable<any> {
    this.loadingService.setLoadingState(true); // Set loading state to true before making the API call
    return this.http.post(this.apiUrl + 'user/addCard', data, { headers: this.getHeaders() })
      .pipe(
        tap(() => this.loadingService.setLoadingState(false)), // Set loading state to false after API call completes
        catchError(error => {
          this.loadingService.setLoadingState(false); // Ensure loading state is set to false in case of error
          throw error; // Re-throw the error to be handled by the caller
        })
      );
  }

  
  editCard(data: any, id: string): Observable<any> {
    this.loadingService.setLoadingState(true);
    return this.http.post(this.apiUrl + 'user/editCard/' + id, data, { headers: this.getHeaders() })
      .pipe(
        tap(() => this.loadingService.setLoadingState(false)),
        catchError(error => {
          this.loadingService.setLoadingState(false);
          throw error;
        })
      );
  }

  deleteCard(id: string): Observable<any> {
    this.loadingService.setLoadingState(true);
    
    // Get the headers using the getHeaders() method
    const headers = this.getHeaders();
  
    return this.http.post(this.apiUrl + 'user/deleteCard/' + id, {}, { headers })
      .pipe(
        tap(() => this.loadingService.setLoadingState(false)),
        catchError(error => {
          this.loadingService.setLoadingState(false);
          throw error;
        })
      );
  }

  //Dashboard
  
  getDashboard(filter: HttpParams): Observable<any> {
    this.loadingService.setLoadingState(true); // Set loading state to true before making the API call

    return this.http.get(this.apiUrl + 'user/getDashboard', { headers: this.getHeaders(), params: filter })
      .pipe(
        tap(() => this.loadingService.setLoadingState(false)), // Set loading state to false after API call completes
        catchError(error => {
          this.loadingService.setLoadingState(false); // Ensure loading state is set to false in case of error
          throw error; // Re-throw the error to be handled by the caller
        })
      );
  }

  

}

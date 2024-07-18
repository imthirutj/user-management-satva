// auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { DataService } from './data.service';
import { map, catchError } from 'rxjs/operators'; // Import the map operator
import { Observable, of } from 'rxjs'; // Import Observable

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  isAuthenticated: boolean = false;

  constructor(private dataService: DataService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    // Return the observable directly
    return this.dataService.isLoggedIn().pipe(
      map((result) => {
        this.isAuthenticated = result;
        if (this.isAuthenticated) {
          return true; // Allow access to the route
        } else {
         this.dataService.logout();
          
          return false; // Block access to the route
        }
      }),
      catchError((error) => {
        console.error('Error in AuthGuard:', error);
        // Handle error appropriately, such as navigating to an error page or logging out
        this.dataService.logout(); // Example: Logout on error
        return of(false); // Return false to block access to the route
      })
    );
  }
}

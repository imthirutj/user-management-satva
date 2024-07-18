import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public isLoading = new BehaviorSubject<boolean>(false);
  public loadingMessage = new BehaviorSubject<string>(''); // Add loading message subject

  constructor() { }

  setLoadingState(state: boolean, message: string = '') {
    this.isLoading.next(state);
    this.loadingMessage.next(message); // Update loading message
  }

  // Method to clear loading state after a certain delay or upon completion of an action
  clearLoadingState(delay: number = 0) {
    setTimeout(() => {
      this.isLoading.next(false);
      this.loadingMessage.next('');
    }, delay);
  }

  // Method to handle errors and set error state
  setErrorState(error: any, message: string = 'An error occurred') {
    console.error(error); // Log the error
    this.isLoading.next(false); // Set loading to false
    this.loadingMessage.next(message); // Update loading message with error message
  }
}

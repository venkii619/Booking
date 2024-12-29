import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();
  constructor() {
    let user = localStorage.getItem('user')
    if (user != null) {
      user = JSON.parse(user)
      this.userSubject.next(user);
    }
  }
  setUser(user: any) {
    this.userSubject.next(user);
  }
  getUser() {
    return this.userSubject.value;
  }
  clearUser() {
    this.userSubject.next(null);
  }
}

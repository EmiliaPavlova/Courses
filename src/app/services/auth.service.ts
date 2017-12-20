import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {

  isLoggedUser$ = new BehaviorSubject<boolean>(this.isAuthenticated());
  changedUser$ = new BehaviorSubject<string>(this.getUserInfo());

  login(username, password) {
    localStorage.setItem('currentUser', JSON.stringify({ username: username }));
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  isAuthenticated() {
    return !!localStorage.getItem('currentUser');
  }

  getUserInfo() {
    return localStorage.getItem('currentUser')
      ? JSON.parse(localStorage.getItem('currentUser')).username
      : null;
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoggedUser$.asObservable();
  }

  changedUser(): Observable<string> {
    return this.changedUser$.asObservable();
  }

}

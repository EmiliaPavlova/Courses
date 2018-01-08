import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {

  isLoggedUser$ = new BehaviorSubject<boolean>(this.isAuthenticated());
  changedUser$ = new BehaviorSubject<string>(this.getUserInfo());

  login(username, password) {
    localStorage.setItem('currentUser', JSON.stringify({ username: username }));
    this.isLoggedUser$.next(true);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.isLoggedUser$.next(false);
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

// https://netbasal.com/angular-2-persist-your-login-status-with-behaviorsubject-45da9ec43243
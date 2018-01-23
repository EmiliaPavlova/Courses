import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { debuglog } from 'util';

@Injectable()
export class AuthService {

  isLoggedUser$ = new BehaviorSubject<boolean>(this.isAuthenticated());
  changedUser$ = new BehaviorSubject<string>(this.getUserInfo());
  private authUrl = 'http://localhost:4204';

  constructor(private http: HttpClient) {}

  login(username, password) {
    // this.http.post(this.authUrl + '/login', { username, password });
    this.http.post(this.authUrl, { username, password });
    localStorage.setItem('currentUser', JSON.stringify({ token: username }));
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
      ? JSON.parse(localStorage.getItem('currentUser')).token
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
// https://medium.com/@ryanchenkie_40935/angular-authentication-using-the-http-client-and-http-interceptors-2f9d1540eb8
// https://alligator.io/angular/httpclient-intro/

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { debuglog } from 'util';

import { User } from '../login/user';

@Injectable()
export class AuthService {

  isLoggedUser$ = new BehaviorSubject<boolean>(this.isAuthenticated());
  changedUser$ = new BehaviorSubject<string>(this.getUserInfo());
  private authUrl = 'http://localhost:4204/login';

  constructor(private http: HttpClient) {}

  login(user: User): void {
    // this.http.post(this.authUrl + '/login', { username, password });

    const body = JSON.stringify(user);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.post(this.authUrl, body, { headers: headers });
    localStorage.setItem('currentUser', JSON.stringify({ token: user.username }));
    this.isLoggedUser$.next(true);
  }

  logout(): void {
    // localStorage.removeItem('currentUser');
    localStorage.clear();
    this.isLoggedUser$.next(false);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  getUserInfo(): string {
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

// https://www.udemy.com/angular-2-and-nodejs-the-practical-guide/learn/v4/content

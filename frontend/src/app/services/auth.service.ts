import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { User } from '../login/user';

@Injectable()
export class AuthService {

  isLoggedUser$ = new BehaviorSubject<boolean>(this.isAuthenticated());
  changedUser$ = new BehaviorSubject<string>(this.getUserInfo());
  private authUrl = 'http://localhost:4204/login';

  constructor(private http: HttpClient) {}

  login(user: User): any {
    const request = this.http.post(this.authUrl, user);
    request.subscribe(data => {
      localStorage.setItem('User', data['user']);
      localStorage.setItem('Authorization', data['token']);
      // this.isLoggedUser$.next(true);
    });
    // this.isLoggedUser$.next(true);
    return request;
  }

  logout(): void {
    localStorage.clear();
    this.isLoggedUser$.next(false);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserInfo(): string {
    return localStorage.getItem('user');
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoggedUser$.asObservable();
  }

  changedUser(): Observable<string> {
    return this.changedUser$.asObservable();
  }

}

// https://www.udemy.com/angular-2-and-nodejs-the-practical-guide/learn/v4/content

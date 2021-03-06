import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { User } from '../models/user';

@Injectable()
export class AuthService {

  isLoggedUser$ = new BehaviorSubject<boolean>(this.isAuthenticated());
  changedUser$ = new BehaviorSubject<string>(this.getUserInfo());
  private authUrl = 'http://localhost:4204/login';

  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService
  ) {}

  login(user: User): any {
    const request = this.http.post(this.authUrl, user);
    request.subscribe(data => {
      localStorage.setItem('User', data['user']);
      localStorage.setItem('access_token', data['token']);
    });
    return request;
  }

  logout(): void {
    localStorage.clear();
    this.isLoggedUser$.next(false);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }

  getUserInfo(): string {
    return localStorage.getItem('User');
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoggedUser$.asObservable();
  }

  changedUser(): Observable<string> {
    return this.changedUser$.asObservable();
  }

}

// https://www.udemy.com/angular-2-and-nodejs-the-practical-guide/learn/v4/content

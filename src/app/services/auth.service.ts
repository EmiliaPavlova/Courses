import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() { }

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
    return JSON.parse(localStorage.getItem('currentUser')).username;
  }

}

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../services/auth.service';
import { User } from '../login/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  public username;
  public password;
  public isAuthenticated: boolean;

  constructor(private authService: AuthService) {
    authService.isLoggedIn().subscribe(data => this.isAuthenticated = data);
  }

  onLogin() {
    const user = new User(
      this.username,
      this.password
    );
    this.authService.login(user);
    console.log(`logged ${this.username}`);
    this.authService.isLoggedUser$.next(true);
    this.authService.changedUser$.next(this.username);
    this.init();
  }

  init() {
    this.username = null;
    this.password = null;
  }

  ngOnInit() {
    this.username = this.authService.getUserInfo();
    this.init();
  }

}

// https://netbasal.com/angular-2-persist-your-login-status-with-behaviorsubject-45da9ec43243

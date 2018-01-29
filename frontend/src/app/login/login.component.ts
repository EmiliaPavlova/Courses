import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  public loginForm: FormGroup;
  public username: string;
  public password: string;
  public isLoggedIn: boolean;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    authService.isLoggedIn().subscribe(logged => this.isLoggedIn = logged);
  }

  onLogin() {
    const user = new User(
      this.username,
      this.password
    );
    this.authService.login(user);
    this.authService.isLoggedUser$.next(true);
    this.authService.changedUser$.next(this.username);

    console.log(`logged ${this.username}`);
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

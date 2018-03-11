import { ActionReducer, Action } from '@ngrx/store';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgRedux, select } from 'ng2-redux';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthActions, store, AppState, } from '../store';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';

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
    private ngRedux: NgRedux<AppState>,
    private authActions: AuthActions,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
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
    // this.authActions.login(user);
    this.authService.isLoggedUser$.next(true);
    this.authService.changedUser$.next(this.username);

    console.log(`logged ${this.username}`);
    this.loginForm.reset();
    this.init();
    this.router.navigate(['/courses']);
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

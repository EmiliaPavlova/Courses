import { UserState } from './userState';
import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { User } from '../models/user';

export const LOGIN = 'LOGIN';

@Injectable()
export class AuthActions {
  constructor(
    private ngRedux: NgRedux<UserState>,
  ) {}

  login(user: User) {
    this.ngRedux.dispatch({
      type: LOGIN,
      user,
    });
  }
}

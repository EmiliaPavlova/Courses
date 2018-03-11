import { UserState } from './userState';
import { User } from '../models/user';
import {
  LOGIN,
} from './auth.actions';

const initialState: UserState = {
  user: null,
};

function login(state, action): UserState {
    return Object.assign({}, state, {
      user: 'user'
    });
}

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return login(state, action);
    default:
      return state;
  }
}

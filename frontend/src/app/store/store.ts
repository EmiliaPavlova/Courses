import { createStore, applyMiddleware, compose, GenericStoreEnhancer } from 'redux';
import { reducer } from './reducer';
import { userReducer } from './auth.reducer';
import { AppState } from './appState';
import { UserState } from './userState';

// enable redux devtools
declare var window: any;

const devToolsExtension: GenericStoreEnhancer = (window.devToolsExtension)
    ? window.devToolsExtension()
    : (f) => f;

export const store = createStore<AppState>(reducer, compose(devToolsExtension) as GenericStoreEnhancer);
export const loginStore = createStore<UserState>(userReducer, compose(devToolsExtension) as GenericStoreEnhancer);

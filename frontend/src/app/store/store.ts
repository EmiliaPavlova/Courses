import { createStore, applyMiddleware, compose, GenericStoreEnhancer } from 'redux';
import { reducer } from './reducer';
import { AppState } from './appState';

// enable redux devtools
declare var window: any;

const devToolsExtension: GenericStoreEnhancer = (window.devToolsExtension)
    ? window.devToolsExtension()
    : (f) => f;

export const store = createStore<AppState>(reducer, compose(devToolsExtension) as GenericStoreEnhancer);

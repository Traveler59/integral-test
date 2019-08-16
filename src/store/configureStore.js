// @flow
import { createStore, applyMiddleware } from 'redux';

import type { Dispatch } from 'redux';

import { persistStore, persistReducer, purgeStoredState } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import thunk from 'redux-thunk';

import rootReducer, { type Reducers } from '../reducers';

import type { TaskActionTypes } from '../actions/types';

// eslint-disable-next-line no-undef
type $ExtractFunctionReturn = <V>(v: (...args: any) => V) => V;
// eslint-disable-next-line no-undef
export type AppState = $ObjMap<Reducers, $ExtractFunctionReturn>;

const persistedReducer = persistReducer({
  key: 'root',
  storage,
  timeout: 0,
}, rootReducer);

const configureStore = (initialState: AppState) => {
  const store = createStore<AppState, TaskActionTypes, Dispatch<TaskActionTypes>>(
    persistedReducer,
    applyMiddleware(thunk),
  );
  const persistor = persistStore(store);

  return { store, persistor };
};

export default configureStore;

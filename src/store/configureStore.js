// @flow
import { createStore, applyMiddleware } from 'redux';

import type { Dispatch } from 'redux';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { ThunkMiddleware as thunk } from 'redux-thunk';

import rootReducer, { type Reducers } from '../reducers';

import type { TaskActionTypes } from '../actions/types';

// eslint-disable-next-line no-undef
type $ExtractFunctionReturn = <V>(v: (...args: any) => V) => V;
// eslint-disable-next-line no-undef
export type AppState = $ObjMap<Reducers | void, $ExtractFunctionReturn>;

const persistedReducer = persistReducer({
  key: 'root',
  storage,
  timeout: 0,
}, rootReducer);

const configureStore = () => {
  const store = createStore<AppState, TaskActionTypes, Dispatch<TaskActionTypes>>(
    persistedReducer,
    applyMiddleware(thunk),
  );
  const persistor = persistStore(store);

  return { store, persistor };
};

export default configureStore;

// @flow
import { createStore, applyMiddleware } from 'redux';

import type { Dispatch } from 'redux';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import thunk from 'redux-thunk';

import rootReducer from '../reducers';

import type { TaskActionTypes } from '../actions/types';

import type { State } from '../libs/types';

const persistedReducer = persistReducer({
  key: 'root',
  storage,
}, rootReducer);

const configureStore = (initialState: State) => {
  const store = createStore<State, TaskActionTypes, Dispatch<TaskActionTypes>>(
    persistedReducer,
    applyMiddleware(thunk),
  );
  const persistor = persistStore(store);
  return { store, persistor };
};

export default configureStore;

// @flow
import { createStore } from 'redux';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import rootReducer from '../reducers';

import type { State } from '../types/types';


const persistedReducer = persistReducer({
  key: 'root',
  storage,
}, rootReducer);

const configureStore = (initialState: State) => {
  const store = createStore<*, *, *>(
    persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  const persistor = persistStore(store);
  return { store, persistor };
};

export default configureStore;

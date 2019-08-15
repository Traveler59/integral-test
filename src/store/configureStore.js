// @flow
import { createStore } from 'redux';
import rootReducer from '../reducers';

import type { State } from '../types/types';

const configureStore = (initialState: State) => {
  const store = createStore<*, *, *>(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  return store;
};

export default configureStore;

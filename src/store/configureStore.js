import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';


const middleware = [thunk];

const configureStore = (initialState) => {
  const store = createStore(rootReducer, initialState, applyMiddleware(...middleware));
  return store;
};

export default configureStore;

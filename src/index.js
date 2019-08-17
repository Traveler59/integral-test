// @flow
import '../style-libs/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from './containers/App';
import configureStore from './store/configureStore';

const { store, persistor } = configureStore();

const root = document.getElementById('root');

if (root) {
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>,
    root,
  );
}

import React from 'react';
import ReactDOM from 'react-dom';
import { getInitialStateRenderer } from 'electron-redux';
import { persistStore } from 'redux-persist';

import App from './App';
import { configureStore } from './store/configureStore';
import history from './store/history';

const initialState = getInitialStateRenderer();
const store = configureStore(initialState, 'renderer');

const persistor = persistStore(store);
// const persistor = persistStore(store).purge();

ReactDOM.render(
  <App 
    store={store} 
    history={history} 
    persistor={persistor}
  />
  , document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default; // eslint-disable-line global-require
    ReactDOM.render(
      <NextApp 
        store={store} 
        history={history} 
        persistor={persistor} 
      />
      , document.getElementById('root')
    );
  });
}

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { getInitialStateRenderer } from 'electron-redux';

import App from './App';
import { configureStore } from './store/configureStore';
import history from './store/history';

const initialState = getInitialStateRenderer();
const store = configureStore(initialState, 'renderer');

ReactDOM.render(
  <AppContainer>
    <App store={store} history={history} />
  </AppContainer>
  , document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App'); // eslint-disable-line global-require
    ReactDOM.render(
      <AppContainer>
        <NextApp store={store} history={history} />
      </AppContainer>
      , document.getElementById('root')
    );
  });
}

/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router } from "react-router-dom";
import { PersistGate } from 'redux-persist/es/integration/react';
import Routes from 'routes';

class App extends Component {

  render() {

    const { 
      store,
      history,
      persistor
    } = this.props;

    return (
      <Provider store={store}>
        <PersistGate loading='Loading' persistor={persistor}>
          <Router history={history}>
            <Routes />
          </Router>
        </PersistGate>
      </Provider>
    );
  }
  
}

export default App;

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router } from "react-router-dom";
import Routes, { url } from './routes';

class App extends Component {

  render() {

    const { 
      store = {}, 
      history = {} 
    } = this.props;

    return (
      <Provider store={store}>
        <Router history={history}>
          <Routes />
        </Router>
      </Provider>
    );
  }
  
}

export default App;

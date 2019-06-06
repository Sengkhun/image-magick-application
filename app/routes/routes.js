import React, { Component } from 'react';
import { Switch } from 'react-router-dom';

import AppRoute from './AppRoute';
import history from '../store/history';
import url from './url';

import { MainLayout } from '../layouts';
import { Main } from '../pages';

class Routes extends Component {

  componentDidMount() {
    history.push(url.main.index);
  }
  
  render() {
    return (
      <Switch>

        <AppRoute
          exact
          path={url.main.index}
          layout={MainLayout}
          component={Main}
        />

      </Switch>
    );
  }
}

export default Routes;

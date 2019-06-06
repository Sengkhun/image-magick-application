import React, { Component } from 'react';
import { Switch } from 'react-router-dom';

import AppRoute from './AppRoute';
import url from './url';

import { MainLayout } from '../layouts';
import { Home } from '../pages';

class Routes extends Component {
  
  render() {
    return (
      <Switch>

        <AppRoute
          exact
          path={url.main.index}
          layout={MainLayout}
          component={Home}
        />

      </Switch>
    );
  }
}

export default Routes;

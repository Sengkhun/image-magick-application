import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';

import AppRoute from './AppRoute';
import url from './url';
import Theme from '../themes';

import { MainLayout } from '../layouts';
import { Home } from '../pages';

class Routes extends Component {
  
  render() {
    return (
      <MuiThemeProvider theme={Theme}>
        <Switch>

          <AppRoute
            exact
            path={url.main.index}
            layout={MainLayout}
            component={Home}
          />

        </Switch>
      </MuiThemeProvider>
    );
  }
}

export default Routes;

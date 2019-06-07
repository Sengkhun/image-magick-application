import React, { PureComponent } from 'react';

import { 
  CssBaseline, 
  withStyles
} from '@material-ui/core';

import { Panel, Toolbar } from '../../components';

const styles = theme => ({
  root: {
    display: 'flex',
    height: '100%',
    position: 'relative'
  },
  content: {
    flexGrow: 1
  },
});

class MainLayout extends PureComponent {

  render() {

    const { 
      children, 
      classes
    } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline/>
        
        <Toolbar/>
        
        <main className={classes.content}>
          { children }
        </main>

        <Panel/>
      </div>
    );
  }

}

export default withStyles(styles)(MainLayout);

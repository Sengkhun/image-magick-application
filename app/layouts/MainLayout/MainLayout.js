import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { 
  CssBaseline, 
  withStyles
} from '@material-ui/core';

import { Loading, Panel, Toolbar } from '../../components';

const styles = theme => ({
  root: {
    position: 'relative',
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
      classes,
      loading
    } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline/>

        { loading && <Loading/> }
        
        <Toolbar/>
        
        <main className={classes.content}>
          { children }
        </main>

        <Panel/>
      </div>
    );
  }

}

const mapStateToProps = ({ AppReducer }) => ({
  loading: AppReducer.loading
});

const withStyleMainLayout = withStyles(styles)(MainLayout);

export default connect(
  mapStateToProps,
  null
)(withStyleMainLayout);

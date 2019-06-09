import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  root: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    cursor: 'progress',
    backgroundColor: 'rgba(0,0,0,0)'
  }
});

class Loading extends PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}></div>
    )
  }
}

export default withStyles(styles)(Loading);

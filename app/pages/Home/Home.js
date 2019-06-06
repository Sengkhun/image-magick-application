import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  root: {
    height: '100%',
    padding: theme.spacing(1),
    backgroundColor: 'red'
  }
});

class Home extends PureComponent {
  render() {
    const { classes, imagePath } = this.props;
    return (
      <div className={classes.root}>
        Home
      </div>
    )
  }
}

const mapStateToProps = ({ ImageReducer }) => ({
  imagePath: ImageReducer.imagePath
});

const withStyleHome = withStyles(styles)(Home);

export default connect(
  mapStateToProps,
  null
)(withStyleHome);

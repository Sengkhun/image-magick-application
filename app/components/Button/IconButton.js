import React, { PureComponent } from 'react';
import classNames from "classnames";
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'flex',
    padding: `${theme.spacing(.7)}px ${theme.spacing(1.2)}px`,
    marginBottom: theme.spacing(1),
    borderRadius: 4,
    cursor: 'pointer'
  },
  selected: {
    backgroundColor: '#383838',
  },
  hover: {
    '&:hover': {
      backgroundColor: '#454545'
    }
  },
  icon: {
    color: '#dddddd',
    fontSize: 20
  }
});

class IconButton extends PureComponent {
  render() {
    const { classes, title, icon, selected } = this.props;
    return (
      <div 
        title={title}
        className={classNames(
          classes.root,
          selected ? classes.selected : classes.hover
        )}
      >
        <i className={classNames(classes.icon, 'fas', icon)}/>
      </div>
    )
  }
}

export default withStyles(styles)(IconButton);

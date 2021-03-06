import React, { PureComponent } from 'react';
import classNames from "classnames";
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'flex',
    padding: `${theme.spacing(.7)}px ${theme.spacing(1.2)}px`,
    marginBottom: theme.spacing(3),
    borderRadius: 4,
    cursor: 'pointer'
  },
  selected: {
    backgroundColor: '#383838',
    border: '.5px solid #666666'
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
    const { classes, title, icon, selected, onClick } = this.props;
    return (
      <div 
        title={title}
        className={classNames(
          classes.root,
          selected ? classes.selected : classes.hover
        )}
        onClick={onClick}
      >
        <i className={classNames(classes.icon, 'fas', icon)}/>
      </div>
    )
  }
}

export default withStyles(styles)(IconButton);

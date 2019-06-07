import React, { PureComponent } from 'react';
import classNames from "classnames";
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  button: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    border: '1px solid #dddddd',
    borderRadius: 20,
    color: '#dddddd',
    padding: `${theme.spacing(.3)}px ${theme.spacing(2)}px`,
    cursor: 'pointer',
    userSelect: 'none',
    '&:active': {
      backgroundColor: '#dddddd',
      color: '#323232'
    }
  },
  dim: {
    borderColor: '#7d7d7d',
    '&:active': {
      backgroundColor: '#7d7d7d',
      color: '#323232'
    }
  }
});

class Button extends PureComponent {

  render() {
    const { classes, title, dim, onClick } = this.props;
    return (
      <div 
        className={classNames(
          classes.button,
          dim && classes.dim
        )}
        onClick={onClick}
      >
        {title}
      </div>
    );
  }

}

export default withStyles(styles)(Button);

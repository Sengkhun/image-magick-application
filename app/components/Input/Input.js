import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'auto auto auto'
  },
  title: {
    color: '#dddddd',
    marginRight: theme.spacing(1)
  },
  input: {
    width: 150,
    backgroundColor: '#535353',
    border: '.5px solid #dddddd',
    color: '#dddddd',
    fontSize: 14,
    borderRadius: 4
  },
  rightLabel: {
    color: '#dddddd',
    marginLeft: theme.spacing(1)
  }
});

class Input extends PureComponent {

  render() {
    const { classes, title, width, rightLabel, value, onChange } = this.props;
    return (
      <div className={classes.root}>
        <label className={classes.title}>
          {title}
        </label>

        <input
          className={classes.input}
          style={{ width: `${width}px` }}
          value={value}
          onChange={onChange}
        />

        { rightLabel && 
          <label className={classes.rightLabel}>
            {rightLabel}
          </label> }
      </div>
    )
  }
  
}

export default withStyles(styles)(Input);

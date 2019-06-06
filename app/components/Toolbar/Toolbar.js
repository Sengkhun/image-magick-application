import React, { PureComponent } from 'react';

import { withStyles } from '@material-ui/core';

import { IconButton } from '../Button';

// 383838
// dddddd

const styles = theme => ({
  root: {
    display: 'flex',
    flexFlow: 'column',
    backgroundColor: '#535353',
    padding: `${theme.spacing(1)}px ${theme.spacing(.5)}px`
  },
  icon: {
    marginBottom: `${theme.spacing(1)}px !important`
  }
});

const tools = [
  { title: 'Move tool', icon: 'fa-arrows-alt', onClick: () => {} },
  { title: 'Rotate tool', icon: 'fa-undo', onClick: () => {} },
  { title: 'GrayScale tool', icon: 'fa-palette', onClick: () => {} },
  { title: 'Type tool', icon: 'fa-font', onClick: () => {} },
  // { title: , icon: , onClick: () => {} },
];

class Toolbar extends PureComponent {

  state = {
    selected: 'Move tool'
  };

  render() {

    const { selected } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        { 
          tools.map(({ title, icon }, idx) => (
            <IconButton
              key={idx}
              title={title}
              icon={icon}
              selected={selected === title}
            />
          ))
        }
      </div>
    )
  }
}

export default withStyles(styles)(Toolbar);

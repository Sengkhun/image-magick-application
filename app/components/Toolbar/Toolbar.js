import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import im from 'imagemagick';

import { IconButton } from '../Button';

import { 
  reloadImage, 
  changeCursor,
  changeImageReducer
} from '../../_actions/ImageActions';

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

class Toolbar extends PureComponent {

  state = {
    selected: 'Move tool'
  };

  changeSelected = selected => {
    if (selected !== this.state.selected) {
      this.setState({ selected });
    }
  };

  moveImage = title => () => {
    this.changeSelected(title);
    this.props.changeCursor('move')
  };

  roateImage = title => () => {
    this.changeSelected(title);
    this.props.changeCursor('wait');

    const { imagePath, reload, changeImageReducer } = this.props;
    if (imagePath) {
      im.convert(['-rotate', '-90', imagePath, imagePath],
        function(err, stdout) {
          changeImageReducer({
            cursor: 'default',
            reload: !reload
          });
        }
      );
    }
  };

  tools = [
    { title: 'Move tool', icon: 'fa-arrows-alt', onClick: this.moveImage },
    { title: 'Rotate tool', icon: 'fa-undo', onClick: this.roateImage },
    { title: 'GrayScale tool', icon: 'fa-palette', onClick: () => {} },
    { title: 'Type tool', icon: 'fa-font', onClick: () => {} },
    // { title: , icon: , onClick: () => {} },
  ];

  render() {

    const { selected } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        { 
          this.tools.map(({ title, icon, onClick }, idx) => (
            <IconButton
              key={idx}
              title={title}
              icon={icon}
              selected={selected === title}
              onClick={onClick(title)}
            />
          ))
        }
      </div>
    )
  }
}

const mapStateToProps = ({ ImageReducer }) => ({
  imagePath: ImageReducer.imagePath,
  reload: ImageReducer.reload
});

const withStyleToolbar = withStyles(styles)(Toolbar);

export default connect(
  mapStateToProps,
  { 
    reloadImage,
    changeCursor,
    changeImageReducer
  }
)(withStyleToolbar);

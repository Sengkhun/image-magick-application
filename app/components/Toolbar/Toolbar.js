import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import im from 'imagemagick';

import { IconButton } from '../Button';

import { changeAppReducer } from '../../_actions/AppActions';
import { changeImageReducer } from '../../_actions/ImageActions';

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
    selected: ''
  };

  componentWillMount() {
    this.moveImage('Move tool')();
  }

  changeSelected = selected => {
    if (selected !== this.state.selected) {
      this.setState({ selected });
    }
  };

  moveImage = title => () => {
    this.changeSelected(title);
    this.props.changeAppReducer({ cursor: 'move' });
  };

  roateImage = title => () => {
    const { loading, imagePath, reloadImage, changeAppReducer } = this.props;

    // if loading, do nothing
    if (loading) return;

    this.changeSelected(title);
    this.props.changeAppReducer({ loading: true });

    if (imagePath) {
      im.convert(['-rotate', '-90', imagePath, imagePath],
        function(err, stdout) {
          changeAppReducer({ 
            loading: false, 
            reloadImage: true,
            cursor: 'defautl'
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

const mapStateToProps = ({ AppReducer, ImageReducer }) => ({
  loading: AppReducer.loading,
  reloadImage: AppReducer.reloadImage,
  imagePath: ImageReducer.imagePath
});

const withStyleToolbar = withStyles(styles)(Toolbar);

export default connect(
  mapStateToProps,
  { 
    changeAppReducer,
    changeImageReducer
  }
)(withStyleToolbar);

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import _ from 'lodash';

import { IconButton } from '../Button';

import { changeAppReducer } from 'actions/AppActions';
import { 
  changeImageReducer, 
  roateImage 
} from 'actions/ImageActions';

const styles = theme => ({
  root: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    backgroundColor: '#535353',
    padding: `${theme.spacing(1)}px ${theme.spacing(.5)}px`
  },
  icon: {
    marginBottom: `${theme.spacing(1)}px !important`
  }
});

class Toolbar extends PureComponent {

  componentWillMount() {
    this.props.changeAppReducer({ selected: '' });
    // console.log('.hello.jpg'.split(/\.(?=[^\.]+$)/));
    console.log('.hello.jpg'.splice(6, 1, "2"));
  }

  moveImage = title => () => {
    this.props.changeAppReducer({ selected: title, cursor: 'move' });
  };

  roateImage = title => () => {
    const { loading, images, reloadImage } = this.props;

    // if loading, do nothing
    if (loading) return;

    this.props.changeAppReducer({ selected: title, loading: true });

    const currentImage = _.last(images);
    if (currentImage) {
      const callback = (ok, error) => {
        if (!ok) {
          alert(error);
        }
        this.props.changeAppReducer({ 
          loading: false, 
          reloadImage: true,
          cursor: 'default'
        });
      };
      this.props.roateImage(currentImage, -90, callback);
    }
  };

  colorImage = title => () => {
    this.props.changeAppReducer({ selected: title, controlPanel: 'colorPicker' });
  };

  openBrightnessPanel = title => () => {
    this.props.changeAppReducer({ selected: title, controlPanel: 'brightness' });
  };

  openResizePanel = title => () => {
    this.props.changeAppReducer({ selected: title, controlPanel: 'imageSize' });
  };

  typeImage = title => () => {
    this.props.changeAppReducer({ 
      selected: title, 
      cursor: 'text',
      controlPanel: 'text'
    });
  };

  tools = [
    // { title: 'Move tool', icon: 'fa-arrows-alt', onClick: this.moveImage },
    { title: 'Rotate tool', icon: 'fa-undo', onClick: this.roateImage },
    { title: 'Color tool', icon: 'fa-palette', onClick: this.colorImage },
    { title: 'Brightness/Contrast tool', icon: 'fa-adjust', onClick: this.openBrightnessPanel },
    { title: 'Resize tool', icon: 'fa-compress-arrows-alt', onClick: this.openResizePanel },
    { title: 'Type tool', icon: 'fa-font', onClick: this.typeImage },
  ];

  render() {

    const { classes, selected } = this.props;

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
  selected: AppReducer.selected,
  loading: AppReducer.loading,
  reloadImage: AppReducer.reloadImage,
  images: ImageReducer.images
});

const withStyleToolbar = withStyles(styles)(Toolbar);

export default connect(
  mapStateToProps,
  { 
    changeAppReducer,
    roateImage,
    changeImageReducer
  }
)(withStyleToolbar);

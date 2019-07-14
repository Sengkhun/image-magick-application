import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Popover, withStyles } from '@material-ui/core';
import { SketchPicker } from 'react-color';
import _ from 'lodash';

import { IconButton } from '../Button';

import { changeAppReducer } from 'actions/AppActions';
import { 
  changeImageReducer, 
  roateImage 
} from 'actions/ImageActions';
import { changeTypeToolReducer } from 'actions/TypeToolActions';

class Toolbar extends PureComponent {

  state = {
    anchorEl: null
  };

  componentWillMount() {
    this.props.changeAppReducer({ selected: '' });
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
    this.props.changeAppReducer({ 
      selected: title, 
      controlPanel: 'colorPicker',
    });
  };

  openBrightnessPanel = title => () => {
    this.props.changeAppReducer({ selected: title, controlPanel: 'brightness' });
  };

  openResizePanel = title => () => {
    this.props.changeAppReducer({ selected: title, controlPanel: 'imageSize' });
  };

  openColorModal = e => {
    this.setState({ anchorEl: event.currentTarget });
  };

  onColorModalClose = () => {
    this.setState({ anchorEl: null });
  };

  onChangeColor = e => {
    this.props.changeTypeToolReducer({ color: e.hex });
  };

  typeImage = title => () => {
    this.props.changeAppReducer({ 
      selected: title, 
      cursor: 'text',
      controlPanel: 'text'
    });
  };

  drawImage = title => () => {
    this.props.changeAppReducer({ 
      selected: title, 
      cursor: 'url("public/icons/pencil.png"), auto',
      controlPanel: ''
    });
  };

  tools = [
    // { title: 'Move tool', icon: 'fa-arrows-alt', onClick: this.moveImage },
    { title: 'Rotate tool', icon: 'fa-undo', onClick: this.roateImage },
    { title: 'Color tool', icon: 'fa-palette', onClick: this.colorImage },
    { title: 'Brightness/Contrast tool', icon: 'fa-adjust', onClick: this.openBrightnessPanel },
    { title: 'Resize tool', icon: 'fa-compress-arrows-alt', onClick: this.openResizePanel },
    { title: 'Type tool', icon: 'fa-font', onClick: this.typeImage },
    // { title: 'Pen tool', icon: 'fa-pen', onClick: this.drawImage },
  ];

  render() {

    const { anchorEl } = this.state;
    const { classes, selected, color } = this.props;

    const openColorModal = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

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
        <div className={classes.colorContainer}>
          <div 
            className={classes.color} 
            style={{ backgroundColor: color }}
            aria-describedby={id}
            onClick={this.openColorModal}
          >
          </div>
          { openColorModal && 
            <Popover
              id={id}
              className={classes.modalContainer}
              open={openColorModal}
              onClose={this.onColorModalClose}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'center',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'center',
                horizontal: 'left',
              }}
            >
              <SketchPicker  
                className={classes.colorPicker}
                color={color}
                onChangeComplete={this.onChangeColor}
              />
            </Popover>
          }
        </div>
      </div>
    )
  }
}

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
  },
  colorContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  color: {
    width: 30,
    height: 30,
    cursor: 'pointer'
  },
  colorPicker: {
    marginBottom: theme.spacing(2)
  },
  // modalContainer: {
  //   backgroundColor: '#535353'
  // }
});

const mapStateToProps = ({ AppReducer, ImageReducer, TypeToolReducer }) => ({
  selected: AppReducer.selected,
  loading: AppReducer.loading,
  reloadImage: AppReducer.reloadImage,
  images: ImageReducer.images,
  color: TypeToolReducer.color,
});

const withStyleToolbar = withStyles(styles)(Toolbar);

export default connect(
  mapStateToProps,
  { 
    changeAppReducer,
    roateImage,
    changeImageReducer,
    changeTypeToolReducer
  }
)(withStyleToolbar);

import React, { PureComponent, Fragment } from 'react';
import { SketchPicker } from 'react-color';
import { connect } from 'react-redux';
import _ from 'lodash';
import { withStyles } from '@material-ui/core';

import { Button } from '../Button';

import { changeAppReducer } from 'actions/AppActions';
import { 
  colorizeImage, 
  changeImageReducer 
} from 'actions/ImageActions';

const styles = theme => ({
  title: {
    color: '#dddddd',
    marginBottom: theme.spacing(2)
  },
  colorPicker: {
    marginBottom: theme.spacing(2)
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  }
});

class ColorPicker extends PureComponent {

  state = {
    hexColor: '',
    rgbColor: ''
  };

  onChangeColor = e => {
    const { r, g , b } = e.rgb;
    this.setState({ 
      hexColor: e.hex,
      rgbColor: `${r}, ${g}, ${b}`
    });
  };

  onSaveClick = () => {
    const { rgbColor } = this.state;
    const { loading, images } = this.props;

    // if loading, do nothing
    if (loading) return;

    this.props.changeAppReducer({ loading: true });
    const currentImage = _.last(images);

    if (currentImage) {
      const callback = (ok, error) => {
        if (!ok) {
          alert(error);
        }
        this.props.changeAppReducer({ 
          loading: false, 
          reloadImage: true
        });
      };
      this.props.colorizeImage(currentImage, rgbColor, callback);
    }
  };

  render() {

    const { hexColor, filterColor } = this.state;
    const { classes, onCancel } = this.props;

    return (
      <Fragment>
        <div className={classes.title}>
          Color Range Filter:
        </div>

        <SketchPicker  
          className={classes.colorPicker}
          color={hexColor}
          onChangeComplete={this.onChangeColor}
        />

        <div className={classes.buttonContainer}>
          <Button 
            dim 
            title='Cancel' 
            onClick={onCancel}
          />
          &nbsp;&nbsp;&nbsp;
          <Button 
            title='Apply'
            onClick={this.onSaveClick}
          />
        </div>
      </Fragment>
    )
  }

}

const mapStateToProps = ({ AppReducer, ImageReducer }) => ({
  loading: AppReducer.loading,
  images: ImageReducer.images
});

const withStyleColorPicker = withStyles(styles)(ColorPicker);

export default connect(
  mapStateToProps,
  { 
    changeAppReducer,
    colorizeImage,
    changeImageReducer
  }
)(withStyleColorPicker);

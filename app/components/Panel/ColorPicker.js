import React, { PureComponent, Fragment } from 'react';
import { SketchPicker } from 'react-color';
import { connect } from 'react-redux';
import im from 'imagemagick';
import { withStyles } from '@material-ui/core';

import { Button } from '../Button';

import { changeAppReducer } from '../../_actions/AppActions';

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
    const { loading, imagePath, changeAppReducer } = this.props;

    // if loading, do nothing
    if (loading) return;

    this.props.changeAppReducer({ loading: true });

    if (imagePath) {
      im.convert(['-colorize', rgbColor, imagePath, imagePath],
        function(err, stdout) {
          changeAppReducer({
            loading: false,
            reloadImage: true,
            cursor: 'default'
          });
        }
      );
    }
  };

  render() {

    const { hexColor, filterColor } = this.state;
    const { classes, onCancel } = this.props;

    return (
      <Fragment>
        <div className={classes.title}>
          Color Filter:
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
            title='Save'
            onClick={this.onSaveClick}
          />
        </div>
      </Fragment>
    )
  }

}

const mapStateToProps = ({ AppReducer, ImageReducer }) => ({
  loading: AppReducer.loading,
  imagePath: ImageReducer.imagePath
});

const withStyleColorPicker = withStyles(styles)(ColorPicker);

export default connect(
  mapStateToProps,
  { 
    changeAppReducer
  }
)(withStyleColorPicker);

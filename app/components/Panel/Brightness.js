import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { 
  Input,
  Slider, 
  Typography,
  withStyles 
} from '@material-ui/core';

import { Button } from '../Button';

import { changeAppReducer } from 'actions/AppActions';
import { 
  brightnessAndContrast,
  changeImageReducer 
} from 'actions/ImageActions';

class Brightness extends PureComponent {

  state = {
    brightness: 0,
    contrast: 0,
  };

  handleSliderChange = name => (event, newValue) => {
    this.setState({ [`${name}`]: newValue });
  };

  handleInputChange = name => event => {
    const newValue = event.target.value;
    if (newValue) {
      this.setState({ [`${name}`]: Number(newValue) });      
    }
  };

  onSaveClick = () => {
    const { loading, images } = this.props;

    // if loading, do nothing
    if (loading) return;

    this.props.changeAppReducer({ loading: true });
    const currentImage = _.last(images);

    if (currentImage) {
      const { brightness, contrast } = this.state;
      const callback = (ok, error) => {
        if (!ok) {
          alert(error);
        }
        this.props.changeAppReducer({ 
          loading: false, 
          reloadImage: true
        });
      };
      this.props.brightnessAndContrast(currentImage, brightness, contrast, callback);
    }
  };

  render() {
    
    const { brightness, contrast } = this.state;
    const { classes, onCancel } = this.props;

    return (
      <Fragment>
        <div className={classes.title}>
          Filter:
        </div>

        <div className={classes.sliderTitleContainer}>
          <Typography 
            className={classes.sliderTitle} 
            gutterBottom
          >
            Brightness
          </Typography>

          <Input
              className={classes.input}
              value={brightness}
              onChange={this.handleInputChange('brightness')}
              inputProps={{
                step: 1,
                min: -100,
                max: 100,
                type: 'number',
                'aria-labelledby': 'input-slider',
              }}
            />
        </div>

        <Slider
          className={classes.slider}
          min={-100}
          max={100}
          value={brightness}
          onChange={this.handleSliderChange('brightness')}
          aria-labelledby="input-slider"
        />
        <br/>

        <div className={classes.sliderTitleContainer}>
          <Typography 
            className={classes.sliderTitle} 
            gutterBottom
          >
            Contrast
          </Typography>

          <Input
              className={classes.input}
              value={contrast}
              onChange={this.handleInputChange('contrast')}
              inputProps={{
                step: 1,
                min: -100,
                max: 100,
                type: 'number',
                'aria-labelledby': 'input-slider',
              }}
            />
        </div>

        <Slider
          className={classes.slider}
          min={-100}
          max={100}
          value={contrast}
          onChange={this.handleSliderChange('contrast')}
          aria-labelledby="input-slider"
        />
        <br/>
        
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

const styles = theme => ({
  title: {
    color: '#dddddd',
    marginBottom: theme.spacing(2)
  },
  sliderTitleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  sliderTitle: {
    color: '#dddddd',
  },
  input: {
    color: '#dddddd',
    padding: 0,
    width: 40
  },
  slider: {
    width: '100%',
    color: '#dddddd'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  }
});

const mapStateToProps = ({ AppReducer, ImageReducer }) => ({
  loading: AppReducer.loading,
  images: ImageReducer.images
});

const withStyleBrightness = withStyles(styles)(Brightness);

export default connect(
  mapStateToProps,
  { 
    changeAppReducer,
    brightnessAndContrast,
    changeImageReducer
  }
)(withStyleBrightness);

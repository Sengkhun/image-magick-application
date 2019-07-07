import React, { PureComponent, Fragment } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import sizeOf from 'image-size';
import im from 'imagemagick';
import fs from 'fs';
import { withStyles } from '@material-ui/core';

import Input from '../Input';
import { Button } from '../Button';

import { changeAppReducer } from '../../_actions/AppActions';

const styles = theme => ({
  title: {
    color: '#dddddd',
    marginBottom: theme.spacing(2)
  },
  sizeContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2)
  },
  chainContainer: {
    display: 'flex',
    alignItems: 'center',
    border: '2.5px solid #7d7d7d',
    width: 20,
    height: 40,
    borderRightWidth: 0,
    marginLeft: theme.spacing(1.5),
    marginRight: theme.spacing(1.5)
  },
  chainBackground: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -7.5,
    height: '70%',
    width: 15,
    backgroundColor: '#535353',
    borderRadius: 4
  },
  chainBackgroundSelected: {
    backgroundColor: '#383838'
  },
  chainIcon: {
    width: '50%',
    cursor: 'pointer'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  }
});

class Resize extends PureComponent {

  state = {
    imageOriginalPath: '',
    proportion: true,
    originalWidth: 0,
    originalHeight: 0,
    width: 0,
    height: 0,
    fileSize: 0,
  };

  componentWillMount() {
    this.getImageMetadata();
  }

  onProportionClick = () => {
    this.setState({
      proportion: !this.state.proportion
    });
  };

  onWidthChange = e => {
    const width = e.target.value;
    if (this.state.proportion) {
      const scale = this.state.originalWidth / width;
      const height = Math.round(this.state.originalHeight / scale * 100) / 100;
      this.setState({ width, height });
    } else {
      this.setState({ width });
    }
  };

  onHeightChange = e => {
    const height = e.target.value;
    if (this.state.proportion) {
      const scale = this.state.originalHeight / height;
      const width = Math.round(this.state.originalWidth / scale * 100) / 100;
      this.setState({ width, height });
    } else {
      this.setState({ height });
    }
  };

  onSaveClick = () => {
    const { originalWidth, originalHeight, width, height } = this.state;
    const { imagePath, changeAppReducer } = this.props;
    changeAppReducer({ loading: true });
    if (!(originalWidth === width && originalHeight === height)) {
      im.convert([imagePath, '-resize', `${width}x${height}`, imagePath], function() {
        changeAppReducer({ loading: false, reloadImage: true });
      });
    }
  };

  getImageMetadata = () => {
    const { imagePath, imageOriginalPath } = this.props;
    sizeOf(imagePath, (err, dimensions) => {
      const { width, height } = dimensions;
      const stats = fs.statSync(imagePath);
      let fileSize = stats.size;
      if (fileSize >= 1000000) {
        fileSize = `${Math.round(fileSize / 1000000 * 10) / 10}MB`;
      } else {
        fileSize = `${Math.round(fileSize / 1000)}KB`;
      }
      this.setState({
        imageOriginalPath,
        originalWidth: width, 
        originalHeight: height,
        width, 
        height,
        fileSize
      });
    });
  };
  
  render() {

    const { proportion, width, height, fileSize } = this.state;
    const { classes, onCancel } = this.props;

    // update metadata when change pic
    if (this.state.imageOriginalPath !== this.props.imageOriginalPath) {
      this.getImageMetadata();
    }

    return (
      <Fragment>
        <div className={classes.title}>
          Image Size: {fileSize}
        </div>

        <div className={classes.sizeContainer}>
          <div className={classes.chainContainer}>
            <div 
              className={classNames(
                classes.chainBackground,
                proportion && classes.chainBackgroundSelected
              )}
            >
              <img
                className={classes.chainIcon} 
                src='public/images/icons/chain.png'
                onClick={this.onProportionClick}
              />
            </div>
          </div>

          <div>
            <Input 
              title='Width:'
              rightLabel='Pixels'
              value={width}
              onChange={this.onWidthChange}
            />
            <br/>
            <Input 
              title='Height:'
              rightLabel='Pixels'
              value={height}
              onChange={this.onHeightChange}
            />
          </div>
        </div>
        
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

const mapStateToProps = ({ ImageReducer }) => ({
  imagePath: ImageReducer.imagePath,
  imageOriginalPath: ImageReducer.imageOriginalPath,
});

const withStyleResize = withStyles(styles)(Resize);

export default connect(
  mapStateToProps,
  { 
    changeAppReducer
  }
)(withStyleResize);

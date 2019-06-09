import React, { PureComponent } from 'react';
import classNames from "classnames";
import sizeOf from 'image-size';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import im from 'imagemagick';

import Input from '../Input';
import { Button } from '../Button';

import { changeAppReducer } from '../../_actions/AppActions';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#535353',
    padding: theme.spacing(2)
  },
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

class Panel extends PureComponent {

  state = {
    proportion: true,
    originalWidth: 0,
    originalHeight: 0,
    width: 0,
    height: 0
  };

  componentWillMount() {
    // get image size
    sizeOf(this.props.imagePath, (err, dimensions) => {
      const { width, height } = dimensions;
      this.setState({ 
        originalWidth: width, 
        originalHeight: height,
        width, 
        height
      });
    });
  }

  onProportionClick = () => {
    this.setState({
      proportion: !this.state.proportion
    });
  };

  closePanel = () => {
    this.props.changeAppReducer({ openPanel: false });
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

  render() {
    const { proportion, width, height } = this.state;
    const { classes, openPanel } = this.props;

    if (!openPanel) {
      return null;
    }

    return (
      <div className={classes.root}>

        <div className={classes.title}>
          Image Size: 6M
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
                src='images/icons/chain.png'
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
            onClick={this.closePanel}
          />
          &nbsp;&nbsp;&nbsp;
          <Button 
            title='Save'
            onClick={this.onSaveClick}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ AppReducer, ImageReducer }) => ({
  openPanel: AppReducer.openPanel,
  imagePath: ImageReducer.imagePath
});

const withStylePanel = withStyles(styles)(Panel);

export default connect(
  mapStateToProps,
  { 
    changeAppReducer
  }
)(withStylePanel);

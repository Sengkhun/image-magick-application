import React, { PureComponent, Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';

import Brightness from './Brightness';
import ColorPicker from './ColorPicker';
import Resize from './Resize';
import Text from './Text';

import { changeAppReducer } from '../../_actions/AppActions';
import { changeTypeToolReducer } from 'actions/TypeToolActions';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#535353',
    padding: theme.spacing(2)
  }
});

class Panel extends Component {

  handleControlPanel = () => {
    switch(this.props.controlPanel) {
      case 'imageSize':
        return (
          <Resize
            onCancel={this.onClosePanel}
          />
        );

      case 'colorPicker':
        return (
          <ColorPicker 
            onCancel={this.onClosePanel}
          />
        );

      case 'brightness':
        return (
          <Brightness 
            onCancel={this.onClosePanel}
          />
        );

      case 'text':
        return (
          <Text 
            onCancel={this.onCloseTypeToolPanel}
          />
        );
    }
  }

  onClosePanel = () => {
    this.props.changeAppReducer({ selected: '', controlPanel: '' });
  };

  onCloseTypeToolPanel = () => {
    this.props.changeAppReducer({ 
      selected: '', 
      controlPanel: '' 
    });
    this.props.changeTypeToolReducer({
      openWriter: false,
      pos: {
        x: 0,
        y: 0
      }
    });
  };

  render() {
    const { classes, controlPanel } = this.props;

    if (controlPanel === '') {
      return null;
    }

    return (
      <div className={classes.root}>
        { this.handleControlPanel() }
      </div>
    )
  }
}

const mapStateToProps = ({ AppReducer, ImageReducer }) => ({
  controlPanel: AppReducer.controlPanel,
  imagePath: ImageReducer.imagePath,
  imageOriginalPath: ImageReducer.imageOriginalPath,
});

const withStylePanel = withStyles(styles)(Panel);

export default connect(
  mapStateToProps,
  { 
    changeAppReducer,
    changeTypeToolReducer
  }
)(withStylePanel);

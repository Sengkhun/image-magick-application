import _ from 'lodash';
import React, { Component, PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { Draggable } from 'components';

import { changeTypeToolReducer } from 'actions/TypeToolActions';

class Home extends Component {

  state = {
    zoom: 1,
  };

  eventLogger = (e, data) => {
    console.log('Event: ', e);
    console.log('Data: ', data);
  };

  onWheel = e => {
    const { zoom } = this.state;
    if (e.altKey) {
      if (e.deltaY < 0) {
        const nextZoom = zoom + .05;
        if (nextZoom <= 3) {
          this.setState({ zoom: nextZoom });
        }
  
      } else if (e.deltaY > 0) {
        const nextZoom = zoom - .05;
        if (nextZoom > .2) {
          this.setState({ zoom: nextZoom });
        }
      }
    }
  };

  onImageMouseDown = e => {
    const { selected, openWriter } = this.props;

    if (!openWriter && selected === 'Type tool') {
      this.props.changeTypeToolReducer({
        openWriter: true,
        pos: {
          x: e.nativeEvent.offsetX,
          y: e.nativeEvent.offsetY
        }
      });
    }
  };

  render() {

    const { zoom } = this.state;

    const {
      selected,
      classes, 
      images, 
      imageOriginalPath, 
      cursor,
      openWriter, 
      pos
    } = this.props;

    if (images.length <= 0) {
      return (
        <div 
          className={classes.root}
          style={{ cursor: `${cursor}` }}
          onWheel={this.onWheel}
        >
        </div>
      );
    }

    return (
      <div 
        className={classes.root}
        style={{ cursor: `${cursor}` }}
        onWheel={this.onWheel}
      >
        <div
          className={classes.imageContainer} 
          style={{ 
            cursor: `${cursor}`, 
            transform: `scale(${zoom})`, 
          }}
        >
          <div className={classes.imageFrame}>
            <img 
              onMouseDown={this.onImageMouseDown}
              className={classes.image} 
              src={`${_.last(images)}?reload=${new Date()}`}
            />
            { openWriter && selected === 'Type tool' &&
              <Draggable pos={pos}>
                <TextareaAutosize 
                  autoFocus
                  className={classes.typewriter} 
                  aria-label="empty textarea"
                />
              </Draggable>
            }
          </div>
        </div>
      </div>
    )
  }
}

const styles = theme => ({
  root: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#282828',
    userSelect: 'none',
    overflow: 'auto'
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageFrame: {
    position: 'relative'
  },
  image: {
    maxHeight: '100%',
    maxWidth: '100%'
  },
  typewriter: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 10,
    left: 10,
    fontSize: 36,
    outline: 'none',
    borderColor: '#000'
  }
});

const mapStateToProps = ({ AppReducer, ImageReducer, TypeToolReducer }) => ({
  selected: AppReducer.selected,
  reloadImage: AppReducer.reloadImage,
  cursor: AppReducer.cursor,
  imageOriginalPath: ImageReducer.imageOriginalPath,
  images: ImageReducer.images,
  openWriter: TypeToolReducer.openWriter,
  pos: TypeToolReducer.pos,
});

const withStyleHome = withStyles(styles)(Home);

export default connect(
  mapStateToProps,
  {
    changeTypeToolReducer
  }
)(withStyleHome);

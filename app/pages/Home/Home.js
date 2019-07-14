import _ from 'lodash';
import React, { Component, PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import check from 'check-types';
import { TextField, withStyles } from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { Draggable } from 'components';

import { drawOnImage } from 'actions/ImageActions';
import { changeTypeToolReducer } from 'actions/TypeToolActions';

class Home extends Component {

  constructor(props) {
    super(props);
    this.imageRef = React.createRef();
    this.textareaRef = React.createRef();
  }

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

  getPos = e => {
    const image = ReactDOM.findDOMNode(this.imageRef.current).getBoundingClientRect();
    const textarea = ReactDOM.findDOMNode(this.textareaRef.current).getBoundingClientRect();
    const pos = {
      x: textarea.x - image.x + 1,
      y: textarea.y - image.y + textarea.height - 7
    }
    this.props.changeTypeToolReducer({ pos });
  };

  onTextChange = e => {
    this.props.changeTypeToolReducer({ text: e.target.value });
  };

  onImageMouseUp = e => {
    const image = ReactDOM.findDOMNode(this.imageRef.current).getBoundingClientRect();
    const textarea = ReactDOM.findDOMNode(this.textareaRef.current).getBoundingClientRect();
    const pos = {
      x: textarea.x - image.x + 1,
      y: textarea.y - image.y + textarea.height - 7
    }
    this.props.changeTypeToolReducer({ pos });
  };

  onImageMouseDown = e => {
    const { selected, openWriter } = this.props;
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    if (!openWriter && selected === 'Type tool') {
      this.props.changeTypeToolReducer({
        openWriter: true,
        pos: { x, y }
      });
    } else if (selected == 'Pen tool') {
      const { color, images } = this.props;
      const currentImage = _.last(images);
      const callback = (ok, error) => {
      };
      this.props.drawOnImage(currentImage, color, { x, y }, callback);
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
      pos,
      size,
      color,
      font,
      text
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
          <div ref={this.imageRef} className={classes.imageFrame}>
            <img 
              onMouseDown={this.onImageMouseDown}
              onMouseUp={this.onImageMouseUp}
              className={classes.image} 
              src={`${_.last(images)}?reload=${new Date()}`}
            />
            { (text || openWriter && selected === 'Type tool') &&
              <Draggable pos={pos}>
                <TextareaAutosize
                  autoFocus
                  ref={this.textareaRef}
                  className={classes.typewriter} 
                  onMouseUp={this.getPos}
                  aria-label="empty textarea"
                  style={{ fontFamily: font, fontSize: `${size}px`, color }}
                  onChange={this.onTextChange}
                  value={text}
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
    outline: 'none',
    border: 'none',
    padding: 0,
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
  size: TypeToolReducer.size,
  color: TypeToolReducer.color,
  font: TypeToolReducer.font,
  text: TypeToolReducer.text,
});

const withStyleHome = withStyles(styles)(Home);

export default connect(
  mapStateToProps,
  {
    changeTypeToolReducer,
    drawOnImage
  }
)(withStyleHome);

import React, { Component, PureComponent } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';

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
    justifyContent: 'center',
    height: '95%',
  },
  image: {
    maxHeight: '100%',
    maxWidth: '100%'
  },
  blankPaper: {
    height: 500,
    width: 300,
    backgroundColor: 'white'
  }
});

class Home extends Component {

  state = {
    zoom: 1
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

  render() {

    const { zoom } = this.state;

    const {
      classes, 
      imagePath, 
      imageOriginalPath, 
      cursor
    } = this.props;

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
          {
            imagePath
            ? <img 
                className={classes.image} 
                src={imagePath + `?reload=${new Date()}`}
              />
            : <div className={classes.blankPaper}></div>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ AppReducer, ImageReducer }) => ({
  reloadImage: AppReducer.reloadImage,
  cursor: AppReducer.cursor,
  imageOriginalPath: ImageReducer.imageOriginalPath,
  imagePath: ImageReducer.imagePath,
});

const withStyleHome = withStyles(styles)(Home);

export default connect(
  mapStateToProps,
  null
)(withStyleHome);

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
    userSelect: 'none'
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: '95%',
    maxWidth: '95%',
    height: '95%',
    cursor: 'all-scroll'
  },
  image: {
    maxHeight: '100%',
    maxWidth: '100%',
  },
  blankPaper: {
    height: 500,
    width: 300,
    backgroundColor: 'white'
  }
});

class Home extends Component {

  eventLogger = (e, data) => {
    console.log('Event: ', e);
    console.log('Data: ', data);
  };

  render() {

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
      >
        <div
          className={classes.imageContainer} 
          style={{ cursor: `${cursor}` }}
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

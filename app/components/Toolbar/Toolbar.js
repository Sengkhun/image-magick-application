import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import _ from 'lodash';
import im from 'imagemagick';

import { IconButton } from '../Button';

import { changeAppReducer } from 'actions/AppActions';
import { 
  changeImageReducer, 
  roateImage 
} from 'actions/ImageActions';

const styles = theme => ({
  root: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    backgroundColor: '#535353',
    padding: `${theme.spacing(1)}px ${theme.spacing(.5)}px`
  },
  icon: {
    marginBottom: `${theme.spacing(1)}px !important`
  }
});

class Toolbar extends PureComponent {

  state = {
    selected: ''
  };

  componentWillMount() {
    this.moveImage('Move tool')();
  }

  changeSelected = selected => {
    if (selected !== this.state.selected) {
      this.setState({ selected });
    }
  };

  moveImage = title => () => {
    this.changeSelected(title);
    this.props.changeAppReducer({ cursor: 'move' });
  };

  roateImage = title => () => {
    const { loading, images, reloadImage } = this.props;

    // if loading, do nothing
    if (loading) return;

    this.changeSelected(title);
    this.props.changeAppReducer({ loading: true });

    const currentImage = _.last(images);
    if (currentImage) {
      const callback = (ok, error) => {
        if (!ok) {
          alert(error);
        }
        this.props.changeAppReducer({ 
          loading: false, 
          reloadImage: true,
          cursor: 'default'
        });
      };
      this.props.roateImage(currentImage, -90, callback);
    }
  };

  colorImage = title => () => {
    this.changeSelected(title);
    this.props.changeAppReducer({ controlPanel: 'colorPicker' });
    // const { loading, imagePath, reloadImage, changeAppReducer } = this.props;

    // // if loading, do nothing
    // if (loading) return;

    // this.changeSelected(title);
    // this.props.changeAppReducer({ loading: true });

    // if (imagePath) {
    //   im.convert(['-colorize', '0,0,50', imagePath, imagePath],
    //     function(err, stdout) {
    //       changeAppReducer({
    //         loading: false, 
    //         reloadImage: true,
    //         cursor: 'default'
    //       });
    //     }
    //   );
    // }
  };

  typeImage = title => () => {
    this.changeSelected(title);
    this.props.changeAppReducer({ cursor: 'text' });
  };

  tools = [
    { title: 'Move tool', icon: 'fa-arrows-alt', onClick: this.moveImage },
    { title: 'Rotate tool', icon: 'fa-undo', onClick: this.roateImage },
    { title: 'Color tool', icon: 'fa-palette', onClick: this.colorImage },
    { title: 'Type tool', icon: 'fa-font', onClick: this.typeImage },
  ];

  render() {

    const { selected } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        { 
          this.tools.map(({ title, icon, onClick }, idx) => (
            <IconButton
              key={idx}
              title={title}
              icon={icon}
              selected={selected === title}
              onClick={onClick(title)}
            />
          ))
        }
      </div>
    )
  }
}

const mapStateToProps = ({ AppReducer, ImageReducer }) => ({
  loading: AppReducer.loading,
  reloadImage: AppReducer.reloadImage,
  images: ImageReducer.images
});

const withStyleToolbar = withStyles(styles)(Toolbar);

export default connect(
  mapStateToProps,
  { 
    changeAppReducer,
    roateImage,
    changeImageReducer
  }
)(withStyleToolbar);

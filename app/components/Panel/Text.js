import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { SketchPicker } from 'react-color';
import _ from 'lodash';
import { 
  ClickAwayListener,
  Input,
  FormControl,
  Select,
  MenuItem,
  Paper,
  withStyles, 
  Typography
} from '@material-ui/core';

import { Button } from '../Button';

import { changeAppReducer } from 'actions/AppActions';
import { 
  addTextOnImage,
  changeImageReducer 
} from 'actions/ImageActions';
import { changeTypeToolReducer } from 'actions/TypeToolActions';

class Text extends PureComponent {

  state = {
    openFont: false,
    openSize: false,
    openColor: false,
  };

  handleChange = name => event => {
    this.props.changeTypeToolReducer({
      [`${name}`]: event.target.value
    })
  };

  handleFontOpen = () => {
    this.setState({ openFont: true });
  };

  handleFontClose = () => {
    this.setState({ openFont: false });
  };

  handleSizeOpen = () => {
    this.setState({ openSize: true });
  };

  handleSizeClose = () => {
    this.setState({ openSize: false });
  };

  handleColorOpen = () => {
    this.setState({ openColor: true });
  };

  handleColorClose = () => {
    this.setState({ openColor: false });
  };

  onChangeColor = e => {
    this.props.changeTypeToolReducer({ color: e.hex });
  };

  onSaveClick = () => {
    const { loading, images } = this.props;

    // if loading, do nothing
    if (loading) return;

    this.props.changeAppReducer({ loading: true });
    const currentImage = _.last(images);

    if (currentImage) {
      const { font, size, color, pos, text } = this.props;
      const callback = (ok, error) => {
        if (!ok) {
          alert(error);
        }
        this.props.changeAppReducer({ 
          loading: false, 
          reloadImage: true
        });
        this.props.changeTypeToolReducer({ openWriter: false, text: '', pos: {} });
      };
      this.props.addTextOnImage(currentImage, font, size, color, pos, text, callback);
    }
  };

  render() {

    const { 
      openFont, 
      openSize,
      openColor
    } = this.state;

    const { 
      classes, 
      onCancel,
      font, 
      size,
      text,
      color
    } = this.props;

    return (
      <Fragment>
        <div className={classes.title}>
          Type Tool Properties:
        </div>

        <FormControl className={classes.formControl}>
          <Typography className={classes.inputLabel}>
            Font: 
          </Typography>

          <Select
            native
            className={classes.select}
            open={openFont}
            value={font}
            onClose={this.handleFontClose}
            onOpen={this.handleFontOpen}
            onChange={this.handleChange('font')}
          >
            <option value='Arial'>Arial</option>
            <option value='helvetica'>Helvetica</option>
            <option value='roboto'>Roboto</option>
            <option value='sans-serif'>Sans Serif</option>
            <option value='Times New Roman'>Times New Roman</option>
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <Typography className={classes.inputLabel}>
            Size: 
          </Typography>

          <Input
            className={classes.select}
            value={size}
            onChange={this.handleChange('size')}
            inputProps={{
              step: 1,
              type: 'number'
            }}
          />
        </FormControl>

        <FormControl className={classes.formControl}>
          <Typography className={classes.inputLabel}>
            Color: 
          </Typography>

          <div 
            className={classes.color}
            style={{ backgroundColor: color }}
            onClick={this.handleColorOpen}
          />
        </FormControl>
        { openColor && 
          <ClickAwayListener onClickAway={this.handleColorClose}>
            <SketchPicker  
              className={classes.colorPicker}
              color={color}
              onChangeComplete={this.onChangeColor}
            />
          </ClickAwayListener>
        }
        
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
  formControl: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  inputLabel: {
    color: '#dddddd',
    fontSize: 14,
    marginRight: theme.spacing(2)
  },
  select: {
    color: '#dddddd',
    fontSize: 14,
    width: '100%'
  },
  color: {
    cursor: 'pointer',
    height: 25,
    width: 50,
    borderRadius: 4
  },
  colorPicker: {
    marginBottom: theme.spacing(2)
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  }
});

const mapStateToProps = ({ AppReducer, ImageReducer, TypeToolReducer }) => ({
  loading: AppReducer.loading,
  images: ImageReducer.images,
  font: TypeToolReducer.font,
  size: TypeToolReducer.size,
  text: TypeToolReducer.text,
  color: TypeToolReducer.color,
  pos: TypeToolReducer.pos,
});

const withStyleText = withStyles(styles)(Text);

export default connect(
  mapStateToProps,
  { 
    changeAppReducer,
    addTextOnImage,
    changeImageReducer,
    changeTypeToolReducer
  }
)(withStyleText);

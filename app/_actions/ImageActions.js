import im from 'imagemagick';
import { imageNameHepler } from 'lib/helpers';

// ----------------------------------------

export const IMAGE_ACTION_TYPES = {
  openImage: 'openImage',
  addNewImage: 'addNewImage',
  undoImage: 'undoImage',
  changeImageReducer: 'changeImageReducer',
};

// ----------------------------------------

export const changeImagePath = imagePath => ({
  type: IMAGE_ACTION_TYPES.openImage,
  payload: imagePath
});

// ----------------------------------------

export const roateImage = (image, roateDegree, callback) => {
  return async dispatch => {
    const imagePath = imageNameHepler(image);
    im.convert(['-rotate', `${roateDegree}`, image, imagePath],
      async function(err, stdout) {
        if (err) {
          callback(false, err);
        } else {
          await dispatch({
            type: IMAGE_ACTION_TYPES.addNewImage,
            payload: imagePath
          });
          callback(true);
        }
      }
    );

  };
};

// ----------------------------------------

export const flipImage = (image, flip, callback) => {
  return async dispatch => {
    const imagePath = imageNameHepler(image);
    im.convert([image, flip, imagePath],
      async function(err, stdout) {
        if (err) {
          callback(false, err);
        } else {
          await dispatch({
            type: IMAGE_ACTION_TYPES.addNewImage,
            payload: imagePath
          });
          callback(true);
        }
      }
    );
  };
};

// ----------------------------------------

export const resizeImage = (image, width, height, callback) => {
  return async dispatch => {
    const imagePath = imageNameHepler(image);
    im.convert([image, '-resize', `${width}x${height}`, imagePath], 
      async function(err) {
        if (err) {
          callback(false, err);
        } else {
          await dispatch({
            type: IMAGE_ACTION_TYPES.addNewImage,
            payload: imagePath
          });
          callback(true);
        }
      }
    );
  };
};

// ----------------------------------------

export const colorizeImage = (image, rgbColor, callback) => {
  return async dispatch => {
    const imagePath = imageNameHepler(image);
    im.convert(['-colorize', rgbColor, image, imagePath], 
      async function(err) {
        if (err) {
          callback(false, err);
        } else {
          await dispatch({
            type: IMAGE_ACTION_TYPES.addNewImage,
            payload: imagePath
          });
          callback(true);
        }
      }
    );
  };
};

// ----------------------------------------

export const brightnessAndContrast = (image, brigthness, contrast, callback) => {
  return async dispatch => {
    const imagePath = imageNameHepler(image);
    im.convert(['-brightness-contrast', `${brigthness}x${contrast}`, image, imagePath], 
      async function(err) {
        if (err) {
          callback(false, err);
        } else {
          await dispatch({
            type: IMAGE_ACTION_TYPES.addNewImage,
            payload: imagePath
          });
          callback(true);
        }
      }
    );
  };
};

// ----------------------------------------

export const addTextOnImage = (image, font, size, text, callback) => {
  return async dispatch => {
    const imagePath = imageNameHepler(image);
    im.convert([image, '-font', font, '-pointsize', size, '-draw', `text 200,200 '${text}'`, imagePath], 
      async function(err) {
        if (err) {
          callback(false, err);
        } else {
          await dispatch({
            type: IMAGE_ACTION_TYPES.addNewImage,
            payload: imagePath
          });
          callback(true);
        }
      }
    );
  };
};

// ----------------------------------------

export const changeImageReducer = args => ({
  type: IMAGE_ACTION_TYPES.changeImageReducer,
  payload: args
});

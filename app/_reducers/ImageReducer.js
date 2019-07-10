import _ from 'lodash';
import fs from 'fs';
import im from 'imagemagick';
import sizeOf from 'image-size';
import { removeFile, imageNameHepler } from 'lib/helpers';

import { IMAGE_ACTION_TYPES } from 'actions/ImageActions';

const INITIAL_STATE = {
  imageOriginalPath: '',
  images: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    
    case IMAGE_ACTION_TYPES.openImage: {
      // remove previous image cache
      _.forEach(state.images, oldImagePath => {
        removeFile(oldImagePath);
      });

      const imageOriginalPath = action.payload;
      if (imageOriginalPath) {
        // copy image to resource
        const imagePath = imageNameHepler(imageOriginalPath, true);
        fs.copyFileSync(imageOriginalPath, imagePath);
        
        return {
          ...state,
          imageOriginalPath,
          images: [imagePath],
        }
      }

      return INITIAL_STATE;
    }
    
    case IMAGE_ACTION_TYPES.addNewImage: {
      const newImagePath = action.payload;
      if (newImagePath) {
        const images = state.images;
        return {
          ...state,
          images: [...images, newImagePath],
        }
      }
      return INITIAL_STATE;
    }

    case IMAGE_ACTION_TYPES.undoImage: {
      state.images.pop();
      console.log(state.images)
      return {
        ...state,
        images: [...state.images]
      }
    }

    case IMAGE_ACTION_TYPES.changeImageReducer: {
      return {
        ...state,
        ...action.payload
      }
    }

    default: {
      return state;
    }
    
  }
};
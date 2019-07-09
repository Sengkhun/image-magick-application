import fs from 'fs';
import sizeOf from 'image-size';
import { IMAGE_ACTION_TYPES } from 'actions/ImageActions';
import { IMAGE_DIR } from 'constants';
import { imageNameHepler } from 'lib/helpers';

const INITIAL_STATE = {
  imageOriginalPath: '',
  activeIndex: 0,
  images: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    
    case IMAGE_ACTION_TYPES.openImage: {
      const imageOriginalPath = action.payload;
      if (imageOriginalPath) {
        // copy image to resource
        const imagePath = imageNameHepler(imageOriginalPath, 0);
        fs.copyFileSync(imageOriginalPath, imagePath);
        
        return {
          ...state,
          imageOriginalPath,
          images: [imagePath],
        }
      }

      return INITIAL_STATE;
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
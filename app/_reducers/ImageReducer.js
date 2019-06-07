import fs from 'fs';
import sizeOf from 'image-size';
import { IMAGE_ACTION_TYPES } from '../_actions/ImageActions';
import imageDir from '../images';

const INITIAL_STATE = {
  imageOriginalPath: '',
  imagePath: '',
  reload: true,
  cursor: 'default',
  width: 0,
  height: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    
    case IMAGE_ACTION_TYPES.changeImagePath: {
      const imageOriginalPath = action.payload;
      let imagePath = '';
      if (imageOriginalPath) {
        // copy image to resource
        fs.copyFileSync(imageOriginalPath, `app/images/temp`);

        // path to display image on ui
        imagePath = imageDir;

        // get image size
        sizeOf(imageOriginalPath, function (err, dimensions) {
          if (!err) {
            const { width, height } = dimensions;
            return {
              ...state,
              imageOriginalPath,
              imagePath,
              width, 
              height
            };
          }
        });
      }
    }

    case IMAGE_ACTION_TYPES.reloadImage: {
      const reload = !state.reload;
      return {
        ...state,
        reload
      }
    }

    case IMAGE_ACTION_TYPES.changeCursor: {
      return {
        ...state,
        cursor: action.payload
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
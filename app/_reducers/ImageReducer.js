import fs from 'fs';
import sizeOf from 'image-size';
import { IMAGE_ACTION_TYPES } from 'actions/ImageActions';
import imageDir from 'images';

const INITIAL_STATE = {
  imageOriginalPath: '',
  imagePath: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    
    case IMAGE_ACTION_TYPES.changeImagePath: {
      const imageOriginalPath = action.payload;
      let imagePath = '';
      if (imageOriginalPath) {
        // copy image to resource
        fs.copyFileSync(imageOriginalPath, `app/public/images/temp`);

        // path to display image on ui
        console.log("TCL: imageDir", imageDir)
        imagePath = imageDir;
      }
      return {
        ...state,
        imageOriginalPath,
        imagePath
      };
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
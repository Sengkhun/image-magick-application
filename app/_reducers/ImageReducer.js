import { IMAGE_ACTION_TYPES } from '../_actions/ImageActions';

const INITIAL_STATE = {
  imagePath: '/helloworld',
  go: 'go'
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    
    case IMAGE_ACTION_TYPES.changeImagePath: {
			return {
        ...state,
        imagePath: action.payload
      };
    }

    default: {
      return state;
    }
    
  }
};
import { BRIGHTNESS_ACTION_TYPES } from 'actions/BrightnessActions';

const INITIAL_STATE = {
  brightness: 0,
  contrast: 0,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BRIGHTNESS_ACTION_TYPES.changeBrightnessReducer: {
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

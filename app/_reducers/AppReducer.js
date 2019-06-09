import { APP_ACTION_TYPES } from '../_actions/AppActions';

const INITIAL_STATE = {
  openPanel: false,
  loading: false,
  reloadImage: 0,
  cursor: 'default'
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case APP_ACTION_TYPES.changeAppReducer: {
      const { reloadImage, ...payload } = action.payload;
      if (reloadImage) {
        return {
          ...state,
          ...payload,
          reloadImage: state.reloadImage + 1
        };
      } else {
        return {
          ...state,
          ...action.payload
        }
      }
    }

    default: {
      return state;
    }
    
  }
};

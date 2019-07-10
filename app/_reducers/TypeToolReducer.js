import { TYPE_TOOL_ACTION_TYPES } from 'actions/TypeToolActions';

const INITIAL_STATE = {
  openWriter: false,
  font: 'helvetica',
  size: 100,
  text: 'Hello world',
  color: '#000',
  pos: {
    x: 0,
    y: 0
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPE_TOOL_ACTION_TYPES.changeTypeToolReducer: {
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

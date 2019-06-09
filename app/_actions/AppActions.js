export const APP_ACTION_TYPES = {
  changeAppReducer: 'changeAppReducer',
};

// ----------------------------------------

export const changeAppReducer = args => ({
  type: APP_ACTION_TYPES.changeAppReducer,
  payload: args
});

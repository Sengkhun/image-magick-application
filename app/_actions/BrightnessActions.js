export const BRIGHTNESS_ACTION_TYPES = {
  changeBrightnessReducer: 'changeBrightnessReducer',
};

// ----------------------------------------

export const changeBrightnessReducer = args => ({
  type: BRIGHTNESS_ACTION_TYPES.changeBrightnessReducer,
  payload: args
});

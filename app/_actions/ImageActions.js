export const IMAGE_ACTION_TYPES = {
  changeImagePath: 'changeImagePath',
  changeImageReducer: 'changeImageReducer',
};

// ----------------------------------------

export const changeImagePath = imagePath => ({
  type: IMAGE_ACTION_TYPES.changeImagePath,
  payload: imagePath
});

// ----------------------------------------

export const changeImageReducer = args => ({
  type: IMAGE_ACTION_TYPES.changeImageReducer,
  payload: args
});

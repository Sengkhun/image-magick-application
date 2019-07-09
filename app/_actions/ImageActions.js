export const IMAGE_ACTION_TYPES = {
  openImage: 'openImage',
  changeImageReducer: 'changeImageReducer',
};

// ----------------------------------------

export const changeImagePath = imagePath => ({
  type: IMAGE_ACTION_TYPES.openImage,
  payload: imagePath
});

// ----------------------------------------

export const changeImageReducer = args => ({
  type: IMAGE_ACTION_TYPES.changeImageReducer,
  payload: args
});

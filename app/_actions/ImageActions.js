export const IMAGE_ACTION_TYPES = {
  reloadImage: 'reloadImage',
  changeImagePath: 'changeImagePath',
  changeCursor: 'changeCursor',
  changeImageReducer: 'changeImageReducer',
};

// ----------------------------------------

export const changeImagePath = imagePath => ({
  type: IMAGE_ACTION_TYPES.changeImagePath,
  payload: imagePath
});

// ----------------------------------------

export const reloadImage = () => ({
  type: IMAGE_ACTION_TYPES.reloadImage
});

// ----------------------------------------

export const changeCursor = cursor => ({
  type: IMAGE_ACTION_TYPES.changeCursor,
  payload: cursor
});

// ----------------------------------------

export const changeImageReducer = args => ({
  type: IMAGE_ACTION_TYPES.changeImageReducer,
  payload: args
});

export const IMAGE_ACTION_TYPES = {
  changeImagePath: 'changeImagePath',
};

// ----------------------------------------

export const changeImagePath = imagePath => ({
  type: IMAGE_ACTION_TYPES.changeImagePath,
  payload: imagePath
});

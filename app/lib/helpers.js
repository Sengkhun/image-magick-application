import fs from 'fs';
import path from 'path';

// ===================================

export const imageNameHepler = (imagePath, index) => {
  const dirname = path.dirname(imagePath);
  const filename = path.basename(imagePath);
  return `${dirname}/.${index}${filename}`;
};

// ===================================

export const removeFile = file => {
  try {
    fs.unlinkSync(file);
  } catch (error) {
    fsError(error);
  }
};

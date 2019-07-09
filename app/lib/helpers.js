import fs from 'fs';
import path from 'path';

// ===================================

export const imageNameHepler = (imagePath, middlename) => {
  const dirname = path.dirname(imagePath);
  const filename = path.basename(imagePath);
  return `${dirname}/.${middlename || new Date()}${filename}`;
};

// ===================================

export const removeFile = file => {
  try {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
    }
  } catch (error) {
    console.log("TCL: error", error)
  }
};

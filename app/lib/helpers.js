import _ from 'lodash';
import fs from 'fs';
import path from 'path';

// ===================================

export const imageNameHepler = (imagePath, first) => {
  const dirname = path.dirname(imagePath);
  const filename = path.basename(imagePath);
  if (first) {
    return `${dirname}/.0.${filename}`;
  } else {
    let splitted = filename.split('.');
    splitted[1] = Number(splitted[1]) + 1;
    const newFilename = splitted.join('.');
    return `${dirname}/${newFilename}`;
  }
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

import { extname } from "path";
import { randomBytes } from 'crypto';

export const imageFileFilter = (req, file, callback) => {
  let valid = false;
  for (let mimeType in ['image/jpeg', 'image/png', 'image/gif', 'image/webp']) {
    if (file.mimetype === mimeType) {
      valid = true;
      break;
    }
  }
  callback(null, valid);
};

export const editFilename = (req, file, callback) => {
  const fileExtName: string = extname(file.originalname);
  randomBytes(25, (_, buf) => {
    const newFilename: string = buf.toString('hex');
    callback(null, `${newFilename}${fileExtName}`);
  });
};
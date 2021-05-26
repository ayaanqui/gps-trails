import { extname } from "path";

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

const genRandomString = (len: number) => Math.round(Math.random() * len).toString(len);

export const editFilename = (req, file, callback) => {
  const name: string = file.originalname.split('.')[0];
  const fileExtName: string = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => genRandomString(16))
    .join('');
  callback(null, `${randomName}${fileExtName}`);
};
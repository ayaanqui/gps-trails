import { extname } from "path";
import { randomBytes } from 'crypto';
import { diskStorage } from 'multer';
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";

export const imageFileFilter = (req, file, callback) => {
  for (let mimeType in ['image/jpeg', 'image/png', 'image/gif', 'image/webp']) {
    if (file.mimetype === mimeType) {
      callback(null, true);
      return;
    }
  }
  callback(null, false);
};

export const editFilename = (req, file, callback) => {
  const fileExtName: string = extname(file.originalname);
  randomBytes(25, (_, buf) => {
    const newFilename: string = buf.toString('hex');
    callback(null, `${newFilename}${fileExtName}`);
  });
};

export const imageUploadConfig = (): MulterOptions => {
  return {
    storage: diskStorage({
      destination: './uploads',
      filename: editFilename,
    }),
    // fileFilter: imageFileFilter
  };
};
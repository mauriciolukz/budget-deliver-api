import { UnprocessableEntityException } from '@nestjs/common';

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return callback(
      new UnprocessableEntityException('Only image files are allowed!'),
    );
  }
  callback(null, true);
};

export const editFileName = (req, file: Express.Multer.File, callback) => {
  const fileExtName = extname(file.mimetype);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 10000).toString(36))
    .join('');
  callback(null, `${randomName}${fileExtName}`);
};

function extname(mimetype: string) {
  return `.${mimetype.split('/')[1]}`;
}

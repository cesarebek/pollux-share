const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '_' + file.originalname);
  },
});

const limits = {
  fileSize: 1024 * 1024 * 2,
};

const fileFilter = (req, file, cb) => {
  //Reject a file
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return cb(new Error('This file extension is not supported.'), false);
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  limits: limits,
  fileFilter: fileFilter,
});

module.exports = upload;

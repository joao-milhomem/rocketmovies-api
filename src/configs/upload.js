const crypto = require("crypto");
const multer = require("multer");

const path = require("path");
const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp");
const UPLOADS_FOLDER = path.resolve(__dirname, "..", "..", "uploads");

const MULTER_CONFIG = {
  storage: multer.diskStorage({
    destination: TMP_FOLDER,

    filename(request, file, cb) {
      const prefix = crypto.randomBytes(10).toString("hex");
      const filename = `${prefix}_${file.originalname}`;

      return cb(null, filename);
    },
  }),
};

module.exports = {
  TMP_FOLDER,
  UPLOADS_FOLDER,
  MULTER_CONFIG,
};

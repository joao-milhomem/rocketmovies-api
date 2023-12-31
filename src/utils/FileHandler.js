const fs = require("fs");
const path = require("path");

const { TMP_FOLDER, UPLOADS_FOLDER } = require("../configs/upload");

class FileHandler {
  async rescue(file) {
    await fs.promises.rename(
      path.resolve(TMP_FOLDER, file),
      path.resolve(UPLOADS_FOLDER, file)
    );

    return file;
  }

  async delete(file) {
    const filePath = path.resolve(UPLOADS_FOLDER, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

module.exports = FileHandler;

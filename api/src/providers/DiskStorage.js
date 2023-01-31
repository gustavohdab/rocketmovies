const fs = require('fs');
const path = require('path');
const uploadConfig = require('../configs/upload');

class DiskStorage {
  async saveFile(file) {
    const tmpPath = path.resolve(uploadConfig.TMP_FOLDER, file);
    const uploadPath = path.resolve(uploadConfig.UPLOAD_FOLDER, file);

    await fs.promises.rename(tmpPath, uploadPath);

    return file;
  }

  async deleteFile(file) {
    const filePath = path.resolve(uploadConfig.UPLOAD_FOLDER, file);

    try {
      await fs.promises.stat(filePath); // check if the file exists in the upload folder before deleting it 
      await fs.promises.unlink(filePath); // delete the file from the upload folder if it exists 
    } catch (error) { // catch any errors that occur while trying to delete the file 
      return; // return nothing if an error occurs while trying to delete the file 
    }

  }
}

module.exports = DiskStorage;

// Explanation: The code has been declaring two variables for the paths of both the temporary and upload folders, and by adding a try/catch block to handle any errors that occur while trying to delete a file from the upload folder.
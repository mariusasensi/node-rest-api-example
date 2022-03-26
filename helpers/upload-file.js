const fs = require('fs');
const path = require('path');
const {v4: uuidv4} = require('uuid');
const {uploadFile: uploadFileCloudinary, deleteFile: deleteFileCloudinary} = require('../helpers/cloudinary-provider');

const uploadToProvider = async (files, extensions, collection) => {
  if (!files || Object.keys(files).length === 0) {
    throw new Error('No files were uploaded.');
  }

  let file = files.file;
  let extension = path.extname(file.name);
  if (!extensions.includes(extension)) {
    throw new Error('Invalid file.');
  }

  return await uploadFileCloudinary(file.tempFilePath, collection);
}

const uploadFile = (files, extensions, folder) => {
  return new Promise((resolve, reject) => {
    if (!files || Object.keys(files).length === 0) {
      return reject('No files were uploaded.');
    }
  
    let file = files.file;
    let extension = path.extname(file.name);
    if (!extensions.includes(extension)) {
      return reject('Invalid file.');
    }
  
    let name = `${uuidv4()}${extension}`;
    let uploadPath = path.join(__dirname, '../uploads/', `${folder}/`, name);
    file.mv(uploadPath, (err) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
    });
  
    return resolve(name);
  });
};

const deleteFileToProvider = async (url) => {
  const file = url.substring(url.lastIndexOf('/') + 1);
  const name = path.parse(file).name;
  try {
    await deleteFileCloudinary(name);
  } catch(err) {
    console.error(err);
    return false;
  }

  return true;
}

const deleteFile = (filename) => {
  const pathFile = path.join(__dirname, '../uploads/', filename);
  if (!fs.existsSync(pathFile)) {
    return true;
  }

  try {
    fs.unlinkSync(pathFile);
  } catch(err) {
    console.error(err);
    return false;
  }

  return true;
}

module.exports = {uploadToProvider, uploadFile, deleteFileToProvider, deleteFile};
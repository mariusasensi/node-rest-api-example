const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const uploadFile = async (file, collection) => {
  try {
    return await cloudinary.uploader.upload(file, {resource_type: 'image', folder: `node/${collection}`, height: 480, crop: "scale"});
  } catch (error) {
    throw error;
  }
}

const deleteFile = async (public_id) => {
  try {
    return await cloudinary.uploader.destroy(public_id);
  } catch (error) {
    throw error;
  }
}

module.exports = {uploadFile, deleteFile};
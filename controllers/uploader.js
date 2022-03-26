const { uploadFile, uploadToProvider, deleteFile, deleteFileToProvider } = require('../helpers');
const { User, Product } = require('../models');
const path = require('path');

const upload = async (request, response) => {
  uploadFile(request.files, ['.txt'], 'texts')
  .then(
    (filename) => {response.json(`File uploaded to '${filename}'`)},
    (error) => {response.status(400).json(error)}
  );
};

const uploadImageByCollection = async (request, response) => {
  const id = request.params.id;
  const collection = request.params.collection;
  let model;
  switch(collection) {
    case 'users':
      model = User;
    break;
    case 'products':
      model = Product;
    break;
    default:
      return response.status(500).json('Invalid collection');
  }

  let entity = await model.findById(id);
  if (!entity) {
    return response.status(400).json('Entity not found!');
  }

  let picture;
  await uploadFile(request.files, ['.jpg', '.jpeg', '.png'], `${collection}/images`)
  .then(
    (filename) => {picture = filename},
    (error) => {response.status(400).json(error)}
  );

  if (entity.image) {
    deleteFile(`${collection}/images/${entity.image}`);
  }

  entity.image = picture;
  await entity.save();
  const savedEntity = await model.findById(id);

  return response.json(savedEntity);
};

const uploadImageToProviderByCollection = async (request, response) => {
  const id = request.params.id;
  const collection = request.params.collection;
  let model;
  switch(collection) {
    case 'users':
      model = User;
    break;
    case 'products':
      model = Product;
    break;
    default:
      return response.status(500).json('Invalid collection');
  }

  let entity = await model.findById(id);
  if (!entity) {
    return response.status(400).json('Entity not found!');
  }

  try {
    const picture = await uploadToProvider(request.files, ['.jpg', '.jpeg', '.png'], collection);
    if (entity.image) {
      await deleteFileToProvider(entity.image);
    }
  
    entity.image = picture.secure_url;
    await entity.save();
    const savedEntity = await model.findById(id);
  
    return response.json(savedEntity);
  } catch (error) {
    console.error(error);
    return response.status(500).json(error);
  }
};

const getImageByCollection = async(request, response) => {
  const id = request.params.id;
  const collection = request.params.collection;
  let model;
  switch(collection) {
    case 'users':
      model = User;
    break;
    case 'products':
      model = Product;
    break;
    default:
      return response.status(500).json('Invalid collection');
  }

  let entity = await model.findById(id);
  if (!entity) {
    return response.status(400).json('Entity not found!');
  }

  const imagePath = entity.image ? 
    path.join(__dirname, '../uploads/', `${collection}/images/`, entity.image) :
    path.join(__dirname, '../public/assets', 'no-image.jpg');
  return response.sendFile(imagePath);
}

const getImageToProviderByCollection = async (request, response) => {
  const id = request.params.id;
  const collection = request.params.collection;
  let model;
  switch(collection) {
    case 'users':
      model = User;
    break;
    case 'products':
      model = Product;
    break;
    default:
      return response.status(500).json('Invalid collection');
  }

  let entity = await model.findById(id);
  if (!entity) {
    return response.status(400).json('Entity not found!');
  }

  if (!entity.image) {
    return response.sendFile(path.join(__dirname, '../public/assets', 'no-image.jpg'));
  }

  return response.json(entity.image);
}

module.exports = {
  upload, 
  uploadImageByCollection, 
  uploadImageToProviderByCollection,
  getImageByCollection,
  getImageToProviderByCollection
};
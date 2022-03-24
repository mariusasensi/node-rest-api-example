const { User, Category, Product } = require('../models');

const {ObjectId} = require('mongoose').Types;

const seachUsers = async (term) => {
  const isMongoId = ObjectId.isValid(term);

  if (isMongoId) {
    return await User.findById(term);
  }

  const find = new RegExp(term, 'i');
  return await User.find({
    $or: [{name: find}, {mail: find}],
    $and: [{status: true}]
  });
}

const searchCategories = async (term) => {
  const isMongoId = ObjectId.isValid(term);

  if (isMongoId) {
    return await Category.findById(term);
  }

  const find = new RegExp(term, 'i');
  return await Category.find({
    $or: [{name: find}],
    $and: [{status: true}]
  });
}

const searchProducts = async (term) => {
  const isMongoId = ObjectId.isValid(term);

  if (isMongoId) {
    return await Product.findById(term);
  }

  const find = new RegExp(term, 'i');
  return await Product.find({
    $or: [{name: find}, {description: find}],
    $and: [{available: true}, {status: true}]
  }).populate('category').populate('createdBy').populate('updatedBy');
}

const searcher = async (request, response) => {
  const { collection, term } = request.params;

  let result;
  switch (collection) {
    case 'users':
      result = await seachUsers(term);
      break;
    case 'categories':
      result = await searchCategories(term);
      break;
    case 'products':
      result = await searchProducts(term);
      break;
    default:
      return response.status(400).json('Invalid collection parameter.');
  }

  response.json({ results: result });
};

module.exports = { searcher }
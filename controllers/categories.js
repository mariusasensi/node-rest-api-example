const {Category, User} = require('../models');

const getAll = async(request, response) => {
  const {limit = 5, from = 0} = request.query;

  const [total, categories] = await Promise.all([
    Category.countDocuments({status: true}),
    Category.find({status: true}).skip(Number(from)).limit(Number(limit)).populate('createdBy', 'name').populate('updatedBy', 'name')
  ]);

  response.json({total, categories});
};

const getById = async(request, response) => {
  const id = request.params.id;
  const category = await Category.findById(id).populate('createdBy', 'name').populate('updatedBy', 'name');

  response.json(category);
};

const createOne = async(request, response) => {
  const name = request.body.name.toUpperCase();
  const currentUser = request.user;

  const category = new Category({name, status: true, createdBy: currentUser});
  await category.save();
  const newOne = await Category.findOne({name}).populate('createdBy', 'name').populate('updatedBy', 'name');

  response.status(201).json({newOne});
};

const updateOne = async(request, response) => {
  const id = request.params.id;
  const name = request.body.name.toUpperCase();
  const currentUser = request.user;

  await Category.findByIdAndUpdate(id, {name, updatedBy: currentUser});
  const updated = await Category.findById(id).populate('createdBy', 'name').populate('updatedBy', 'name');
  response.json(updated);
};

const deleteOne = async(request, response) => {
  const id = request.params.id;
  const currentUser = request.user;

  await Category.findByIdAndUpdate(id, {'status': false, updatedBy: currentUser});
  const updated = await Category.findById(id).populate('createdBy', 'name').populate('updatedBy', 'name');
  response.json({updated});
};

module.exports = {getAll, getById, createOne, updateOne, deleteOne}
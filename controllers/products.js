const {Category, Product} = require('../models');

const getAll = async(request, response) => {
  const {limit = 5, from = 0} = request.query;
  let filters = {status: true};
  const [total, products] = await Promise.all([
    Product.countDocuments(filters),
    Product.find(filters)
    .skip(Number(from))
    .limit(Number(limit))
    .populate('createdBy', 'name')
    .populate('updatedBy', 'name')
    .populate('category', 'name')
  ]);

  response.json({total, products});
};

const getById = async(request, response) => {
  const id = request.params.id;
  const product = await Product.findById(id).populate('createdBy', 'name').populate('updatedBy', 'name').populate('category', 'name');

  response.json(product);
};

const createOne = async(request, response) => {
  const {name, description, price, category_name} = request.body;
  const currentUser = request.user;
  const category = await Category.findOne({name: category_name.toUpperCase(), status: true});

  try {
    const product = new Product({
      name,
      description,
      price,
      status: true,
      available: true,
      category: category,
      createdBy: currentUser
    });
    await product.save();
    const newOne = await Product.findOne({name})
    .populate('createdBy', 'name')
    .populate('updatedBy', 'name')
    .populate('category', 'name');

    response.status(201).json({newOne});
  } catch(error) {
    if (error.name === 'ValidationError') {
      response.status(400);
    } else {
      response.status(500);
    }

    response.json(error.message);
    return;
  }
};

const updateOne = async(request, response) => {
  const id = request.params.id;
  const {name, description, price, category_name} = request.body;
  const currentUser = request.user;
  const category = await Category.findOne({name: category_name.toUpperCase(), status: true});

  try {
    await Product.findByIdAndUpdate(id, {
      name,
      description,
      price,
      category,
      updatedBy: currentUser
    });
    const updated = await Product.findById(id)
    .populate('createdBy', 'name')
    .populate('updatedBy', 'name')
    .populate('category', 'name');
    response.json(updated);
  } catch(error) {
    if (error.name === 'ValidationError') {
      response.status(400);
    } else {
      response.status(500);
    }

    response.json(error.message);
    return;
  }
};

const deleteOne = async(request, response) => {
  const id = request.params.id;
  const currentUser = request.user;

  await Product.findByIdAndUpdate(id, {status: false, updatedBy: currentUser});
  const updated = await Product.findById(id)
  .populate('createdBy', 'name')
  .populate('updatedBy', 'name')
  .populate('category', 'name');

  response.json({updated});
};

module.exports = {getAll, getById, createOne, updateOne, deleteOne}
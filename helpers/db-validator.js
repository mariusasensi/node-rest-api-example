const {Role, User, Category, Product} = require('../models');

const isValidRole = async (role = '') => {
  const existRole = await Role.findOne({ 'name': role });
  if (!existRole) {
    throw new Error('Role does not exist');
  }
};

const isValidMail = async (mail = '') => {
  const isMailAlready = await User.findOne({ mail });
  if (isMailAlready) {
    throw new Error('Mail already exist');
  };
}

const existUserId = async (id = '') => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error('Invalid id');
  }
}

const existCategoryById = async(id) => {
  const category = await Category.findById(id);
  if (!category) {
    throw new Error('Invalid id');
  }
}

const existCategoryByName = async(name) => {
  const category = await Category.findOne({name: name.toUpperCase(), status: true});
  if (!category) {
    throw new Error('Invalid category');
  }
}

const existProductById = async(id) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new Error('Invalid id');
  }
}

module.exports = { isValidRole, isValidMail, existUserId, existCategoryById, existCategoryByName, existProductById };
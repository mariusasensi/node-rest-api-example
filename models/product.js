const {Schema, model} = require('mongoose');

const ProductSchema = Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    default: 0.00
  },
  status: {
    type: Boolean,
    default: true,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  image: {
    type: String
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
});

ProductSchema.methods.toJSON = function() {
  const {__v, status, ...product} = this.toObject();
  return product;
}

module.exports = model('Product', ProductSchema);
const {Schema, model} = require('mongoose');

const CategorySchema = Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
  },
  status: {
    type: Boolean,
    default: true,
    required: true,
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

CategorySchema.methods.toJSON = function() {
  const {__v, status, ...category} = this.toObject();
  return category;
}

module.exports = model('Category', CategorySchema);
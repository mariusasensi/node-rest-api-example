const { Router } = require('express');
const { check } = require('express-validator');

const {validateForm, validateJWT, isUserRole } = require('../middlewares');

const { getAll, getById, createOne, updateOne, deleteOne } = require('../controllers/products');
const { existCategoryByName, existProductById } = require('../helpers/db-validator');

const router = Router();

router.get('/', [], getAll);

router.get('/:id', [
  check('id', 'Invalid id.').isMongoId(),
  validateForm,
  check('id').custom(existProductById),
], getById);

router.post('/', [
  validateJWT,
  check('name', 'Name is required.').notEmpty(),
  check('description', 'Description is required.').notEmpty(),
  check('price', 'Price is required.').notEmpty().isFloat({min: 0}),
  check('category_name', 'Category name is required.').notEmpty(),
  validateForm,
  check('category_name').custom(existCategoryByName),
], createOne);

router.put('/:id', [
  validateJWT,
  isUserRole('ADMIN_ROLE'),
  check('id', 'Invalid id.').isMongoId(),
  check('name', 'Name is required.').notEmpty(),
  check('description', 'Description is required.').notEmpty(),
  check('price', 'Price is required.').notEmpty().isFloat({min: 0}),
  check('category_name', 'Category name is required.').notEmpty(),
  validateForm,
  check('id').custom(existProductById),
  check('category_name').custom(existCategoryByName),
], updateOne);

router.delete('/:id', [
  validateJWT,
  isUserRole('ADMIN_ROLE'),
  check('id', 'Invalid id.').isMongoId(),
  validateForm,
  check('id').custom(existProductById)
], deleteOne)

module.exports = router;
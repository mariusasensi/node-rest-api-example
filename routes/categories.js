const { Router } = require('express');
const { check } = require('express-validator');

const {validateForm, validateJWT, isUserRole } = require('../middlewares');

const { getAll, getById, createOne, updateOne, deleteOne } = require('../controllers/categories');
const { existCategoryById } = require('../helpers/db-validator');

const router = Router();

router.get('/', [], getAll);

router.get('/:id', [
  check('id', 'Invalid id.').isMongoId(),
  validateForm,
  check('id').custom(existCategoryById),
], getById);

router.post('/', [
  validateJWT,
  check('name', 'Name is required.').not().isEmpty(),
  validateForm
], createOne);

router.put('/:id', [
  validateJWT,
  isUserRole('ADMIN_ROLE'),
  check('id', 'Invalid id.').isMongoId(),
  check('name', 'Name is required.').not().isEmpty(),
  validateForm,
  check('id').custom(existCategoryById),
], updateOne);

router.delete('/:id', [
  validateJWT,
  isUserRole('ADMIN_ROLE'),
  check('id', 'Invalid id.').isMongoId(),
  validateForm,
  check('id').custom(existCategoryById)
], deleteOne)

module.exports = router;
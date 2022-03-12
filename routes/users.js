
const { Router } = require('express');
const { check } = require('express-validator');

const {validateForm, validateJWT, isUserRole} = require('../middlewares');

const { home, add, put, del } = require('../controllers/users');
const { isValidRole, isValidMail, existUserId } = require('../helpers/db-validator');

const router = Router();

router.get('/', [validateJWT], home);
router.post('/add', [
  validateJWT,
  check('name', 'Name is required.').not().isEmpty(),
  check('role').custom(isValidRole),
  check('mail', 'Mail is not valid.').isEmail().custom(isValidMail),
  check('password', 'Password is required and more than 6 letters.').isLength({min: 6}),
  validateForm
], add);
router.put('/:id', [
  validateJWT,
  check('id', "Invalid id").isMongoId().custom(existUserId),
  check('role').custom(isValidRole),
  validateForm
], put);
router.delete('/:id', [
  validateJWT,
  isUserRole('ADMIN_ROLE'),
  check('id', "Invalid id").isMongoId().custom(existUserId),
  validateForm
], del);

module.exports = router;
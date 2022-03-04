
const { Router } = require('express');
const { check } = require('express-validator');
const { validate } = require('../middlewares/validator');
const { home, add, put, del } = require('../controllers/users');
const { isValidRole, isValidMail, existUserId } = require('../helpers/db-validator');

const router = Router();

router.get('/', home);
router.post('/add', [
  check('name', 'Name is required.').not().isEmpty(),
  check('role').custom(isValidRole),
  check('mail', 'Mail is not valid.').isEmail().custom(isValidMail),
  check('password', 'Password is required and more than 6 letters.').isLength({min: 6}),
  validate
], add);
router.put('/:id', [
  check('id', "Invalid id").isMongoId().custom(existUserId),
  check('role').custom(isValidRole),
  validate
], put);
router.delete('/:id', [
  check('id', "Invalid id").isMongoId().custom(existUserId),
  validate
], del);

module.exports = router;
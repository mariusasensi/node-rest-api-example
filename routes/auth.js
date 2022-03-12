
const { Router } = require('express');
const { check } = require('express-validator');
const {validateForm} = require('../middlewares');
const { init, login } = require('../controllers/auth');

const router = Router();

router.get('/init', init);

router.post('/login', [
  check('mail', 'Mail is required').isEmail(),
  check('password', 'Password is required').not().isEmpty(),
  validateForm
], login);

module.exports = router;
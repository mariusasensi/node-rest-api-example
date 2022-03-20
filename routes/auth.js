
const { Router } = require('express');
const { check } = require('express-validator');
const {validateForm} = require('../middlewares');
const { init, login, googleSingIn } = require('../controllers/auth');

const router = Router();

router.get('/init', init);

router.post('/login', [
  check('mail', 'Mail is required').isEmail(),
  check('password', 'Password is required').not().isEmpty(),
  validateForm
], login);

router.post('/google-sign-in', [
  check('token_id', 'token_id is required').not().isEmpty(),
  validateForm
], googleSingIn);

module.exports = router;
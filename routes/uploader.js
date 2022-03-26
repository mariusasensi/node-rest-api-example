const { Router } = require('express');
const { check } = require('express-validator');
const { upload, uploadImageByCollection, getImageToProviderByCollection , getImageByCollection, uploadImageToProviderByCollection } = require('../controllers/uploader');
const { allowedCollections } = require('../helpers');
const { validateJWT, validateForm } = require('../middlewares');

const router = Router();

router.post('/', upload);

router.put('/:collection/:id', [
  validateJWT,
  check('id', "Invalid id").isMongoId(),
  check('collection', 'Invalid collection').custom(c => allowedCollections(c, ['users', 'products'])),
  validateForm
], uploadImageByCollection);

router.get('/:collection/:id', [
  check('id', "Invalid id").isMongoId(),
  check('collection', 'Invalid collection').custom(c => allowedCollections(c, ['users', 'products'])),
  validateForm
], getImageByCollection);

router.put('/provider/:collection/:id', [
  validateJWT,
  check('id', "Invalid id").isMongoId(),
  check('collection', 'Invalid collection').custom(c => allowedCollections(c, ['users', 'products'])),
  validateForm
], uploadImageToProviderByCollection);

router.get('/provider/:collection/:id', [
  validateJWT,
  check('id', "Invalid id").isMongoId(),
  check('collection', 'Invalid collection').custom(c => allowedCollections(c, ['users', 'products'])),
  validateForm
], getImageToProviderByCollection);

module.exports = router;
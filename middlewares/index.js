
const validateForm = require('../middlewares/validate-form');
const validateJWT = require('../middlewares/validate-jwt');
const validateRole = require('../middlewares/validate-role');

module.exports = {
  ...validateForm,
  ...validateJWT,
  ...validateRole,
}

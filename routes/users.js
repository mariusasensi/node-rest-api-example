
const { Router } = require('express');
const { home, add, put } = require('../controllers/users');

const router = Router();

router.get('/', home);
router.post('/add', add);
router.put('/:id', put);

module.exports = router;
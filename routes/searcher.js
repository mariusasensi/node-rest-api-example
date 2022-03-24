const {Router} = require('express');
const {searcher} = require('../controllers/searcher');

const router = Router();

router.get('/:collection/:term', searcher);

module.exports = router;
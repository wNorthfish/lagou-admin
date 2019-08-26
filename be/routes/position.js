var express = require('express');
var router = express.Router();

const positionCotroller = require('../controllers/position')
const authMiddleware = require('../middleware/auth')

router.get('/list', authMiddleware.auth, positionCotroller.list)
router.post('/save', authMiddleware.auth, positionCotroller.save)
router.post('/findone', authMiddleware.auth, positionCotroller.findone)
router.put('/put', authMiddleware.auth, positionCotroller.put)

module.exports = router
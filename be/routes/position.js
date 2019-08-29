var express = require('express');
var router = express.Router();

const positionCotroller = require('../controllers/position')
const authMiddleware = require('../middleware/auth')
const fileuploadMiddleware = require('../middleware/fileupload')

router.get('/list', authMiddleware.auth, positionCotroller.list)
router.post('/save', authMiddleware.auth,fileuploadMiddleware,positionCotroller.save)
router.post('/findone', authMiddleware.auth, positionCotroller.findone)
router.put('/put', authMiddleware.auth,fileuploadMiddleware,positionCotroller.put)
router.delete('/delete', authMiddleware.auth, positionCotroller.delete)
router.post('/search', authMiddleware.auth, positionCotroller.search)


module.exports = router
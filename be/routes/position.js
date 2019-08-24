var express = require('express');
var router = express.Router();

const positionCotroller = require('../controllers/position')
const userController = require('../controllers/users')

router.get('/list', userController.isSignin, positionCotroller.list)

module.exports = router
var express = require('express');
var router = express.Router();

const userController = require('../controllers/users')

/* GET users listing. */


router.post('/signup', userController.signup)  // 注册 路由 get post 请求
router.post('/signin', userController.signin)  // 登录 路由
router.get('/isSignin', userController.isSignin)   // 鉴权
router.get('/signout',userController.signout)

 

module.exports = router;

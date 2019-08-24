var express = require('express');
var router = express.Router();


/* GET users listing. */
const Users = require('../controllers/users')


router.post('/signup', Users.signup)  // 注册 路由 get post 请求
router.post('/signin', Users.signin)  // 登录 路由

 

module.exports = router;

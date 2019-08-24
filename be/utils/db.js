const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/lagou', { useNewUrlParser: true })     // 连接数据库 lagou是数据库的名字

module.exports = mongoose
const mongoose = require('../utils/db')

const Users = mongoose.model('users',{       // 在数据库中创建集合  注意集合名字写成复数
    username: String,          // 定义文档类型
    password: String
})


module.exports={
    save({username, password}){
        const users = new Users({
            username,
            password
        })
        return users.save()
    },

    findOne(username){
        return Users.findOne({username})
    }
}
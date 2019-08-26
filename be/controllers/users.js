const userModel = require('../models/users')
const tools = require('../utils/tools')
// const succView = require('../views/succ.ejs')


module.exports = {
    // 注册逻辑接口
    async signup(req, res, next){
        // 给前端返回注册状态信息 ====  接口    但希望返回json字符串
        res.set('content-type', 'application/json;charset=utf-8')

        let {username, password} = req.body     // 取到前端发来的数据 post 是在body里
        // if(username === 'admin' && password == '123'){
        //     res.send('succ')     

        // } else {
        //     res.send('fail')
        // }


        // 增加逻辑  先判断用户名是否已经被注册
        let result = await userModel.findOne(username)   // 先从数据库里搜索是否已经有此用户
        if(!result){   // 不存在 入库

            // 存数据之前需先 加密    bcrypt
            let newPassword = await tools.crypt(password)
    
            // 数据库存储逻辑
            await userModel.save({
                username,
                password: newPassword
            })

            res.render('succ',{
                data:JSON.stringify({
                    msg:'用户注册成功+++'
                })
            })

        }

        // render 穿透
        res.render('fail',{
            data: JSON.stringify({
                msg: '用户名已被注册'
            })
        })


    },

    // 登录逻辑接口
    async signin(req, res, next){
        // 给前端返回注册状态信息 ====  接口    但希望返回json字符串
        res.set('content-type', 'application/json;charset=utf-8')

        let {username, password} = req.body  // 从post请求的body中获取用户数据

        let result = await userModel.findOne(username)   // 先从数据库里搜索是否有此用户
        if(result){  // 用户存在  比对密码  到bcrypt 中设置密码比对
            if(await tools.compare(password, result.password)) {
                req.session.username = username
                res.render('succ',{
                    data: JSON.stringify({
                        msg: '用户登录成功+++',
                        username
                    })
                })
            }else{
                res.render('fail',{
                    data: JSON.stringify({
                        msg: '账号或密码错误mmm'
                    })
                })
            }
        } else {
            res.render('fail',{
                data: JSON.stringify({
                    msg: '账号或密码错误zzz'
                })
            })
        }

        
    },

    // 接口：判断用用户是否登录 是否有权限
    async isSignin(req, res, next){
        // 给前端返回注册状态信息 ====  接口    但希望返回json字符串
        res.set('content-type', 'application/json;charset=utf-8')
        let username = req.session.username
        if(username){
            res.render('succ', {
                data: JSON.stringify({
                    msg: '用户有权限+++',
                    username
                })
            })
        } else {
            res.render('fail', {
                data: JSON.stringify({
                    msg: '用户无权限---'
                })
            })
        }
    },

    // 登出逻辑 接口
    async signout(req, res, next){    // 登出 则删除session再刷新页面
        // 给前端返回注册状态信息 ====  接口    但希望返回json字符串
        res.set('content-type', 'application/json;charset=utf-8')
        req.session = null
        res.render('succ', {
            data: JSON.stringify({
                msg: '用户登出成功.'
            })
        })
    } 
}
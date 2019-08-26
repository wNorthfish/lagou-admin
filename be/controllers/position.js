const posModel = require('../models/position')
const moment = require('moment')


module.exports = {
    async list(req, res, next) {
        let result = await posModel.find()
        if(result){
            res.render('succ', {
                data: JSON.stringify(result)
            })
        }
    },

    // 前端请求添加 数据入库
    async save(req, res, next){
        let result = await posModel.save({
            ...req.body,
            createTime: moment().format('YYYY-MM-DD h:mm:ss a')
        })
        if(result){
            res.render('succ', {
                data: JSON.stringify({
                    msg: '数据添加成功'
                })
            })
        } else {
            res.render('fail', {
                msg: '数据添加失败'
            })
        }
    },

    async findone(req, res, next){
        let result = await posModel.findone(req.body.id)
        if(result){
            res.render('succ', {
                data: JSON.stringify(result)
            })
        }
    },

    async put(req, res, next){
        let result = await posModel.put({
            ...req.body,
            createTime: moment().format('YYYY-MM-DD h:mm:ss a')
        })
        if(result){
            res.render('succ', {
                data: JSON.stringify({
                    msg: '数据修改成功'
                })
            })
        }
    }



}
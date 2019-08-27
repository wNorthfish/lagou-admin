const mongoose = require('../utils/db')

const Position = mongoose.model('positions', {
    companyName: String,
    positionName: String,
    city: String,
    salary: String,
    createTime: String
})

module.exports = {
    save(data){
        let _posModel = new Position(data)
        return _posModel.save()
    },

    find({count, start}){   // 查询从start开始选取count条     // 返回数据库总数
        return {
            list: Position.find({}).sort({_id: -1}).limit(~~count).skip(~~start),
            total: Position.count({})
        }
    },

    findone(id){
        return Position.findById(id)
    },

    put(data){
        return Position.updateOne({_id : data.id}, data)
    },

    delete(id){
        return Position.deleteOne({_id : id})
    },

    search(keywords){
        return Position.find({
            $or:[
                {companyName:new RegExp(keywords,'gi')},
                {positionName:new RegExp(keywords,'gi')},
                {city: new RegExp(keywords, 'gi')}
            ]
        }).sort({_id: -1})
    }
}


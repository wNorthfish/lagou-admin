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
    find(){
        return Position.find({}).sort({_id: -1})
    },
    findone(id){
        return Position.findById(id)
    },

    put(data){
        return Position.updateOne({_id : data.id}, data)
    }
}


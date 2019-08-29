const path = require('path')
// 文件上传中间件 目的是接收前端提交的请求 Content-Type:multipart/form-data,,使用了jQuery.form插件
const multer = require('multer')
// 生成任意位数的字符串插件
const strRandom = require('string-random')

let filename = ''
// var upload = multer({ dest: 'uploads/'})    // 新建文件夹upload存储图片


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../public/uploads/'))
      },
      filename: function (req, file, cb) {
        filename = strRandom(8) + '-' + Date.now() + file.originalname.substr(file.originalname.lastIndexOf('.'))
        cb(null, filename)
      }
})

function fileFilter(req, file, cb){
    let index = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'].indexOf(file.mimetype)
    if(index === -1){
        cb(null, false)
        cb(new Error('文件类型必须是.jpg, .png, .gif, .jpeg'))
    } else {
        cb(null, true)
    }
}

let upload = multer({
    storage,
    fileFilter
}).single('companyLogo') // 此字段对应前端的name字段



module.exports = (req, res, next) => {
    upload(req, res, function(err){

        if(err) {
            res.render('fail', {
                data: JSON.stringify({
                    msg: err.message
                })
            })
        } else {
            req.filename = filename
            next()
        }
    })
}

const crypto = require('crypto')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/uploads')
    },
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    // cb(null, file.fieldname + '-' + uniqueSuffix)
        crypto.randomBytes(12,function(err,bytes){
            let fn=bytes.toString("hex") + path.extname(file.originalname)
            cb(null, fn)
        })
    }
  })
  
const upload = multer({ storage: storage })

module.exports = upload
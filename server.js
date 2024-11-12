const cookieParser = require('cookie-parser')
const express = require('express')
const path = require('path')
const app = express()
const bcrypt = require('bcrypt')

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/', function (req, res) {

    // bcrypt.genSalt(10, function(err, salt) {
    //     bcrypt.hash("sumit", salt, function(err, hash) {
    //         res.send(hash)
    //     });
    // });
    
    bcrypt.compare("sumit", hash, function(err, result) {
        // result == true
            res.send(result)
    });

})

app.listen(3000)

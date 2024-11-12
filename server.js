const cookieParser = require('cookie-parser')
const express = require('express')
const path = require('path')
const app = express()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/', function (req, res) {
    let token = jwt.sign({email:"sumit@gmail.com"},"secret")
    res.cookie("token",token)
    res.send(token)
})

app.get('/read', function (req, res) {
    let data = jwt.verify(req.cookies.token,"secret")
    res.send(data)
    // res.send(req.cookies.token)
})

app.listen(3000)

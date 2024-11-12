const cookieParser = require('cookie-parser')
const express = require('express')
const path = require('path')
const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/', function (req, res) {
    res.cookie("special","sandt")
    res.send("Done")
})

app.get('/read', function (req, res) {
    res.send(req.cookies)
})

app.listen(3000)

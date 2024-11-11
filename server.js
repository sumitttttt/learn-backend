const express = require('express')
const path = require('path')

const app = express()

app.use(function(req,res,next){
    next()
})

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))
app.set("view engine","ejs")

app.get('/', function (req, res) {
    res.render("index")
})

app.get('/profile', function (req, res) {
    res.render("index")
})

app.get('/profile/:username', function (req, res) {
    res.send(req.params.username)
})

app.get('/profile/:username/:age', function (req, res) {
    res.send(req.params)
})

app.listen(3000)
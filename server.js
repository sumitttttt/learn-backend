const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set("view engine","ejs")

app.get('/', function (req, res) {
    res.render("index")
})

app.listen(3000)

const express = require('express')
const mongoose = require('mongoose')
const userModel = require('./usermodel')
const path = require('path')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set("view engine","ejs")

app.get('/', function (req, res) {
    res.render("index")
})

app.get('/create', async function (req, res) {
    let opt= await userModel.create({
        name:"Sumit",
        username:"Sumit",
        email:"sumit@gmail.com"
    })

    res.send(opt)
})

app.get('/update', async function (req, res) {
    let updatedOpt = await userModel.findOneAndUpdate({username:"Sumit"},{name:"updatedSumit"},{new:true})

    res.send(updatedOpt)
})

app.get('/read', async function (req, res) {
    let allUsers= await userModel.find({username:"Sumit"});

    res.send(allUsers)
})

app.get('/delete', async function (req, res) {
    let allUsers= await userModel.findOneAndDelete({username:"Sumit"});

    res.send(allUsers)
})

app.listen(3000)

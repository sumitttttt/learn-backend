const express = require('express')
const path = require('path')
const app = express()
const userModel = require("./models/user")
const postModel = require("./models/post")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))
app.set("view engine","ejs")

app.get('/', async function (req, res) {
    res.render("index")
})

app.get('/login', async function (req, res) {
    res.render("login")
})

app.get('/profile', isLoggedin, async function (req, res) {
    // res.render("login")
    res.send(req.user)
})

app.post('/login', async function (req, res) {
    let {email,password} = req.body

    let user = await userModel.findOne({email:email})

    if(!user) return res.send("swr")

    bcrypt.compare(password, user.password, function(err, result) {
        if(result){
            let token = jwt.sign({email,userid:user._id},"secret")
            res.cookie("token",token)
            res.send("You can login")
        } 
            else res.redirect("/login")
    });
})

app.post('/register', async function (req, res) {
    let {name,username,age,email,password} = req.body

    let user = await userModel.findOne({email:email})

    if(user) return res.send("User Already Registered")

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, async function(err, hash) {
            
            let user = await userModel.create({
                username,
                name,
                email,
                password:hash,
                age
            })

            let token = jwt.sign({email,userid:user._id},"secret")
            res.cookie("token",token)

            res.send(user)
        })
    })
})

app.get("/logout",function (req,res){
    res.cookie("token","")
    res.redirect("/login")
})

function isLoggedin(req,res,next){
    if(req.cookies.token=="") res.send("not login")
    else{
        let data = jwt.verify(req.cookies.token,"secret")
        req.user=data
        next() 
    }
}

app.listen(3000)

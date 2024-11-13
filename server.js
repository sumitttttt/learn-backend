const cookieParser = require('cookie-parser')
const express = require('express')
const path = require('path')
const app = express()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userModel = require('./models/user')

app.set('view engine','ejs')
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))


app.get('/', function (req, res) {
    res.render('index')
})

app.post('/create', function (req, res) {
    let {username,email,password,age}=req.body
    
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, async function(err, hash) {
            
            let createdUser = await userModel.create({
                username,
                email,
                password:hash,
                age
            })

            let token = jwt.sign({email},"secret")
            res.cookie("token",token)

            res.send(createdUser)
        })
    })
})

app.get("/login",function (req,res){
    res.render("login")
})

app.post("/login",async function (req,res){
    let {email,password} = req.body

    let user = await userModel.findOne({email:email})

    if(!user) res.send("You gotta try again")
        
        bcrypt.compare(password, user.password, function(err, result) {
            if(result){
                let token = jwt.sign({email:user.email},"secret")
                res.cookie("token",token)
                 
                res.send("That's my man")
            }
            else{ 
                res.send("You gotta try again")
            }
    });
})

app.get("/logout",function (req,res){
    res.cookie("token","")
})

app.listen(3000)

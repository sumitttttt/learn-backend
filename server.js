const express = require('express')
const app = express()
const path = require('path')
const userModel = require("./models/user")
const postModel = require("./models/post")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const upload = require("./config/multerconfig")

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))
app.set("view engine","ejs")

app.get('/', function (req, res) {
    res.render("index")
})

app.get('/profile/upload', function (req, res) {
    res.render("profileupload")
})

// app.get('/test', async function (req, res) {
//     res.render("test")
// })

app.post('/upload', isLoggedin, upload.single("image"), async function (req, res) {
    // console.log(req.body)
    let user = await userModel.findOne({email:req.user.email})

    user.profilepic = req.file.filename
    await user.save()

    res.redirect("/profile")
})

app.get('/login', async function (req, res) {
    res.render("login")
})

app.get('/profile', isLoggedin, async function (req, res) {
    let user = await userModel.findOne({email:req.user.email}).populate("posts")
    res.render("profile",{user})
})

app.get('/like/:id', isLoggedin, async function (req, res) {
    let post = await postModel.findOne({_id:req.params.id}).populate("user")

    if(post.likes.indexOf(req.user.userid)===-1){
        post.likes.push(req.user.userid)
    }
    else{
        post.likes.splice(post.likes.indexOf(req.user.userid),1)
    }

    await post.save()

    res.redirect("/profile")
})

app.get('/edit/:id', isLoggedin, async function (req, res) {
    let post = await postModel.findOne({_id:req.params.id}).populate("user")
    res.render("edit",{post})
})

app.post('/update/:id', isLoggedin, async function (req, res) {
    let post = await postModel.findOneAndUpdate({_id:req.params.id},{content:req.body.content})
    res.redirect("/profile")
})

app.post('/login', async function (req, res) {
    let {email,password} = req.body

    let user = await userModel.findOne({email:email})

    if(!user) return res.send("swr")

    bcrypt.compare(password, user.password, function(err, result) {
        if(result){
            let token = jwt.sign({email,userid:user._id},"secret")
            res.cookie("token",token)
            res.redirect("/profile")
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
    if(req.cookies.token=="") res.redirect("/login")
    else{
        let data = jwt.verify(req.cookies.token,"secret")
        req.user=data
        next() 
    }
}

app.post('/post', isLoggedin, async function (req, res) {
    let user = await userModel.findOne({email:req.user.email})

    let post = await postModel.create({
        user:user._id,
        content:req.body.content
    })


    user.posts.push(post._id)
    await user.save()

    res.redirect("/profile")
    // res.send({post,user})
})

app.listen(3000)

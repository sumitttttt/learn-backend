const express = require('express')
const path = require('path')
const app = express()
const userModel = require("./models/user")
const postModel = require("./models/post")

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))
app.set("view engine","ejs")

app.get('/', async function (req, res) {
    // let user = await userModel.create({
    //     username:"sumit",
    //     email:"sumit@getMaxListeners.com",
    //     age:20,
    //     posts:[]
    // })

    // res.send(user)
})

app.get('/post/create', async function (req, res) {
    let post = await postModel.create({
        postdata:"i am good",
        user:"6734a58125107084e5ca0079"
    })

    let user = await userModel.findOne({_id:"6734a58125107084e5ca0079"})

    user.posts.push(post._id)
    await user.save()

    res.send({post,user})
})

app.listen(3000)

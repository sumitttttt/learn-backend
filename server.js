const express = require('express')
const path = require('path')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/', function (req, res) {
    res.send("Done")
})

app.listen(3000)

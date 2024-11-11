const express = require('express')
const app = express()

app.use(function(req,res,next){
    next()
})

app.use(express.urlencoded())
app.use(express.json())

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.post('/', function (req, res) {
    console.log(req.body)
    res.send('Hello World')
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(3000)
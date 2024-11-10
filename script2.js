const http = require("http");

const server=http.createServer(function(req,res){
    res.end("Hi this is server")
})

server.listen(5000)


// to download specific version
// npm i package_name@x.y.z
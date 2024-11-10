const fs = require("fs")

fs.writeFile("data.txt","Hi this is the first file",function(err){
    if(err) console.log(err)
    else console.log("Success")
})


// fs.appendFile("data.txt","Another data",function(err){

// })


// fs.rename("data.txt","newdata.txt",function(err){

// })


// fs.copyFile("data.txt","./copy/copy.txt",function(err){

// })


// err.message


// fs.unlink("data.txt",function(err){

// })


// fs.rmdir("./copy",{recursive:true},function(err){

// })

// other fs module functions
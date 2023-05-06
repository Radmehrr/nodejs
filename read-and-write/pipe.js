const fs = require('fs')
const http = require("https")
const readStreamData = fs.createReadStream('./read.txt')
const writeStreamData = fs.createWriteStream('./write-pipe.txt')

readStreamData.pipe(writeStreamData)

// http.createServer((req,res) => {
//     const readStreamData = fs.createReadStream('./read.txt')
//     res.writeHead(200, {'Content-type': 'text/plain'})

//     readStreamData.pipe(res)
// }).listen(3000, () => {
//     console.log("server lisen to port 3000 : http://localhost:3000");
// })
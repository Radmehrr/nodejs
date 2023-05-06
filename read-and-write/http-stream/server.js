const { createReadStream,statSync } = require("fs")
const http = require("http")

http.createServer((req,res) => {
    const readStream = createReadStream("./me.mp4")
    const range = req.headers.range
    const {size} = statSync("./me.mp4")
    if(range) {
        const [start,end] = range.replace(/tytes=/, '').split("-");
        start = parseInt(start,10)
        end = end ? parseInt(end,10) : size - 1;
    
        console.log(start,end);

        res.writeHead(206, {
            "Content-Range": `bytes ${start}-${end}/ ${size}`,
            "Accept-Range": "bytes",
            "Content-Length": (start - end) + 1,
            "Content-Type": "video/mp4"
        })

        createReadStream("./me.mp4", {start,end}),pipe(res)
    }else {
 


        res.writeHead(200, {'Content-Type': 'video/mp4', 
         "Content-Length": size})
            readStream.pipe(res)
        }

 
    
}).listen(3000)
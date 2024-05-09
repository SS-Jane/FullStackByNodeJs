const http = require("http");

const server = http.createServer((req, res) => {
    res.writeHead(200, { "content-Type" : "text/plain"});  // 200 is no problem 
    res.end("Hello world\n");
});

server.listen(3001, "127.0.0.1", () =>{      //port 3001 ip:127.0.0.1
    console.log("Listening on 127.0.0.1:3001");
});
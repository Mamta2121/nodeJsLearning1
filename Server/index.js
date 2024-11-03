//Always name main file as index.js //It's a good practice


//let's make http server using built-in module in nodejs


const http = require("http");
const fs = require("fs");

const myServer = http.createServer( (req, res) => {
  /*
  console.log(req.headers);
  console.log(req)
  */
  const log = `${Date.now()}: New Req Recieved\n`;
  fs.appendFile("log.txt", log, (err, data)=> { //non-blocking request -> Async -> Avoid CPU intensive Task
      switch(req.url){  //multi Route -> giving different response based on different page
        case "/" : 
          res.end("HomePage");
          break;
        case "/about": 
          res.end("I am Mamta Rajera");
          break;
        default:
          res.end("404 not found"); 
      }
      //res.end("Hello from Server Again");
    });
  //res.end("Hello from Server") //sending anything as response //if you make any change here in the server, you have to restart it //ctrl+C -> npm start
});

//req object ->  contains data related to the request -> IP metadata


//port -> door at which the 
myServer.listen(8000, () => console.log("Server Started!"))
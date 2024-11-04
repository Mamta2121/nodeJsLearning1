//Resource - https://www.digitalocean.com/community/tutorials/how-to-create-a-web-server-in-node-js-with-the-http-module
//Always name main file as index.js //It's a good practice

//What actually is a server here - a computer , a program, temprorly a computer , what it is exactly?
//let's make http server using built-in module in nodejs


const http = require("http");
const fs = require("fs");
const url = require("url"); //external module installed using command -> npm i url

const myServer = http.createServer( (req, res) => {
  /*
  console.log(req.headers);
  console.log(req)
  */
  const log = `${Date.now()}:${req.url} New Req Recieved\n`;

  const myURL = url.parse(req.url, true); //second parameter passed as true //to parse query parameters
  console.log(myURL)
  fs.appendFile("log.txt", log, (err, data)=> { 
    //non-blocking request -> Async -> Avoid CPU intensive Task
      switch(myURL.pathname){  //multi Route -> giving different response based on different page
        case "/" : 
          res.end("HomePage");
          break;
        case "/about": 

          const username = myURL.query.myname;
          res.end(`Hii ${username}`);
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
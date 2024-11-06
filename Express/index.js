//Learning expressjs -> It is nodejs Framework -> Making Complex Routing easy and also make code more readable and cleaner
//command -> npm install  express

//Here We are writing handler functions separately for each route 

//Previously when we were just using http so,there when writing handler function , so code for all the routes has to be written inside just one fucntion using a lot of else if -> Which made the code very unmanageable
const http = require('http')
const express = require('express')

const app = express();



app.get('/', (req,res) => {
  res.send("Hello from Home Page");
})

app.get( '/about', (req, res) => {
  res.send("Hello from About Page" + ` Hello ${req.query.myname} with user id ${req.query.userId}`)
})


const myServer = http.createServer(app)


myServer.listen(8000, ()=> {
  console.log("Server Started!")
})
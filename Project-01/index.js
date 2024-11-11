const express = require('express')
const fs = require('fs')
let users = require('./MOCK_DATA.json')

const app = express();
const PORT = 8000;

console.log(typeof users);



app.use(express.urlencoded({extended:true}));
//Routes 

app.use( (req, res, next) => {
  //console.log(typeof res)
  //console.log(typeof req)
 //console.log(typeof next)
  console.log('MW1');
  next(); 
});


app.use( (req, res, next) => {
  console.log('MW2'); 
   next();
});


app.get('/users', (req,res) =>{
    
    
    const html = `<ul> ${users.map((users) => `<li>${users.id}</li>`).join("")}</ul>`;
    return res.send(html);
})

//Rest API Routes
app.get('/api/users', (req,res)=>{
    
   //console.log(typeof users)
   return res.json(users);
});


app.get('/api/users/:id', (req, res) => {
   const id = Number(req.params.id);

   const user = users.find( (user) => user.id === id);

   return res.json(user);
});

app.post( '/api/users', (req,res)=> {

  const body = req.body; //post req se jo data , usko access krna 
  //console.log('Body', body) //undefined //express cannot determine the type of data coming //for this purpose middleware is used  //since in this example form data is coming hence, we are using express.urlencoded() middleware 
  users.push({id:users.length+1, ...body}); //adding the data into the actual data
  fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
    return res.json({status: "done", id: users.length});  //sending the id to the response , showing the successful submission of request

  }); //actual data is inside this file, hence need to be written inside it
});

app.patch( '/api/users/:id', (req, res)=> {
  //Edit user with id
  //patch is still remaining to be completed
  return res.json({status: "pending"});
})

app.delete( '/api/users/:id', (req,res)=>{
  //Delete user with id
  //Delete Done
  
  const idTobeDeleted = Number(req.params.id); //id of the user to be deleted
  //console.log(typeof users);
  
  //console.log(typeof users)
  users = users.filter( user => user.id !== idTobeDeleted ); //simple use filter function on the users which is a JSON containing a array 
  fs.writeFile('./MOCK_DATA.json',JSON.stringify(users), (err, data) => { //make sure to overwrite file with new JSON
    
    console.log(typeof users)
    return res.json({status: "pending", newLength: users.length}); //return new length which should be one less than before showing a deleted info
  });
  
  
});


//1 way to write routes for same path but different method , separately
/*
   app.get('/api/users/:id', (req, res) => {
   const id = Number(req.params.id);

   const user = users.find( (user) => user.id === id);

   return res.json(user);
   }); 

  app.patch( '/api/users/:id', (req, res)=> {
  //Edit user with id
  return res.json({status: "pending"});
  })

  app.delete( '/api/users/:id', (req,res)=>{
  //Delete user with id
  return res.json({status: "pending"})
  })
*/

//2 way to merge them like this 

/*
app.route('/api/users/:id') //see path remains same
.get(//write callback function for get)
.patch(//write callback function for patch)
.delete(//write callback function for delete)
*/



app.listen( PORT, () => { console.log("Server Started at Port 8000")})
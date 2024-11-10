const express = require('express')
const fs = require('fs')
let users = require('./MOCK_DATA.json')

const app = express();
const PORT = 8000;


app.use(express.urlencoded({extended:true}));
//Routes
app.get('/users', (req,res) =>{
    
    const html = `<ul> ${users.map((users) => `<li>${users.id}</li>`).join("")}</ul>`;
    return res.send(html);
})

//Rest API Routes
app.get('/api/users', (req,res)=>{
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
  //Delete is still remaining to be completed
  const idTobeDeleted = Number(req.params.id);
  console.log(typeof users);
  users = JSON.parse(users);
  console.log(typeof users)
  const newUsers = users.filter( user => user.id !== idTobeDeleted );
  fs.writeFile('./MOCK_DATA.json',JSON.stringify(users), (err, data) => {
    users = require('./MOCK_DATA.json');
    return res.json({status: "pending", newLength: users.length});
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
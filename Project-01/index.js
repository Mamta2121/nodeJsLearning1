const express = require('express')
const fs = require('fs')
const mongoose = require('mongoose');
//let users = require('./MOCK_DATA.json')

const app = express();
const PORT = 8000;

console.log(typeof users);

//Connection
mongoose
   .connect('mongodb://127.0.0.1:27017/youtube-app-one')
   .then(() => console.log("Mongodb Connected"))
   .catch((err) => console.log("Mongo Error", err));
//Schema

const userSchema = new mongoose.Schema({
  firstName:{
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
     type: String,
     required: true,
     unique: true,
  },
  jobTitle:{
    type:String,
  },
  gender: {
    type: String,
  },
}, {timestamps: true});

//Model
const User = mongoose.model('user', userSchema);


app.use(express.urlencoded({extended:true})); //they work on the basis of content-type present in headers
//Routes 

/*
app.use( (req, res, next) => {
  //console.log(typeof res)
  //console.log(typeof req)
 //console.log(typeof next)
  console.log('MW1');
  next(); 
});
*/



/*
app.use( (req, res, next) => {
  console.log('MW2'); 
   next();
});
*/


app.get('/users', async(req,res) =>{
    
    //without using mongodb
    /*
    const html = `<ul> ${users.map((users) => `<li>${users.id}</li>`).join("")}</ul>`;
    return res.send(html);
    */
    //with using mongodb
    const allDbUsers = await User.find({});
    const html = `<ul> ${allDbUsers.map((users) => `<li>${users.firstName} - ${users.email}</li>`).join("")}</ul>`;
    return res.send(html);
})

//Rest API Routes
app.get('/api/users', async(req,res)=>{ 
    
  //#1 without using mongodb
  /*
   //console.log(typeof users)
   //console.log(req.headers)
   res.setHeader( 'X-MyName', 'mamta rajera'); //Always add X to the name of custom header
   return res.json(users);
   */
   //#2 with using mongodb
   const allDbUsers =  await User.find({});
   return res.json(allDbUsers);
});


app.get('/api/users/:id', async(req, res) => {
  //#1 Without using mongodb
  /*
   const id = Number(req.params.id);

   const user = users.find( (user) => user.id === id);

   return res.json(user);
   */
  //#2 With using mongodb
   
  app.get('/api/users/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.json(user);
    } catch (error) {
      console.error("Error in GET /api/users/:id:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

});

app.post( '/api/users', async(req,res)=> {
  
  //#1 Without using mongodb
  /*
  const body = req.body; //post req se jo data , usko access krna 
  //console.log('Body', body) //undefined //express cannot determine the type of data coming //for this purpose middleware is used  //since in this example form data is coming hence, we are using express.urlencoded() middleware 
  users.push({id:users.length+1, ...body}); //adding the data into the actual data
  fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
    return res.status(201).json({status: "done",
       id: users.length});  //sending the id to the response , showing the successful submission of request

  }); //actual data is inside this file, hence need to be written inside it
  */
 //#2 With using mongodb
  try{
   const body = req.body;
   if( 
      !body ||
      !body.first_name ||
      !body.last_name ||
      !body.email || 
      !body.gender ||
      !body.job_title
   )
   {
      return res.status(400).json( { msg: "All Field are required"});
   }
   await User.create({
       firstName: body.first_name,
       lastName: body.last_name,
       email: body.email,
       job_title: body.job_title,
       gender: body.gender,
   });
   //onsole.log("result",result);
   return res.status(201).json({msg: "success"})
  }catch(error)
  {
    console.log("Error in POST /api/users", error);
  }
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
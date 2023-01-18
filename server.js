//start the server
const express = require('express');
const router = require('./routes/routes');
const cors = require('cors')
const cookieParser = require('cookie-parser');


const app = express();
const port = 3000;

const jsonwebtoken = require("jsonwebtoken");

const option = {
    socketTimeoutMS: 3600,
    keepAlive: true,
    reconnectTries: 3600
};

//connect the database
const db =require('./config/connect')

//add middlewares for the form data
app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.use(cookieParser());
const corsoptions ={
    credentials: true, 
   // origin: 'http://localhost:3000'
}
//use the cors middleware
app.use(cors(corsoptions)) //to check the origin of the request

app.get('/step',(req,res)=>{
    console.log('hello')
})
//for the jwt token generation
app.use(function(req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
          
      jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'nice:)', function(err, decode) {
        //return res.redirect('/step');
        if (err) req.user = undefined;
        req.user = decode;
        
        next();
         
        
      });

    } else {
      req.user = undefined;
      next();
    }
  });

//check the db connection
db.on("error",console.error.bind("connection not made"));

//use the router
app.use('/api',router)

app.listen(port,console.log('Listening to the server'));

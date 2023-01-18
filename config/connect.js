//MongoDB connection using Mongoose
const { mongo } = require('mongoose');
const mongoose = require('mongoose');

//create an instance
mongoose.connect('mongodb://127.0.0.1:27017/pirates_db',{
    useNewUrlParser: true, useUnifiedTopology:true
}).then(()=>{
    console.log("Database connection successful")
}).catch(error=>{
    console.log("connection failed")
})

const db = mongoose.connection;

module.exports = db; //export for resuse
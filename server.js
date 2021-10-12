const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routers/User'); // api 

const app = express();

// Connect to database 
var PORT = 8080;
var HOST_NAME = 'localhost';
var DATABASE_NAME = 'usersList';

mongoose.connect('mongodb://' + HOST_NAME + '/' + DATABASE_NAME);



// Pares Body to Json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));



//Link Api rputes to server 
app.use('/api', userRouter);



// listen server on Port 5000
app.listen(PORT, function () {
  console.log('Listening on port ' + PORT);
});

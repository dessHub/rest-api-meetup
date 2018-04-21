 const express = require('express');
 const bodyParser = require('body-parser');
 const morgan  = require('morgan');
 const app = express();
 const mongoose = require('mongoose');
 const router = require('./controllers/userController');
 const configDB = require('./config/database.js');

 // configuration ===============================================================
 mongoose.connect(configDB.url); // connect to our database

 // log every request to the console 
 app.use(morgan('dev'));
 
 //  parse application/json
 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(bodyParser.json());
 const port = process.env.PORT || 8000;

 // set the view engine to ejs
 app.set('view engine', 'ejs');

 // all other code will go here 
 app.use(router);

app.listen(port);
console.log('REST API is runnning at ' + port);
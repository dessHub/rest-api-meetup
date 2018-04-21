const mongoose = require('mongoose');

// define the schema for our user model
var userSchema = mongoose.Schema({

    email        : String,
    name         : String,
    gender       : String,
    bio          : String
    
});

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);


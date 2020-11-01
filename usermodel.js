var mongoose = require('mongoose'); 

var userSchema = new mongoose.Schema({ 
name:{
    type:String,
    required:true
},
password:{
        type:String,
        required:true
    }
});

//Image is a model which has a schema imageSchema 

module.exports = new mongoose.model('BlogUsers', userSchema); 
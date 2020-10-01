var mongoose = require('mongoose'); 

var commentSchema = new mongoose.Schema({ 
    name:String,
    comment:String
}); 

//Image is a model which has a schema imageSchema 

module.exports = new mongoose.model('articles', commentSchema); 

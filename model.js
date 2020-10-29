var mongoose = require('mongoose'); 
//var commentsModel = require('./commentsModel'); 
//var Schema = mongoose.Schema;

var imageSchema = new mongoose.Schema({ 
	title: String, 
	description: String, 
    articleImage: Object,
	content: String,
	comments:[{
		name:String,
		comment:String
	}]
}); 

//Image is a model which has a schema imageSchema 

module.exports = new mongoose.model('articles', imageSchema); 

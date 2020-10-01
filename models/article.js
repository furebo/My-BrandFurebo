const mongoose = require('mongoose');

const schema = mongoose.Schema;

const blogSchema = new schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    image:{
        data: Buffer, 
        contentType: String
    },
    content:{
        type:String
    }
})

module.exports = mongoose.model('allBlogs',blogSchema);
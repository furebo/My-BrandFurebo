const express = require('express')
const app = express();

app.use('/static',express.static('public'))
app.use('/static',express.static('images'))

const mongoose = require('mongoose');
let port = process.env.PORT ||3000;

//mongoDB url from atlas = 
const MONGODB_URI = 'mongodb+srv://furebodidace:fode123@cluster0.oxsrq.mongodb.net/myBlog?retryWrites=true&w=majority'
// connecting app to mongoDB
mongoose.connect(MONGODB_URI||'mongodb://localhost:27017/mylocaldb',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
//CHECKING if mongoose is connected
mongoose.connection.on('connected',()=>{
    console.log('mongoose is connected!!!!!!!!!');
})

//schema
const schema = mongoose.Schema;
const blogSchema = new schema({
    title:String,
    description:String,
    image:Object,
    content:String
})
//models
const blogModel = mongoose.model('blog',blogSchema);

//saving data to the mongo database

const data = {
    title:"About javascript",
    description:"Javascript is very import language in web programing",
    image:{
        src: "images/gisagara.PNG"
    },
    content:"Node.js is run time environment to run javascript codes outside the browser!Node.js is run time environment to run javascript codes outside the browser!Node.js is run time environment to run javascript codes outside the browser!Node.js is run time environment to run javascript codes outside the browser!Node.js is run time environment to run javascript codes outside the browser!"
}

// before seving data to database using .save method we need to create model instance and pass in the data as follow

const newBlogModel = new blogModel(data);
//then let save into database 

newBlogModel.save((error)=>{
    if(error){
        console.log('there is an error saving to database!')
    }else{
        console.log('Data has been saved successfully!')
    }
})  
//middlewares
app.use('/posts',()=>{
    
})



//Routes
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})

app.get('/welcome',(req,res)=>{
    res.send('Welcome, Enjoy our weekly realesed blog !');
})

app.get('/api',(req,res)=>{
   const dataretreived = {
       title:"about Node.js",
       description:"Node.js is run time environment to run javascript codes outside the browser!"
   }
   blogModel.find()
   .then((dataretreived)=>{
       console.log('Dataretreived :',dataretreived)
   })
   .catch((error)=>{
       console.log('there is an error')
   })
   res.json(dataretreived);
})





// lesting to the server
app.listen(port,()=>{
    console.log(`Server listing on port http://localhost: ${port}` )
});
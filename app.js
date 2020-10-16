require('dotenv').config();
const { urlencoded } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
let multer = require('multer');
var fs = require('fs'); 
var path = require('path');
const bodyParser = require('body-parser');  

var articleModel = require('./model'); 
var usermodel = require('./usermodel');
const protection = require('./protection');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

app.set('uploads', path.join(__dirname, 'uploads'));
const urlencodedParser = bodyParser.urlencoded({extended:false});
app.use('/uploads',express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json()) 

app.use(express.urlencoded({extended:false}));
app.use('/static',express.static('public'));
app.use('/static',express.static('images'));

const { JsonWebTokenError } = require('jsonwebtoken');

let port = process.env.PORT ||3000;

//mongoDB url from atlas = 
const MONGODB_URI = 'mongodb+srv://furebodidace:fode123@cluster0.oxsrq.mongodb.net/myBlog?retryWrites=true&w=majority'
// connecting app to mongoDB
 mongoose.connect(MONGODB_URI,{
 useNewUrlParser:true,
 useUnifiedTopology:true
    });

//CHECKING if mongoose is connected

mongoose.connection.on('connected',()=>{
        console.log('mongoose is connected!!!!!!!!!');
})


// creating new article when authenticated as admin


const storage = multer.diskStorage({
    destination:function (req,file,cb){
        cb(null,'./uploads')
    }
});

const upload = multer({storage:storage});



app.post('/article',upload.single('articleImage'),(req,res,next)=>{
    var obj = new articleModel({
        title:req.body.title,
        description:req.body.description,
        articleImage:req.file.path,
        content:req.body.content
    })

    articleModel.create(obj, (err, item) => { 
        item.save().then(()=>{
            res.json({message:"article created successfully"})
        }) 
    })

})

//default route

app.get('/',(req,res)=>{
    res.json({"message":"welcome"})
})

// signing up of an user


app.post('/signup',(req,res,next)=>{

    bcrypt.hash(req.body.password, 10, (err, hash)=>{
        const newuser =new usermodel({
                        name:req.body.name,
                        password:hash
                    });
        
    newuser.save().then(
        res.json({message:"user signed up"})
    )
   })
})

app.post('/loginuser',(req,res,next)=>{
    usermodel.find({name:req.body.name})
    .then(user =>{ bcrypt.compare(req.body.password, user[0].password, ()=>{
        var token = jsonwebtoken.sign({name:user[0].name},"secret", {expiresIn:"5h"})
                    res.status(200).json({
                    message:"user loged in successfully",
                    token:token
                }) 
            })
     }) 

});
 

//getting an article with its comments

app.get('/article/:id/comments',(req,res)=>{

    articleModel.findById(req.params.id).then((result)=>{
        res.status(200).json({comment:result})
    })
})

//posting a comment to an article

app.post('/article/:id/comments',(req,res)=>{
     articleModel.findById(req.params.id).then((result)=>{
        result.comments.push(req.body);
        
        articleModel.findByIdAndUpdate({_id:req.params.id},result).then(()=>{
            articleModel.findOne({_id:req.params.id}).then((article)=>{
                res.status(200)
                res.send(article)
         })
        })
            
     })
 })

//deleting a comment of an article when authenticated

app.delete('/article/:id/comments/:id',(req,res)=>{

   articleModel.find({},(err,items)=>{
            for(var i = 0; i < items.length; i++ ){
                for(var j = 0; j < items[i].comments.length; j++){
                    if(items[i].comments[j]._id == req.params.id){

                      items[i].comments.splice(j,1);
                      articleModel.findByIdAndUpdate({_id:items[i]._id},items[i])
                      
                 }
               }
             
        }
    }).then(()=>{ res.status(200),res.json({message:"comment deleted successfully !"})})
})

//deleting an article when authenticated

app.delete('/article/:id',(req,res)=>{
    articleModel.findByIdAndRemove({_id:req.params.id}).then(()=>{
        res.status(200).json({
            message:"Article deleted !",
            request:{
                type:'DELETE',
                URI:'http://127.0.0.1/articles',
                info:{
                    title:String,
                    description:String,
                    content:String,
                    articleImage:String
                }
            }

            
        })
 
    })
})  


// updating an article when authenticated

app.put('/article/:id',(req,res)=>{
    articleModel.findByIdAndUpdate({_id:req.params.id}, req.body).then(()=>{
        articleModel.findOne({_id:req.params.id}).then((article)=>{
            res.status(200);
            res.send(article);
        })
    })


})

// getting a list of all articles

app.get('/article',(req,res)=>{
    articleModel.find({},(err,items)=>{
        res.send(items);
    }).then(()=>{
        res.status(200);
    })
})

//getting a particular article


app.get('/article/:id',(req,res)=>{

    articleModel.findById(req.params.id).then((result)=>{
        res.status(200).json({article:result})
    })
})


// lesting to the server
app.listen(port,()=>{
    console.log(`Server listing on port http://localhost: ${port}`)
})

module.exports = app;
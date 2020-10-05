const { urlencoded } = require('express');
const express = require('express')
const mongoose = require('mongoose');
//const articleRouter = require('./routes/articles')
const app = express();
var fs = require('fs'); 
var path = require('path');
const bodyParser = require('body-parser');  
let multer = require('multer');
//require('dotenv/config');
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


//app.use('/viewblogs',articleRouter);    
app.use(express.urlencoded({extended:false}));
app.use('/static',express.static('public'));
app.use('/static',express.static('images'));


//middleware for error handleling   
app.use((err,req,res,next)=>{
    res.send({error:err.message})
})


const { JsonWebTokenError } = require('jsonwebtoken');
//mongoose.Promise = global.Promise;
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
}).catch(()=>{
    console.log('mongoose is not connected!!!!');
});

app.use('/posts',()=>{
    
})

const storage = multer.diskStorage({
    destination:function (req,file,cb){
        cb(null,'./uploads')
    },
    filename:function (req,file,cb){
        cb(null, file.originalname)
    }
    
});

const fileFilter = (req,file,cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null,true)
    }else{
        cb(null,false)
    }
}

const upload = multer({storage:storage,fileFilter:fileFilter});

// creating new article when authenticated as admin

app.post('/article',upload.single('articleImage'),(req,res)=>{
    var obj = {
        title:req.body.title,
        description:req.body.description,
        articleImage:req.file.path,
        content:req.body.content,
        comments:req.body.comments
    }

    articleModel.create(obj, (err, item) => { 
		if (err) { 
			console.log('err'); 
		} 
		else { 
			item.save();  
		} 
    }); 
    console.log('data sent to database')
    res.send({
        title:req.body.title,
        description:req.body.description,
        articleImage:req.file.path,
        content:req.body.content,
    })
})

//default route

app.get('/',(req,res)=>{
    res.json({"message":"welcome"})
})

// signing up of an user

app.post('/signup',(req,res,next)=>{

    usermodel.find({name:req.body.name}).then(username =>{
        if(username.length >= 1){
            return res.status(409).json({
                message:'user arlady exist !'
            })
        }else{
            bcrypt.hash(req.body.password, 10, (err, hash)=>{
                if(err){
                    return res.status(500).json({
                        error:err
                    })
                }else{
                    const newuser =new usermodel({
                        name:req.body.name,
                        password:hash
                    });
        
                    newuser.save().then(result =>{
                        res.status(201).json({
                            message:"user authentication created !"
                        })
                    }).catch(()=>{
                        console.log('there is an error')
                    });
                }
            }) 
        }
    }).catch(()=>{
        console.log('There is an error')
    })
})

// signing in as admin user

app.post('/loginuser',(req,res,next)=>{
    usermodel.find({name:req.body.name}).then(user =>{
        if(user.length < 1){
           return res.status(404).json({
                 message:"User does not exist !"
            })
        }else{
            bcrypt.compare(req.body.password, user[0].password, (err,result)=>{
                if(err){
                    return res.status(404).json({
                        message:"User does not exist !"
                })
            }
            if(result){
                var token = jsonwebtoken.sign({name:user[0].name},"secret", {expiresIn:"5h"})
                return res.status(200).json({
                    message:"user loged in successfully",
                    token:token

                }) 
                
            }
            res.status(401).json({
                message:"Failed to login user!"
            })
        })
     } 
   }).catch(()=>{
       console.log('There is an error')
   }) 

});

//getting an article with its comments

app.get('/article/:id/comments',(req,res)=>{

    articleModel.findById(req.params.id).then((result)=>{
        res.status(200).json({comment:result})
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({error:err})
    })
})

//posting a comment to an article

app.post('/article/:id/comments',(req,res)=>{

    articleModel.findById(req.params.id).then((result)=>{
        result.comments.push(req.body);
        
        articleModel.findByIdAndUpdate({_id:req.params.id},result)
        .then(()=>{
            articleModel.findOne({_id:req.params.id}).then((article)=>{
                res.status(200)
                res.send(article)
            })
        })
        .catch((err)=>{
            console.log(err);
            res.status(500).json({message:"there is an error!"});
        })
}).catch((err)=>{
    console.log(err);
    res.status(500).json({error:err})
  }) 
})

//deleting a comment of an article when authenticated

app.delete('/article/:id/comments/:id',(req,res)=>{

   articleModel.find({},(err,items)=>{
        if(err){
            console.log(err)
        }else{
            for(var i = 0; i < items.length; i++ ){
                for(var j = 0; j < items[i].comments.length; j++){
                    if(items[i].comments[j]._id == req.params.id){

                      items[i].comments.splice(j,1);
                      articleModel.findByIdAndUpdate({_id:items[i]._id},items[i])
                      .then(()=>{ res.status(200),res.json({message:"comment deleted successfully !"})})
                      .catch(err => {
                        console.log(err)
                        res.status(500).json({message:"there is an error!"})
                    })
                 }
               }
             
            }
        } 
    }).then(()=>{
        res.status(200);
    }) 
})

//deleting an article when authenticated

app.delete('/article/:id',protection,(req,res)=>{
    articleModel.findByIdAndRemove({_id:req.params.id}).then(article =>{
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
 
    }).catch(()=>{
        console.log('there is an error')
    })
})

// updating an article when authenticated

app.put('/article/:id',(req,res)=>{
    articleModel.findByIdAndUpdate({_id:req.params.id}, req.body).then(()=>{
        articleModel.findOne({_id:req.params.id}).then((article)=>{
            res.send(article)
        }).catch(err=>{
            console.log(err);
            res.status(500);
        })
    }).catch((err)=>{
        console.log(err);
        res.status(500);
    })

})

// getting a list of all articles

app.get('/article',(req,res)=>{
    articleModel.find({},(err,items)=>{
        if(err){
            console.log("there is an error")
        }
        res.send(items);
    }).then(()=>{
        res.status(200);
    })
})

//getting a particular article


app.get('/article/:id',(req,res)=>{

    articleModel.findById(req.params.id).then((result)=>{
        res.status(200).json({article:result})
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({error:err})
    })
})


// lesting to the server
app.listen(port,()=>{
    console.log(`Server listing on port http://localhost: ${port}`)
})

module.exports = app;
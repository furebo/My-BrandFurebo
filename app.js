require('dotenv').config();
//const { urlencoded } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
//let multer = require('multer');
//app.use(multer);

// import routes modules
const postsRoute = require('./routes/posts');
const signupRoute = require('./signup');
const loginuserRoute = require('./loginuser');
//const getCommentRoute = require('./getcommentRoute');
const postCommentRoute = require('./postcommentRoute');
const deletearticle = require('./deleteArticle');
const deleteComment = require('./deletecomment');
const editArticle = require('./editArticle');
const getArticles = require('./getArticleroute');
const getArticleById = require('./getOneArticle');
const postingArticle = require('./postArticle');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const swaggerOptions = {
   swaggerDefinition:{
        openapi: "3.0.0",
        info:{
            version: "1.0.0",
            title:"Develloper Articles API",
            description:"This Api is for articles released evey end of week",
        },
        components: {
            securitySchemes: {
              bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                in: 'header',
                bearerFormat: 'JWT',
              }
            }
          },

           security: [{
             bearerAuth: []
              }],

        contacts:{
            name:"Furebo Didace",
            email:"furebodidace582@gmail.com"
        },
    },
    apis:["app.js","getcommentRoute.js","deleteArticle.js","postArticle.js","postcommentRoute.js","deletecomment.js","editArticle.js","getArticleroute.js","getOneArticle.js","loginuser.js","signup.js","./routes/posts.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)

app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocs))

var fs = require('fs'); 
var path = require('path');


const bodyParser = require('body-parser');  

//var articleModel = require('./model'); 
//var usermodel = require('./usermodel');
//const protection = require('./protection');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

app.set('uploads', path.join(__dirname, 'uploads'));
const urlencodedParser = bodyParser.urlencoded({extended:false});

app.use('/uploads',express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: true })) 
app.use(bodyParser.json()) 

app.use(express.urlencoded({extended:false}));
app.use('/static',express.static('public'));
app.use('/static',express.static('images'));

//use routes middlewares

app.use('/', postsRoute);
app.use('/signup',signupRoute);
app.use(loginuserRoute);
//app.use('/article/:id/comments',getCommentRoute);
app.use(deletearticle);
app.use(deleteComment);
app.use(postCommentRoute);
app.use(editArticle);
app.use(getArticles);
app.use(getArticleById);
app.use(postingArticle);
//app.use(getCommentRoute);


const { JsonWebTokenError } = require('jsonwebtoken');

let port = process.env.PORT ||3000;



//mongoDB url from atlas = 
const MONGODB_URI = "mongodb+srv://furebodidace:fode123@cluster0.oxsrq.mongodb.net/myBlog?retryWrites=true&w=majority";
// connecting app to mongoDB
 mongoose.connect(MONGODB_URI,{
 useNewUrlParser:true,
 useUnifiedTopology:true
    });

//CHECKING if mongoose is connected

mongoose.connection.on('connected',()=>{
        console.log('mongoose is connected!!!!!!!!!');
})

app.listen(port,()=>{
    console.log(`Server listing on port http://localhost: ${port}`)
})

module.exports = app;
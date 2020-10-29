require('dotenv').config();
const { urlencoded } = require('express');
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
        //openapi:"3.0.0",
        schemes: 
        - "http",

        info:{
            title:"Develloper Articles API",
            description:"This Api is for articles released evey end of week"
        },
        contacts:{
            name:"Furebo Didace",
            email:"furebodidace582@gmail.com"
        },
        servers:["http://localhost:3000"]
    },
    apis:["app.js"]
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
app.use(postingArticle)

/**
 * @swagger
 * /:
 *  get:
 *    tags:
 *    - welcome
 *    summary: welcoming a user
 *    description: A welcome message desplayed
 *    responses:
 *      '200':
 *        description: A welcome message desplayed succesffuly.
 *       
*/

/**
 * @swagger
 * /article:
 *  get:
 *    description: Use to request all articles
 *    responses:
 *      '200':
 *        description: All articles succesffuly retreived.
 *       
*/

/**
 * @swagger
 * /article/5f96b9c3002c7b14f8951145:
 *  get:
 *    description: Use to request an article by id
 *    responses:
 *      '200':
 *        description: An articles is succesffuly retreived.
 *       
*/

/**
 * @swagger
 * /signup:
 *  post:
 *    description: To signup a user to the database
 *    parameters:
 *      - name: usermodel
 *        description: user object
 *        in: body
 *        schema:
 *          $ref: '#/definitions/usermodel'
 *    responses:
 *      '200':
 *        description: A new user is signed up succesfully.
 *       
*/

/**
 * @swagger
 * /loginuser:
 *  post:
 *    description: To login the user to the database
 *    parameters:
 *      - name: usermodel2
 *        description: user object
 *        in: body
 *        schema:
 *          $ref: '#/definitions/usermodel2'
 *    responses:
 *      '200':
 *        description: A user is loged in succesfully.
 *       
*/

/**
 * @swagger
 * /article/5f96bd1571078c1653fd29ff:
 *  delete:
 *    description: To delete an article by id
 *    responses:
 *      '200':
 *        description: Article is deleted succesfully.
 *       
*/


/**
 * @swagger
 * /article:
 *  post:
 *    description: To post a new article 
 *    parameters:
 *      - name: articleModel
 *        description: article object
 *        in: body
 *        schema:
 *          $ref: '#/definitions/articleModel'
 *    responses:
 *      '200':
 *        description: A new article is created succesfully.
 *       
*/

/**
 * @swagger
 * /article/5f7ed076fdd9c80004310ca3:
 *  put:
 *    description: To update an existing article 
 *    parameters:
 *      - name: updatingModel
 *        description: updating object
 *        in: body
 *        schema:
 *          $ref: '#/definitions/updatingModel'
 *    responses:
 *      '200':
 *        description: An article is updated succesfully.
 *       
*/

/**
 * @swagger
 * definitions:
 *   commentsModel:
 *     properties: 
 *       name:
 *         type: Strings
 *       comment:
 *         type: String
 *   articleModel:
 *     properties: 
 *       title:
 *         type: Strings
 *       description:
 *         type: String
 *       articleImage: 
 *         type: Object
 *       content:
 *         type: String
 *   usermodel:
 *     prooerties:
 *       name:
 *         type: String
 *       password:
 *         type: String 
 *   usermodel2:
 *     prooerties:
 *       name:
 *         type: String
 *       password:
 *         type: String
 *   updatingModel:
 *     properties: 
 *       title:
 *         type: Strings
 *       description:
 *         type: String
 *       articleImage:
 *         type: String
 *       content:
 *         type: String
 *    
 *       
*/

/**
 * @swagger
 * /article/5f96bd4771078c1653fd2a00/comments:
 *  post:
 *    description: To post a comment to an article 
 *    parameters:
 *      - name: commentsModel
 *        description: comment object
 *        in: body
 *        schema:
 *          $ref: '#/definitions/commentsModel'
 *    responses:
 *      '200':
 *        description: A new comment of an article is created succesfully.
 *       
*/

/**
 * @swagger
 * /article/5f7ed076fdd9c80004310ca3/comments/5f97af8c783ae92e3ea0cbbb:
 *  delete:
 *    description: To delete a comment by id
 *    responses:
 *      '200':
 *        description: A comment must be deleted succesfully.
 *       
*/

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
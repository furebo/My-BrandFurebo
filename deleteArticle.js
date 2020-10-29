const express = require('express');
const app = express();
const router = express.Router();
const protection = require('./protection');
const articleModel = require('./model'); 
const bodyParser = require('body-parser');


app.use(bodyParser.json()) ;

router.delete('/article/:id',(req,res)=>{
    console.log(req.params.id)
    articleModel.findByIdAndRemove({_id:req.params.id}).then(()=>{
        res.json({
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

module.exports = router;
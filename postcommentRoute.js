const express = require('express');
const router = express.Router();
var articleModel = require('./model'); 

router.post('/article/:id/comments',(req,res)=>{
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


module.exports = router
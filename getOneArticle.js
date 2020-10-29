const express = require('express');
const router = express.Router();
const articleModel = require('./model');

router.get('/article/:id',(req,res)=>{

    articleModel.findById(req.params.id).then((result)=>{
        res.json({message:result})
    })
})

module.exports = router;
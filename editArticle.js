const express = require('express');
const mongoose = require('mongoose');
const protection = require('./protection');
const router = express.Router();
var articleModel = require('./model'); 

router.put('/article/:id',protection,(req,res)=>{
    articleModel.findByIdAndUpdate({_id:req.params.id}, req.body).then(()=>{
        res.json({message :"Article updated!"})
    }
    )
})

module.exports = router;
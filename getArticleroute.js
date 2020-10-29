const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
var articleModel = require('./model');

router.get('/article',(req,res)=>{
    articleModel.find({},(err,items)=>{
        res.send(items);
    }).then((response)=>{
        //res.status(200);
        res.send(response)
    }).catch((err)=>{
        console.log(err)
    })
})

module.exports = router;
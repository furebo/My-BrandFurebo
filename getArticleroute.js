const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
var articleModel = require('./model');

router.get('/',(req,res)=>{
    articleModel.find({},(err,items)=>{
        res.send(items);
    }).then(()=>{
        res.status(200);
    }).catch((err)=>{
        console.log(err)
    })
})

module.exports = router;
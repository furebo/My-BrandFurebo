const express = require('express');
const router = express.Router();
var articleModel = require('./model'); 

router.get('/',(req,res)=>{

    articleModel.findById(req.params.id).then((result)=>{
        res.status(200).json({comment:result})
    })
})

module.exports = router
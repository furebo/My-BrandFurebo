const express = require('express');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const router = express.Router();
var usermodel = require('./usermodel');

router.post('/loginuser',(req,res,next)=>{
    usermodel.find({name:req.body.name})
    .then(user =>{ bcrypt.compare(req.body.password, user[0].password, ()=>{
        var token = jsonwebtoken.sign({name:user[0].name},"secret", {expiresIn:"10h"})
                    res.status(200).json({
                    message:"user loged in successfully",
                    token:token
                }) 
            })
     }) 

});

module.exports = router;
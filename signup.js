const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const router = express.Router();
var usermodel = require('./usermodel');

router.post('/',(req,res,next)=>{

    bcrypt.hash(req.body.password, 10, (err, hash)=>{
        const newuser =new usermodel({
                        name:req.body.name,
                        password:hash
                    });
        
    newuser.save().then(
        res.json({message:"user signed up"})
    )
   })
})

module.exports = router;
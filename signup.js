const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const router = express.Router();
var usermodel = require('./usermodel');

/**
 * @swagger
 * /signup:
 *  post:
 *    tags:
 *    - User signup
 *    summary: For user to Signup
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
 * definitions:
 *   usermodel:
 *     prooerties:
 *       name:
 *         type: String
 *       password:
 *         type: String       
*/

router.post('/',(req,res,next)=>{

    bcrypt.hash(req.body.password, 10, (err, hash)=>{
        const newuser =new usermodel({
                        name:req.body.name,
                        password:hash
                    });
        
    newuser.save().then(
        res.json({message:"user signed up"})
    ).catch(()=>{
        res.json({message:'there is an error'})
     })
   })
})

module.exports = router;
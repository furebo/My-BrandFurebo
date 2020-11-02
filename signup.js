const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const router = express.Router();
var usermodel = require('./usermodel');

/**
 * @swagger
 * /signup:
 *  tags:
 *    - User signup
 *  summary: For user to signup 
 *  description: To signup the user to the database
 *  equestBody:
 *    required: true
 *    content:
 *      application/json:
 *        schema:
 *          $ref: '#/definitions/usermodel2'
 *  responses:
 *    '200':
 *      description: A user is loged in succesfully.
 * definitions:
 *   usermodel2:
 *     type: object
 *     required:
 *       - name
 *       - password
 *     properties:
 *       name:
 *         type: string
 *       password:
 *         type: string      
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
require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const router = express.Router();
var usermodel = require('./usermodel');

/**
 * @swagger
 * /loginuser:
 *  post:
 *    tags:
 *    - User login
 *    summary: For user to login 
 *    description: To login the user to the database
 *    requestBody:
 *      required: true
 *      content:
 *         application/json:
 *            schema:
 *              $ref: '#/definitions/usermodel2'
 *    responses:
 *      '200':
 *        description: A user is loged in succesfully.
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

router.post('/loginuser',(req,res,next)=>{
    usermodel.find({name:req.body.name})
    .then(user =>{ bcrypt.compare(req.body.password, user.password,()=>{
        var token = jsonwebtoken.sign({name:user.name},"secret",{expiresIn:"1h"})
       
                    res.status(200).json({
                    message:"user loged in successfully",
                    token:token
                }) 
            })
     }) 

    // const user = await usermodel.findOne({name:req.body.name});
    // console.log("user "+user);
    // if(!user){
    //     res.status(404).json({
    //         message: "User not found"
    //     })
    // }

    // const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    // if(isPasswordValid){
    //     var token = jsonwebtoken.sign({name:user.name},"secret", {expiresIn:"5h"})
    //     res.status(200).json({
    //         message: "User logged in successfully ",
    //         token
    //     })
    // }else {
    //     res.status(404).json({
    //         message: "Pssword is not correct"
    //     })
    // }

});

module.exports = router;
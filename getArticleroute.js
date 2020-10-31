const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
var articleModel = require('./model');

/**
 * @swagger
 * /article:
 *  get:
 *    tags:
 *    - All articles
 *    summary: For getting all articles
 *    description: Use to request all articles
 *    responses:
 *      '200':
 *        description: All articles succesffuly retreived.
 *       
*/

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
const express = require('express');
//const mongoose = require('mongoose');
const router = express.Router();
var articleModel = require('./model');

/**
 * @swagger
 * /article:
 *  get:
 *    tags:
 *    - All articles
 *    summary: All articles from database
 *    description: Articles are desplayed from DB
 *    responses:
 *      '200':
 *        description: Articles are desplayed succesffuly.
 *      
*/

router.get('/article',(req,res)=>{
    articleModel.find({},(err,items)=>{
        res.send(items);
    }).then((response)=>{
        res.status(200);
        res.send(response)
    }).catch((err)=>{
        console.log(err)
    })
})

module.exports = router;
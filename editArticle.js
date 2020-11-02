const express = require('express');
const mongoose = require('mongoose');
const protection = require('./protection');
const router = express.Router();
var articleModel = require('./model'); 

/**
 * @swagger
 *
 * /article/{id}:
 *    put:
 *      summary: Article update based on ID
 *      tags: [Articles]
 *      parameters:
 *        - name: id
 *          in: path
 *          description: Article ID
 *          required: true
 *      requestBody:
 *        required: false
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/article'
 *      responses:
 *        "201":
 *          description: An article schema
 *
 * components:
 *    schemas:
 *      article:
 *        type: object
 *        required: 
 *          - title
 *          - content
 *          - articleImage
 *        properties:
 *          title:
 *            type: string
 *          content:
 *            type: string
 *          description:
 *            type: string
 *            
 *
 */

router.put('/article/:id',protection,(req,res)=>{
    articleModel.findByIdAndUpdate({_id:req.params.id}, req.body).then(()=>{
        res.json({message :"Article updated!"})
    }
    )
})

module.exports = router;
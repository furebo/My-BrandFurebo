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
 *        - name: title
 *          in: path
 *          description: Article title
 *          required: true
 *        - name: description
 *          in: path
 *          description: Article description
 *          required: false
 *        - name: content
 *          in: path
 *          description: Article content
 *          required: false
 *        - name: article Image
 *          in: path
 *          description: Article image
 *          required: false
 *      requestBody:
 *        required: false
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/article'
 *      responses:
 *        "201":
 *          description: An article update
 *
 * components:
 *    schemas:
 *      article:
 *        type: object
 *        required: 
 *          - title
 *          - description
 *          - content
 *        properties:
 *          title:
 *            type: string
 *          description:
 *            type: string
 *          content:
 *            type: string
 *          articleImage:
 *             type: string
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
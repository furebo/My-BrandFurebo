const express = require('express');
const router = express.Router();
var articleModel = require('./model'); 
const protection = require('./protection')

/**
 * @swagger
 *
 * /article/{_id}/comments:
 *    post:
 *      summary: add a comment
 *      tags: [Comments]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/comment'
 *      responses:
 *        "201":
 *          description: A comment schema
 *
 * components:
 *    schemas:
 *      comment:
 *        type: object
 *        required:
 *          - article_id
 *          - name
 *          - comment
 *        properties:
 *          article_id:
 *            type: string
 *          name:
 *            type: string
 *          comment:
 *              type: string
 *       
 */

router.post('/article/:id/comments',protection,(req,res)=>{
    articleModel.findById(req.params.id).then((result)=>{
       result.comments.push(req.body);
       articleModel.findByIdAndUpdate({_id:req.params.id},result).then(()=>{
           articleModel.findOne({_id:req.params.id}).then((article)=>{
               res.status(200)
               res.send(article)
        })
       }) 
           
    })
})


module.exports = router
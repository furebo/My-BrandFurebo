const express = require('express');
const router = express.Router();
const articleModel = require('./model');

/**
 * @swagger
 * /article/{_id}:
 *   get:
 *     summary: For getting a single article 
 *     tags:
 *       - Articles
 *     description: Returns a single article
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: _id
 *         description: Particular Article Object's ID (Automatically assigned by MongoDB)
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A single article
 *       500:
 *         description: Server Error
 */     

router.get('/article/:id',(req,res)=>{

    articleModel.findById(req.params.id).then((result)=>{
        res.json({message:result})
    })
})

module.exports = router;
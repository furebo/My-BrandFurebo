const express = require('express');
const app = express();
const router = express.Router();
const protection = require('./protection');
const articleModel = require('./model'); 
const bodyParser = require('body-parser');
app.use(bodyParser.json()) ;

/**
 * @swagger
 * /article/{id}:
 *   delete:
 *     summary: Deletes an article based on ID
 *     tags:
 *       - Articles
 *     description: Deletes a single article
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Article's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully deleted
 */

router.delete('/article/:id',protection,(req,res)=>{
    articleModel.findByIdAndRemove({_id:req.params.id}).then(()=>{
        res.json({
            message:"Article deleted !",
            request:{
                type:'DELETE',
                URI:'http://127.0.0.1/articles',
                info:{
                    title:String,
                    description:String,
                    content:String,
                    articleImage:String
                }
            }
        })
    }).catch((err)=>{
        console.log('Error: ' + err)
    })
}) 

module.exports = router;
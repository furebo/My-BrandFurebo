const express = require('express');
const app = express();
const protection = require('./protection');
const router = express.Router();
var articleModel = require('./model'); 

const bodyParser = require('body-parser');
app.use(bodyParser.json()) ;

/**
 * @swagger
 * /article/{ArtId}/comments/{id}:
 *   delete:
 *     summary: Deletes a comment based on ID
 *     tags:
 *       - Comments
 *     description: Deletes a single comment
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: ArtId
 *         description: Article's id
 *         in: path
 *         required: true
 *         type: string
 *       - name: id
 *         description: Comment's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully deleted
 */

router.delete('/article/:ArtId/comments/:id',(req,res)=>{
    articleModel.find({},(err,items)=>{
             for(let i = 0; i < items.length; i++ ){
                
                 for(let j = 0; j < items[i].comments.length; j++){
                     if((items[i].comments)[j]._id == req.params.id){
                       (items[i].comments).splice(j,1);
                       articleModel.findByIdAndUpdate({_id:items[i]._id},items[i])
                       .then(()=>{ res.status(200),res.json({message:"comment deleted successfully !"})})
                     }
                       
               }
              
         }
     })
 })

 module.exports = router;
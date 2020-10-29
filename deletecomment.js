const express = require('express');
const app = express();
const protection = require('./protection');
const router = express.Router();
var articleModel = require('./model'); 

const bodyParser = require('body-parser');


app.use(bodyParser.json()) ;

router.delete('/article/:id/comments/:id',(req,res)=>{
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
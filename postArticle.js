const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const articleModel = require('./model');
const protection = require('./protection');
/**
 * @swagger
 *
 * /article:
 *    post:
 *      summary: add an article
 *      tags: [Articles]
 *      requestBody:
 *        content:
 *          multipart/form-data:
 *            schema:
 *              $ref: '#/components/schemas/article'
 *      parameters:
 *        - in: formData
 *          name: title
 *          type: string
 *          description: An article title.
 *        - in: formData
 *          name: descrition
 *          type: string
 *          description: An article description.
 *        - in: formData
 *          name: content
 *          type: string
 *          description: Article content
 *        - in: formData
 *          name: upfile
 *          type: file
 *          description: The file to upload
 *      responses:
 *        "200":
 *          description: An article schema
 *
 * components:
 *    schemas:
 *      article:
 *        type: object
 *        required:
 *          - title
 *          - description
 *          - content
 *          - articleImage
 *        properties:
 *          title:
 *            type: string
 *          description:
 *            type:string
 *          content:
 *            type: string
 *          articleImage:
 *            type: Object
 *         
 * 
 *              
 *       
 * 
 * 
 */

const multer = require('multer');

//app.set('uploads', path.join(__dirname, 'uploads'));
//app.use(multer)

const storage = multer.diskStorage({
    destination:function (req,file,cb){
        cb(null,'./uploads/')
    }

});

  const upload = multer({
    storage: storage
  });

//app.set('uploads', path.join(__dirname, 'uploads'));
//app.use('/uploads',express.static('uploads'))


router.post('/article',protection,upload.single('articleImage'),(req,res,)=>{
    const obj = new articleModel({
         title:req.body.title,
         description:req.body.description,
         articleImage:req.file,
         content:req.body.content,
     })

    obj.save().then((article)=>{
        res.json({Article:article})
    })
     


})



module.exports = router
const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const articleModel = require('./model');
const protection = require('./protection');

const multer = require('multer');

//app.set('uploads', path.join(__dirname, 'uploads'));
//app.use(multer)

const storage = multer.diskStorage({
    destination:function (req,file,cb){
        cb(null,'./uploads/')
    }

});

const upload = multer({storage:storage});
app.set('uploads', path.join(__dirname, 'uploads'));
app.use('/uploads',express.static('uploads'))


router.post('/article',upload.single('articleImage'),(req,res,)=>{
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
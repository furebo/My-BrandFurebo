const express = require('express');
const blogarticle = require('./../models/article')
const router = express.Router();
var bodyParser = require('body-parser');  
var fs = require('fs'); 
var path = require('path'); 
require('dotenv/config');

 

router.get('/new',(req,res)=>{
    res.render('articles/new',{article:new blogarticle()});
})

router.get('/:id',(req,res)=>{
    const article = blogarticle.findById(req.params.id)
    res.render('articles/show',{article:article})
})

router.post('/',async (req,res)=>{
    var newBlogModel = new blogarticle({
        itle:req.body.title,
        description:req.body.description,
        img: { 
			data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)), 
			contentType: 'image/png'
		},       
        content:req.body.content
    })
    imgModel.create(obj, (err, item) => { 
		if (err) { 
			console.log(err); 
		} 
		else { 
			// item.save(); 
			res.redirect('/'); 
		} 
	});
    try{
        newBlogModel = await newBlogModel.save();
        res.redirect(`/articles/${article.id}`)
    }
    catch(e){
        res.render('articles/new',{article:article});
    }
})



module.exports = router;
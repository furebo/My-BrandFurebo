const express = require('express');
const mongoose = require('mongoose');
const articlemodel = require('../model.js')
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
chai.should();
chai.use(chaiHttp);

   describe('/delete/articleId', () => {
	it('it should delete an article by id', (done) => {
       let auth = " ";
        const valid_input = {
            "name": "furebo",
            "password": "fode123"
        }
        chai.request(server)
              .post('/loginuser')
              .send(valid_input)
              .then((login_response)=>{
                auth = 'Bearer '+ login_response.body.token;
                let article = new articlemodel({title: "node", description:"article descr",content: "about me", articleImage: "myimage"})
                article.save((err, article) => {
                    chai.request(server)
                    .delete('/article/' + article._id)
                    .set('authorization', auth)
                    .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.have.property('message').eql("Article deleted !");
      
                      done();
                    });
            })

		});
	});
});


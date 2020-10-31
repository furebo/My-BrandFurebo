process.env.NODE_ENV = 'test';
require('dotenv').config();
const express = require('express');
let mongoose = require('mongoose');
//var articleModel = require('./model');
//const fs = require('fs');
const sinon = require('sinon');
const articleModel = require("../model.js");
const usermodel = require("../usermodel.js");
const protection = require("../protection.js");
const chai = require("chai");
const expect = require('chai').expect;
const request = require('supertest');
const chaiHttp = require("chai-http");
const server = require("../app");
const assert = require('assert');
const { should } = require('chai');
chai.should();
chai.use(chaiHttp);

let token = ' ';
    
    /*describe('Not post/article', () => {
        it('it should not POST an article', (done) => {
              chai.request(server)
              .post('/article')
              .send()
              .end((err,res) => {
                 res.should.have.status(401)
                 //res.body.should.have.property('message').eql('Article is created successfully!');
                done();
              })
 
        });
    
    });  */

    //testing a route for posting comment
    
    describe("post/article/:id/comments",()=>{;

        it("should add comments to an article ",()=>{
            const valid_input = {
                "name": "furebo",
                "password": "fode123"
            }

            chai.request(server)
              .post('/loginuser')
              .send(valid_input)
              .then((login_response)=>{
                token = 'Bearer ' + login_response.body.token;
                const comment = {
                    'name':'furebo',
                     'comment':'hey!'
                  }

                articleModel.findById('5f7ed0affdd9c80004310ca5').then((result)=>{

                    result.comments.push(comment);
                    articleModel.findByIdAndUpdate({_id:'5f7ed0affdd9c80004310ca5'},result).then(()=>{
                        articleModel.findOne({_id:'5f7ed0affdd9c80004310ca5'}).then((article)=>{
                            let articleId = article._id
                            chai.request(server)
                            .post('/article/' + articleId + 'comments')
                            .set('token', token)
                            .send()
                            .end((err,response)=>{
                                response.should.have.status(200);
                                response.body.should.be.a('object');
                            
                            })  
                     })
                    }) 
                        
                 })


            })
            
        })
    })

    /*
    
   describe("not deleting a comment",()=>{
        it("should not delete a user comment ",()=>{

            const comment = {
                id:"5f8813459303c38f75fbedfd",
                name:"furebo",
                comment:"cool"
            }
    
           chai.request(server)
           .delete("/article/:id/comments/" +comment.id)
           .send(comment)
           .end((err,response)=>{
               response.should.have.status(500)
               response.body.should.have.property('message').eql('there is an error!');
    
           })
       })
    })   */
    
    //testing route for getting article with comments
    /*
    describe("get/article/:id/comments",()=>{
        it("should get an article with its comments",(done)=>{
            const newArticle = {
                id:"5f87e16a3089a57fd6bca144",
                title: "this is the title",
                description: "this decsription is for testing",
                articleImage: "uploads/education icon.png",
                content:"this is an article posted for testing"
            }
            chai.request(server).get("/article/" + newArticle.id +"/comments").end((err,response)=>{
                response.should.have.status(200);
                response.body.should.be.a('object');
            done();
            })
        })
    })
          */

         


    
    
   
    
    


    //testing post route for signing up the user to database


    describe("post/signup",()=>{
        it("should signup a user to database ",(done)=>{
           //let user = {name:"frere",password:"frere123"}
           
                chai.request(server)
                .post("/signup")
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.have.property('message').eql('user signed up');
                done();
                })
                       
             })
               

       }) 

      
  
 
  /*
  
 describe("post/signup",()=>{
    it("should signup a user to database ",(done)=>{
       let user = new usermodel({name:"frere",password:"frere123"})
       
       user.save((err,newuser)=>{
          expect(newuser.name).to.equal(user.name)
          expect(newuser.password).to.equal(user.password)
          done()
       })
                   
     })
           

   }) */


   describe("post/signup",()=>{
    it("should not signup a user to database ",()=>{
       let user = {name:"furebo",password:"fode123"}

       chai.request(server)
       .post("/signup")
       .send(user)
       .end((err,res)=>{
           res.should.have.status(500);
           res.body.should.have.property('message').eql('there is an error!');
       })
    
    }) 
})
   /*
    describe("post/loginuser",()=>{
        it("should not login user to database",()=>{
            const user = {
                name:"furebo",
                password:"fode123"
            }
           chai.request(server)
           .post("/loginuser")
           .send(user)
           .end((err,response)=>{
               //response.should.have.property('message').eql('There is an error')
               response.should.have.status(404)

           })
       })
   }) 
   */
    //testing post route for signing in the user to database


    describe("post/loginuser",()=>{
        it("should login user to database",()=>{
           const user = {
             name:"furebo",
             password:"fode123"
           }
           chai.request(server)
           .post("/loginuser")
           //.send(user)
           .end((err,response)=>{
               response.should.have.status(200);
               response.should.have.property('message').eql('user loged in successfully')

           })
       })
   }) 
   
  
    



  




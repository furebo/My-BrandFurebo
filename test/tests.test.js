
require('dotenv').config();
const express = require('express');
let mongoose = require('mongoose');
const sinon = require('sinon');
const articleModel = require("../model.js");
const usermodel = require("../usermodel.js");
const chai = require("chai");
const expect = require('chai').expect;
const request = require('supertest');
const chaiHttp = require("chai-http");
const server = require("../app");
const assert = require('assert');
const { should } = require('chai');
chai.should();
chai.use(chaiHttp);

//testing post route for signing up the user to database
    
describe("post/signup",()=>{
    it("should signup a user to database ",()=>{
           let user = {name:"frere",password:"frere123"}
       
            chai.request(server)
            .post("/signup")
            .send(user)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.have.property('message').eql('user signed up');
            //done();
            })
    
        })

    }) 
        
    describe("get default",()=>{
        it("should desplay a welcome message ",(done)=>{
    
           chai.request(server)
           .get("/")
           .end((err,response)=>{
            response.body.should.have.property('message').eql('welcome');
    
               done();
           })
       })
    })
    
    describe("get/article",()=>{
        it("should not get any article from database",(done)=>{
            chai.request(server).get("/artile").end((err,response)=>{
                response.should.have.status(404);
                //response.should.have.text('there is an error');
                done();
            })
        });
    }) 
   
    describe('post/article', () => {
        it('it should  POST an article', () => {
    
            let token = " ";
    
            const valid_input = {
                "name": "furebo",
                "password": "fode123"
            }
              chai.request(server)
              .post('/loginuser')
              .send(valid_input)
              .then((login_response)=>{
                  token = 'Bearer ' + login_response.body.token;
                  chai.request(server)
                  .post('/article')
                  .set('authorization', token)
                  .end((err,res) => {
                    res.should.have.status(200)
                    //res.body.should.have.property('message').eql('Article is created successfully!');
                   //done();
                 })
              })
        });
    });

    describe("put/article/:id",()=>{
        const newArticle = {
            id:"5f6e20183a0fa22e625528ba",
            title: "this is the title",
            description: "this decsription is for testing",
            articleImage: "uploads/education icon.png",
            content:"this is an article posted for testing",
        }
    
        it("should update an existing  article ",()=>{
             
           let token = " ";
    
            const valid_input = {
                "name": "furebo",
                "password": "fode123"
            }
            chai.request(server)
              .post('/loginuser')
              .send(valid_input)
              .then((login_response)=>{
                token = 'Bearer ' + login_response.body.token; 
                chai.request(server)
                .put("/article/" + newArticle.id)
                .set('Authorization', token)
                .send(newArticle)
                .end((err,response)=>{
                    response.should.have.status(200);
                    response.body.should.have.property('message').eql('Article updated!');
        
                })
              })
            })
        }) 
    
    
   
    describe("post/article/:id/comments",()=>{;
    
        it("should add comments to an article ",()=>{
    
            let token = " ";
    
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
    
    
        //testing route for updating article
        describe("put/article/:id",()=>{
            it("should not update an existing  article ",()=>{
               
            let token = " ";
    
             const newArticle = {
                id:"5f6e20183a0fa22e625528ba"
             } 
               const artId = newArticle.id;
        
               const valid_input = {
                "name": "furebo",
                "password": "fode123"
            }
            chai.request(server)
              .post('/loginuser')
              .send(valid_input)
              .then((login_response)=>{
                token = 'Bearer ' + login_response.body.token;
                chai.request(server)
                   .put("/article/" + newArticle.id)
                   .set('token',token)
                   .send(newArticle)
                   .end((err,response)=>{
                   response.should.have.status(500)
        
               })
             })
          })
        }) 
    
        

     describe("delete/article/:id",()=>{
            it("should not delete an existing  article ",()=>{
                let token = " "; 
              const newArticle = {
                  _id:"5f8819ce231962929d015701",
                  title:"new title3",
                  description:"new description2",
                  articleImage:"uploads/database.png",
                  content:"content of new article2",
              }
        
              const valid_input = {
                "name": "furebo",
                "password": "fode123"
            }  
            chai.request(server)
              .post('/loginuser')
              .send(valid_input)
              .then((login_response)=>{
                token = 'Bearer ' + login_response.body.token;
                chai.request(server)
                .delete("/article/" + newArticle._id)
                .set('token',token)
                .end((err,response)=>{
                    response.should.have.status(404);
                })
              })
            
            })
        
        })

//testing route to delete an article

/*
describe("deleting a comment",()=>{
    var token = "" ;
    it("should delete a user comment ",(done)=>{
        const newComment = {
            _id:"5f8819ce231962929d015701",
            name:"gaetan",
            comment:"oh!"
        }
      const valid_input = {
        "name": "furebo",
        "password": "fode123"
    }  
    chai.request(server)
      .post('/loginuser')
      .send(valid_input)
      .then((login_response)=>{
        
        token = 'Bearer ' + login_response.body.token;

       articleModel.findById("5f7ed0affdd9c80004310ca5").then((result)=>{
        let commentid = result.comments[0]._id               
        chai.request(server)
        .delete("/article/:id/comments/" + _id)
        .set('Authorization',token)
        .end((err,response)=>{
            response.should.have.status(200)
            response.body.should.have.property('message').eql('comment deleted successfully !');
 
            done();
        })
      })
    }) 
 })
})
   */ 
    

 
    
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
    
    //testing post route for signing in the user to database
    
    describe("post/loginuser",()=>{
            it("should login user to database",()=>{
               const user = {
                 name:"furebo",
                 password:"fode123"
               }
               chai.request(server)
               .post("/loginuser")
               .send(user)
               .end((err,response)=>{
                   response.should.have.status(200);
                   response.should.have.property('message').eql('user loged in successfully')
    
               })
           })
       }) 




  
           
         
    
   
  
    



  




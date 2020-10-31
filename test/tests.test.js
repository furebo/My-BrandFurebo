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

describe('Articles API',()=>{
    describe("GET/article",()=>{
        it("should get all the articles from database",(done)=>{
            chai.request(server).get("/article").end((err,response)=>{
                response.should.have.status(200);
                response.body.should.be.a('array');
                done();
            })
        });
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

//testing GET/article route for getting a particular article
         
describe("get/article/:id",()=>{
    it("should get an article by id",(done)=>{
        const articleId = '5f96b9c3002c7b14f8951145';
        chai.request(server).get("/article/" + articleId).end((err,response)=>{
            response.should.have.status(200);
            response.body.should.be.a('object');
        done();
        })
    })
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
              .set('token', token)
              .end((err,res) => {
                res.should.have.status(200)
                //res.body.should.have.property('message').eql('Article is created successfully!');
               //done();
             })
          })
    });
});


//testing route to delete an article

describe("delete/article/:id",()=>{
    it("should delete an existing  article ",(done)=>{
             
        let token = " ";

            const newArticle = {
                _id:"5f9abcc557cd8100044d4d5b",
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
                .delete('/article/' + newArticle)
                .set('token', token)
                .send()
                .end((err,response)=>{
                    response.should.have.status(200);
                    response.body.should.have.property('message').eql('Article deleted !');
                })
               done(); 
            })  
        })
    })


    //testing route for updating article
    
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
            .set('token', token)
            .send(newArticle)
            .end((err,response)=>{
                response.should.have.status(200);
                response.body.should.have.property('message').eql('Article updated!');
    
            })
          })
        })
    }) 

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

//testing route for deleting a comment

 describe("deleting a comment",()=>{
    it("should delete a user comment ",(done)=>{

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
            
            articleModel.findById('5f7ed0affdd9c80004310ca5').then((result)=>{
                const comment = {
                    "name":"furebo",
                    "comment":"cool"
                }
                result.comments.push(comment);
                articleModel.findByIdAndUpdate({_id:'5f7ed0affdd9c80004310ca5'},result).then(()=>{
                    articleModel.findOne({_id:'5f7ed0affdd9c80004310ca5'}).then((article)=>{
                      let commentsArray = article.comments
                      let commentId = commentsArray[0]._id; 
                      
                      chai.request(server)
                      .delete("/article/:id/comments/" + commentId)
                      .set('token',token)
                      .end((err,response)=>{
                          response.should.have.status(200)
                          response.body.should.have.property('message').eql('comment deleted successfully !');
               
                          done();
                      })
                    })
                }) 
             })
         })
    })
})

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
           //.send(user)
           .end((err,response)=>{
               response.should.have.status(200);
               response.should.have.property('message').eql('user loged in successfully')

           })
       })
   }) 
   
  
    



  




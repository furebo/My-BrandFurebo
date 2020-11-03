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


    //testing route for deleting a comment
    describe("deleting a comment",()=>{

        it("should delete a user comment ",(done)=>{
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
                articleModel.findById("5f7ed0affdd9c80004310ca5").then((result)=>{
                    let commentid = result.comments[0].id               
                    chai.request(server)
                    .delete("/article/:ArtId/comments/" + commentid)
                    .set('authorization', auth)
                    .end((err,response)=>{
                        response.should.have.status(200)
                        response.body.should.have.property('message').eql('comment deleted successfully !');
             
                        done();
                    })
                  })
              })

        }) 
    })
    describe("delete/article/:id",()=>{
        it("should delete an existing  article ",()=>{
            let token = " "; 
          const newArticle = {
            _id: "5fa0ea99516173945d8ad35d",
            title: "node",
            description: "other article",
            content: "node.js",
            articleImage: "node image"
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
            newArticle.save((err, article)=>{
                chai.request(server)
                .delete("/article/" + article.id)
                .set('token',token)
                .end((err,response)=>{
                    response.should.have.status(200);
                })
            })

          })
        
        })
    
    }) 


    
process.env.NODE_ENV = 'test';
require('dotenv').config();
const express = require('express');
let mongoose = require('mongoose');
var articleModel = require('../model');
//const fs = require('fs');
const sinon = require('sinon');
//const articleModel = require("../model.js");
const usermodel = require("../usermodel.js");
const protection = require("../protection.js");
const chai = require("chai");
const expect = require('chai').expect;
const request = require('supertest');
const chaiHttp = require("chai-http");
const server = require("../app");
const assert = require('assert');
const { should } = require('chai');
//const commentsModel = require('../commentsModel.js');
chai.should();
chai.use(chaiHttp);

//testing route for deleting a comment
    
describe("deleting a comment",()=>{
    it("should delete a user comment ",(done)=>{

      

      const valid_input = {
        "name": "furebo",
        "password": "fode123"
    }  
    chai.request(server)
      .post('/loginuser')
      .send(valid_input)
      .then((login_response)=>{
        let token = " " ;
        token = 'Bearer ' + login_response.body.token;

        articleModel.findById("5f7ed0affdd9c80004310ca5").then((result)=>{
            let commentid = result.comments[0]._id               
        chai.request(server)
        .delete("/article/:id/comments/" + commentid)
        .send()
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
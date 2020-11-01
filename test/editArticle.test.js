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
//const commentsModel = require('../commentsModel.js');
chai.should();
chai.use(chaiHttp);

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
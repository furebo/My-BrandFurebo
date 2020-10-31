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

describe("delete/article/:id",()=>{
    it("should not delete an existing  article ",()=>{

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
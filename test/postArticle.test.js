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
              .set('Authorization', token)
              .end((err,res) => {
                res.should.have.status(200)
                //res.body.should.have.property('message').eql('Article is created successfully!');
               //done();
             })
          })
    });
});
